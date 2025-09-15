import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    // Defaults from query string
    let limit = parseInt(url.searchParams.get('limit') || '20')
    let includeStockPredictions = url.searchParams.get('predictions') === 'true'
    let sinceHours = parseInt(url.searchParams.get('since_hours') || '24')

    // Also accept JSON body options
    try {
      const body = await req.json()
      if (typeof body?.limit === 'number') limit = body.limit
      if (typeof body?.predictions === 'boolean') includeStockPredictions = body.predictions
      if (typeof body?.since_hours === 'number') sinceHours = body.since_hours
    } catch (_) {/* no body provided */}
    
    console.log(`Fetching ${limit} news items with predictions: ${includeStockPredictions}, since last ${sinceHours}h`)
    
    // Check if we need to refresh from Inoreader (if latest news is older than 10 minutes)
    const { data: latestNews } = await supabase
      .from('financial_news')
      .select('published_at')
      .eq('is_indian_market', true)
      .order('published_at', { ascending: false })
      .limit(1)
    
    const shouldRefreshInoreader = !latestNews?.[0] || 
      (new Date().getTime() - new Date(latestNews[0].published_at).getTime()) > 10 * 60 * 1000
    
    if (shouldRefreshInoreader) {
      console.log('Triggering Inoreader refresh for live news updates...')
      try {
        await supabase.functions.invoke('process-inoreader-feed')
        console.log('Inoreader refresh completed')
      } catch (error) {
        console.warn('Inoreader refresh failed:', error)
      }
    }
    
    // Get recent Indian financial news
    const sinceISO = new Date(Date.now() - sinceHours * 60 * 60 * 1000).toISOString()
    let query = supabase
      .from('financial_news')
      .select('*')
      .eq('is_indian_market', true)
      .gte('published_at', sinceISO)
      .order('published_at', { ascending: false })
      .limit(limit)

    const { data: newsItems, error } = await query

    if (error) {
      throw error
    }

    let enhancedNews = newsItems || []

    // If predictions are requested, enhance with AI predictions for stocks
    if (includeStockPredictions && newsItems) {
      console.log('Enhancing news with stock predictions...')
      enhancedNews = await Promise.all(
        newsItems.map(async (item) => {
          try {
            // Generate stock predictions for mentioned companies
            const stockPredictions = await generateStockPredictions(item)
            return {
              ...item,
              stock_predictions: stockPredictions,
              enhanced_at: new Date().toISOString()
            }
          } catch (error) {
            console.error(`Error generating predictions for ${item.id}:`, error)
            return {
              ...item,
              stock_predictions: [],
              enhanced_at: new Date().toISOString()
            }
          }
        })
      )
    }

    // Generate market summary if we have news
    const marketSummary = enhancedNews.length > 0 ? await generateMarketSummary(enhancedNews.slice(0, 10)) : null

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          news: enhancedNews,
          market_summary: marketSummary,
          total_count: enhancedNews.length,
          generated_at: new Date().toISOString()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error fetching news:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function generateStockPredictions(newsItem: any) {
  if (!newsItem.stock_symbols || newsItem.stock_symbols.length === 0) {
    return []
  }

  const predictions = []
  
  // Generate predictions for each mentioned stock
  for (const symbol of newsItem.stock_symbols.slice(0, 3)) { // Limit to 3 stocks
    try {
      console.log(`Generating prediction for ${symbol} based on: ${newsItem.headline}`)
      
      const prediction = await generateAIStockPrediction(
        symbol,
        newsItem.headline,
        newsItem.content || '',
        newsItem.sentiment
      )
      
      if (prediction) {
        predictions.push(prediction)
      }
    } catch (error) {
      console.error(`Error predicting ${symbol}:`, error)
    }
  }

  return predictions
}

async function generateAIStockPrediction(symbol: string, headline: string, content: string, sentiment: string) {
  try {
    if (!openaiApiKey) {
      return generateFallbackPrediction(symbol, headline, sentiment)
    }

    const prompt = `Indian stock analysis for ${symbol}:

News: "${headline}"
Content: "${content.substring(0, 500)}"
Sentiment: ${sentiment}

Return JSON prediction:
{
  "symbol": "${symbol}",
  "prediction": "UP"/"DOWN"/"STABLE",
  "confidence": number (0-100),
  "target_price_change": number (% expected),
  "timeframe": "1D"/"3D"/"1W"/"1M", 
  "reasoning": "Brief explanation",
  "risk_level": "LOW"/"MEDIUM"/"HIGH",
  "key_factors": ["factor1", "factor2"],
  "recommendation": "BUY"/"SELL"/"HOLD"
}

Base on Indian market dynamics, RBI policies, FII/DII flows, sector trends.`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Expert Indian stock analyst. Return only JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 400,
        temperature: 0.1
      }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`OpenAI API ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content

    if (!text) {
      throw new Error('No OpenAI response content')
    }

    // Parse JSON more reliably
    let prediction = null
    try {
      prediction = JSON.parse(text)
    } catch {
      // Extract JSON pattern
      const jsonMatches = text.match(/\{[\s\S]*?\}/g)
      if (jsonMatches) {
        for (const match of jsonMatches) {
          try {
            prediction = JSON.parse(match)
            break
          } catch { continue }
        }
      }
    }

    if (!prediction) {
      return generateFallbackPrediction(symbol, headline, sentiment)
    }
    
    return {
      symbol: prediction.symbol || symbol,
      prediction: prediction.prediction || 'STABLE',
      confidence: Math.min(100, Math.max(10, prediction.confidence || 50)),
      target_price_change: Math.min(20, Math.max(-20, prediction.target_price_change || 0)),
      timeframe: prediction.timeframe || '1D',
      reasoning: (prediction.reasoning || 'AI analysis based on news sentiment').substring(0, 200),
      risk_level: prediction.risk_level || 'MEDIUM',
      key_factors: Array.isArray(prediction.key_factors) ? 
        prediction.key_factors.slice(0, 4) : ['Market sentiment', 'News impact'],
      recommendation: prediction.recommendation || 'HOLD'
    }

  } catch (error) {
    console.error(`AI prediction error for ${symbol}:`, error)
    return generateFallbackPrediction(symbol, headline, sentiment)
  }
}

function generateFallbackPrediction(symbol: string, headline: string, sentiment: string) {
  const text = headline.toLowerCase()
  
  // Smart fallback analysis
  const bullishKeywords = /(profit|gain|rise|up|beat|growth|positive|buy|target|upgrade)/
  const bearishKeywords = /(loss|fall|down|miss|decline|negative|sell|downgrade|cut)/
  
  const isBullish = bullishKeywords.test(text)
  const isBearish = bearishKeywords.test(text)
  
  let prediction = 'STABLE'
  let targetChange = 0
  let confidence = 40
  
  if (isBullish && !isBearish) {
    prediction = 'UP'
    targetChange = Math.random() * 5 + 1 // 1-6%
    confidence = 60
  } else if (isBearish && !isBullish) {
    prediction = 'DOWN' 
    targetChange = -(Math.random() * 5 + 1) // -1 to -6%
    confidence = 60
  }
  
  // Sector-specific adjustments
  const techStocks = ['TCS.NS', 'INFY.NS', 'WIPRO.NS', 'HCLTECH.NS']
  const bankStocks = ['HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'AXISBANK.NS']
  
  let sector = 'General'
  if (techStocks.includes(symbol)) sector = 'IT'
  if (bankStocks.includes(symbol)) sector = 'Banking'
  
  return {
    symbol,
    prediction,
    confidence,
    target_price_change: Math.round(targetChange * 10) / 10,
    timeframe: '1D',
    reasoning: `Fallback analysis based on ${sentiment} sentiment and ${sector} sector trends`,
    risk_level: confidence > 50 ? 'MEDIUM' : 'HIGH',
    key_factors: [
      `${sentiment} news sentiment`,
      `${sector} sector impact`,
      'Market volatility'
    ],
    recommendation: prediction === 'UP' ? 'BUY' : prediction === 'DOWN' ? 'SELL' : 'HOLD'
  }
}

async function generateMarketSummary(newsItems: any[]) {
  const prompt = `
Analyze these Indian market news headlines and provide a market summary:

${newsItems.map(item => `- ${item.headline} (Sentiment: ${item.sentiment})`).join('\n')}

Provide summary in JSON format:
{
  "overall_sentiment": "BULLISH"/"BEARISH"/"NEUTRAL",
  "market_outlook": "Brief market outlook",
  "key_themes": ["theme1", "theme2", "theme3"],
  "sector_impact": {
    "IT": "POSITIVE"/"NEGATIVE"/"NEUTRAL",
    "Banking": "POSITIVE"/"NEGATIVE"/"NEUTRAL",
    "Auto": "POSITIVE"/"NEGATIVE"/"NEUTRAL"
  },
  "nifty_prediction": "UP"/"DOWN"/"STABLE",
  "confidence": number (0-100)
}
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert Indian stock market analyst. Always return valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 400,
        temperature: 0.3
      })
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content

    if (!text) {
      return null
    }

    let jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) jsonMatch = [jsonMatch[1]]
    }

    if (!jsonMatch) {
      return null
    }

    return JSON.parse(jsonMatch[0])

  } catch (error) {
    console.error('Market summary error:', error)
    return null
  }
}
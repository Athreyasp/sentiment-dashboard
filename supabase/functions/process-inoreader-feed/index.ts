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
    console.log('Starting Inoreader financial news processing...')
    
    // Use the specific Inoreader URL for Indian financial news
    const feedUrl = 'https://www.inoreader.com/stream/user/1003888559/tag/Senitnel/view/html?cs=m'
    
    console.log(`Fetching from: ${feedUrl}`)
    const feedResponse = await fetch(feedUrl)
    const feedText = await feedResponse.text()
    
    console.log('Parsing Inoreader HTML...')
    const allNewsItems = parseInoreaderHtml(feedText)
    console.log(`Found ${allNewsItems.length} news items from Inoreader`)
    
    let processedCount = 0
    let addedCount = 0
    
    for (const item of allNewsItems) {
      try {
        // Check if item already exists
        const { data: existing } = await supabase
          .from('financial_news')
          .select('id')
          .eq('url', item.url)
          .single()
        
        if (existing) {
          console.log(`Skipping existing item: ${item.headline}`)
          processedCount++
          continue
        }
        
        // Analyze with OpenAI for stock prediction
        const analysis = await analyzeWithOpenAI(item.headline, item.content)
        
        if (analysis.isFinanceRelated) {
          // Insert into database
          const { error } = await supabase
            .from('financial_news')
            .insert({
              headline: item.headline,
              content: item.content,
              source: item.source,
              url: item.url,
              published_at: item.publishedAt,
              sentiment: analysis.sentiment,
              sentiment_score: analysis.sentimentScore,
              prediction: analysis.prediction,
              confidence_score: analysis.confidenceScore,
              company_mentioned: analysis.companiesMentioned,
              stock_symbols: analysis.stockSymbols,
              is_indian_market: analysis.isIndianMarket,
              target_price: analysis.targetPrice,
              timeframe: analysis.timeframe,
              key_factors: analysis.keyFactors,
              processed_at: new Date().toISOString()
            })
          
          if (error) {
            console.error('Error inserting news item:', error)
          } else {
            addedCount++
            console.log(`Added: ${item.headline}`)
          }
        }
        
        processedCount++
      } catch (error) {
        console.error('Error processing item:', error)
        processedCount++
      }
    }
    
    console.log(`Processing complete: ${processedCount} processed, ${addedCount} added`)
    
    console.log(`Processing complete: ${processedCount} processed, ${addedCount} added`)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedCount, 
        added: addedCount 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error processing feed:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function parseInoreaderHtml(html: string) {
  const items = []
  
  try {
    console.log('Parsing Inoreader HTML format...')
    
    // Multiple patterns to try for different HTML structures
    const patterns = [
      // Pattern 1: Article tags
      /<article[^>]*>(.*?)<\/article>/gs,
      // Pattern 2: Div with specific classes
      /<div[^>]*class="[^"]*article[^"]*"[^>]*>(.*?)<\/div>/gs,
      // Pattern 3: Entry divs
      /<div[^>]*class="[^"]*entry[^"]*"[^>]*>(.*?)<\/div>/gs,
      // Pattern 4: Item divs  
      /<div[^>]*class="[^"]*item[^"]*"[^>]*>(.*?)<\/div>/gs
    ]
    
    let allMatches = []
    
    for (const pattern of patterns) {
      const matches = Array.from(html.matchAll(pattern))
      allMatches = allMatches.concat(matches)
      console.log(`Pattern found ${matches.length} matches`)
    }
    
    console.log(`Total ${allMatches.length} potential articles found`)
    
    for (const match of allMatches) {
      const articleHtml = match[1]
      
      // Extract headline - try multiple selectors
      let headline = ''
      const headlinePatterns = [
        /<h[1-6][^>]*>(.*?)<\/h[1-6]>/s,
        /<title[^>]*>(.*?)<\/title>/s,
        /<a[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/a>/s,
        /<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/span>/s,
        /<div[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/div>/s
      ]
      
      for (const pattern of headlinePatterns) {
        const match = articleHtml.match(pattern)
        if (match) {
          headline = match[1].replace(/<[^>]*>/g, '').trim()
          if (headline.length > 10) break
        }
      }
      
      // Extract content/description
      let content = ''
      const contentPatterns = [
        /<p[^>]*>(.*?)<\/p>/s,
        /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
        /<div[^>]*class="[^"]*summary[^"]*"[^>]*>(.*?)<\/div>/s,
        /<span[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/span>/s
      ]
      
      for (const pattern of contentPatterns) {
        const match = articleHtml.match(pattern)
        if (match) {
          content = match[1].replace(/<[^>]*>/g, '').trim()
          if (content.length > 20) break
        }
      }
      
      // Extract URL
      let url = ''
      const urlPatterns = [
        /href=["'](https?:\/\/[^"']+)["']/s,
        /href=["']([^"']+)["']/s
      ]
      
      for (const pattern of urlPatterns) {
        const match = articleHtml.match(pattern)
        if (match) {
          url = match[1]
          // Make sure it's a full URL
          if (url && !url.startsWith('http')) {
            url = 'https://' + url
          }
          break
        }
      }
      
      // Extract date
      const datePatterns = [
        /(\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2})/s,
        /(\d{4}-\d{2}-\d{2})/s,
        /(\d{1,2}\/\d{1,2}\/\d{4})/s,
        /(\d{1,2}-\d{1,2}-\d{4})/s
      ]
      
      let publishedAt = new Date().toISOString()
      for (const pattern of datePatterns) {
        const match = articleHtml.match(pattern)
        if (match) {
          try {
            publishedAt = new Date(match[1]).toISOString()
            break
          } catch (error) {
            console.error('Date parsing error:', error)
          }
        }
      }
      
      // Only include if we have a decent headline and URL
      if (headline && headline.length > 10 && url && url.includes('http')) {
        
        // Filter for financial/stock market content
        const financeKeywords = /(stock|market|share|nifty|sensex|bse|nse|trading|invest|profit|loss|earning|financial|economy|rupee|bank|company|corporate|business|equity|fund|index|portfolio|dividend|ipo|fii|dii)/i
        
        if (financeKeywords.test(headline + ' ' + content)) {
          items.push({
            headline: headline.substring(0, 500),
            content: content ? content.substring(0, 1000) : headline,
            source: 'Indian Financial News',
            url: url,
            publishedAt
          })
        }
      }
    }
    
    console.log(`Filtered ${items.length} financial news items`)
    
  } catch (error) {
    console.error('HTML parsing error:', error)
  }
  
  return items
}

// Smart Indian stock symbol extraction
function extractIndianStockSymbols(headline: string, content: string): string[] {
  const text = (headline + ' ' + content).toLowerCase()
  const symbols = []
  
  // Major Indian stocks mapping
  const stockMap = {
    'reliance': 'RELIANCE.NS',
    'tcs': 'TCS.NS', 
    'infosys': 'INFY.NS',
    'hdfc bank': 'HDFCBANK.NS',
    'hdfc': 'HDFC.NS',
    'icici bank': 'ICICIBANK.NS',
    'icici': 'ICICIBANK.NS',
    'sbi': 'SBIN.NS',
    'state bank': 'SBIN.NS',
    'wipro': 'WIPRO.NS',
    'bharti airtel': 'BHARTIARTL.NS',
    'airtel': 'BHARTIARTL.NS',
    'itc': 'ITC.NS',
    'kotak mahindra': 'KOTAKBANK.NS',
    'kotak': 'KOTAKBANK.NS',
    'axis bank': 'AXISBANK.NS',
    'axis': 'AXISBANK.NS',
    'hul': 'HINDUNILVR.NS',
    'hindustan unilever': 'HINDUNILVR.NS',
    'maruti': 'MARUTI.NS',
    'asian paints': 'ASIANPAINT.NS',
    'bajaj finance': 'BAJFINANCE.NS',
    'bajaj': 'BAJFINANCE.NS',
    'titan': 'TITAN.NS',
    'nestlé': 'NESTLEIND.NS',
    'nestle': 'NESTLEIND.NS',
    'ultratech cement': 'ULTRACEMCO.NS',
    'ultratech': 'ULTRACEMCO.NS'
  }
  
  // Check for company mentions
  for (const [company, symbol] of Object.entries(stockMap)) {
    if (text.includes(company)) {
      symbols.push(symbol)
    }
  }
  
  // Extract direct NSE symbols (e.g., INFY.NS, TCS.NS)
  const nsePattern = /([A-Z]{2,10})\.NS/gi
  const matches = text.match(nsePattern)
  if (matches) {
    symbols.push(...matches)
  }
  
  return [...new Set(symbols)] // Remove duplicates
}

async function analyzeWithOpenAI(headline: string, content: string) {
  // First, try smart extraction as fallback
  const extractedSymbols = extractIndianStockSymbols(headline, content)
  const text = (headline + ' ' + content).toLowerCase()
  
  // Check if it's finance-related
  const hasFinanceKeywords = text.match(/(stock|market|trading|earn|profit|loss|price|share|invest|fund|bank|nse|bse|nifty|sensex|financial|rupee|economy)/i)
  const hasIndianKeywords = text.match(/(india|indian|nse|bse|mumbai|delhi|rupee|inr|tcs|infos|reliance|hdfc|sbi|rbi|sebi|nifty|sensex)/i)
  
  if (!hasFinanceKeywords) {
    return {
      isFinanceRelated: false,
      isIndianMarket: false,
      sentiment: 'neutral',
      sentimentScore: 0,
      prediction: 'STABLE',
      confidenceScore: 0,
      companiesMentioned: [],
      stockSymbols: [],
      targetPrice: 0,
      timeframe: '1D',
      keyFactors: []
    }
  }
  
  // Try OpenAI analysis with better error handling
  try {
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not available')
    }

    const prompt = `Analyze this Indian financial news for stock predictions:

Headline: "${headline}"
Content: "${content}"

Extract Indian stock symbols and provide analysis. Return JSON:
{
  "sentiment": "positive"/"negative"/"neutral",
  "sentimentScore": number between -1 and 1,
  "prediction": "UP"/"DOWN"/"STABLE", 
  "confidenceScore": number between 0 and 1,
  "companiesMentioned": [Indian company names],
  "stockSymbols": [NSE symbols like "TCS.NS", "INFY.NS"],
  "targetPrice": number (% change expected),
  "timeframe": "1D"/"1W"/"1M",
  "keyFactors": [key market factors]
}

Focus only on NSE/BSE listed Indian companies.`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert Indian stock analyst. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 600,
        temperature: 0.2
      }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No content in OpenAI response')
    }
    
    const text = data.choices[0].message.content
    
    // Extract JSON more reliably
    let analysis = null
    try {
      // Try direct parse first
      analysis = JSON.parse(text)
    } catch {
      // Try to extract from code blocks or find JSON pattern
      const jsonMatches = text.match(/\{[\s\S]*\}/g)
      if (jsonMatches) {
        for (const match of jsonMatches) {
          try {
            analysis = JSON.parse(match)
            break
          } catch { continue }
        }
      }
    }
    
    if (!analysis) {
      throw new Error('Failed to parse OpenAI JSON response')
    }
    
    // Merge OpenAI results with extracted symbols
    const allSymbols = [...new Set([
      ...(Array.isArray(analysis.stockSymbols) ? analysis.stockSymbols : []),
      ...extractedSymbols
    ])]
    
    return {
      isFinanceRelated: true,
      isIndianMarket: Boolean(hasIndianKeywords),
      sentiment: analysis.sentiment || 'neutral',
      sentimentScore: Number(analysis.sentimentScore) || 0,
      prediction: analysis.prediction || 'STABLE',
      confidenceScore: Number(analysis.confidenceScore) || 0.5,
      companiesMentioned: Array.isArray(analysis.companiesMentioned) ? analysis.companiesMentioned : [],
      stockSymbols: allSymbols,
      targetPrice: Number(analysis.targetPrice) || 0,
      timeframe: analysis.timeframe || '1D',
      keyFactors: Array.isArray(analysis.keyFactors) ? analysis.keyFactors : []
    }
    
  } catch (error) {
    console.error('OpenAI analysis error:', error)
    
    // Enhanced fallback with smart analysis
    const sentiment = text.match(/(positive|bullish|gain|profit|rise|up|boost|growth|increase)/i) ? 'positive' :
                     text.match(/(negative|bearish|loss|fall|down|drop|decline|crash)/i) ? 'negative' : 'neutral'
    
    const prediction = sentiment === 'positive' ? 'UP' : sentiment === 'negative' ? 'DOWN' : 'STABLE'
    
    return {
      isFinanceRelated: Boolean(hasFinanceKeywords),
      isIndianMarket: Boolean(hasIndianKeywords),
      sentiment,
      sentimentScore: sentiment === 'positive' ? 0.3 : sentiment === 'negative' ? -0.3 : 0,
      prediction,
      confidenceScore: extractedSymbols.length > 0 ? 0.6 : 0.3,
      companiesMentioned: [],
      stockSymbols: extractedSymbols,
      targetPrice: 0,
      timeframe: '1D',
      keyFactors: ['Fallback analysis - OpenAI unavailable']
    }
  }
}
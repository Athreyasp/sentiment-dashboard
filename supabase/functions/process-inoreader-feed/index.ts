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

async function analyzeWithOpenAI(headline: string, content: string) {
  const prompt = `
Analyze this Indian financial news for stock market prediction. Focus ONLY on Indian markets (NSE, BSE, Nifty 50, Sensex).

Headline: "${headline}"
Content: "${content}"

Return a JSON object with this exact structure:
{
  "isFinanceRelated": true/false (only true for Indian stocks, markets, Nifty, Sensex, RBI, Indian companies),
  "isIndianMarket": true/false (true for Indian companies like TCS, Infosys, Reliance, HDFC, etc.),
  "sentiment": "positive"/"negative"/"neutral",
  "sentimentScore": number between -1 and 1,
  "prediction": "UP"/"DOWN"/"STABLE",
  "confidenceScore": number between 0 and 1,
  "companiesMentioned": [array of Indian company names],
  "stockSymbols": [array like "TCS.NS", "INFY.NS", "RELIANCE.NS"],
  "targetPrice": number (predicted stock price movement %),
  "timeframe": "1D"/"1W"/"1M",
  "keyFactors": [array of key factors affecting prediction]
}

Indian Stock Rules:
- UP: Earnings beat, RBI rate cuts, FII buying, reforms, good results
- DOWN: Rate hikes, FII selling, inflation, poor earnings, regulations
- Only focus on NSE/BSE listed Indian companies
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
        max_tokens: 800,
        temperature: 0.3
      })
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content
    
    if (!text) {
      throw new Error('No response from OpenAI')
    }
    
    // Extract JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      // Try to find JSON in code blocks
      jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        jsonMatch = [jsonMatch[1]]
      }
    }
    
    if (!jsonMatch) {
      throw new Error('No JSON found in OpenAI response')
    }
    
    const analysis = JSON.parse(jsonMatch[0])
    
    // Validate and set defaults
    return {
      isFinanceRelated: Boolean(analysis.isFinanceRelated),
      isIndianMarket: Boolean(analysis.isIndianMarket),
      sentiment: analysis.sentiment || 'neutral',
      sentimentScore: Number(analysis.sentimentScore) || 0,
      prediction: analysis.prediction || 'STABLE',
      confidenceScore: Number(analysis.confidenceScore) || 0.5,
      companiesMentioned: Array.isArray(analysis.companiesMentioned) ? analysis.companiesMentioned : [],
      stockSymbols: Array.isArray(analysis.stockSymbols) ? analysis.stockSymbols : [],
      targetPrice: Number(analysis.targetPrice) || 0,
      timeframe: analysis.timeframe || '1D',
      keyFactors: Array.isArray(analysis.keyFactors) ? analysis.keyFactors : []
    }
    
  } catch (error) {
    console.error('OpenAI analysis error:', error)
    
    // Smart fallback based on keywords
    const text = (headline + ' ' + content).toLowerCase()
    const hasFinanceKeywords = text.match(/(stock|market|trading|earn|profit|loss|price|share|invest|fund|bank|nse|bse|nifty|sensex)/i)
    const hasIndianKeywords = text.match(/(india|indian|nse|bse|mumbai|delhi|rupee|inr|tcs|infos|reliance|hdfc|sbi|rbi|sebi)/i)
    
    return {
      isFinanceRelated: Boolean(hasFinanceKeywords),
      isIndianMarket: Boolean(hasIndianKeywords),
      sentiment: 'neutral',
      sentimentScore: 0,
      prediction: 'STABLE',
      confidenceScore: 0.3,
      companiesMentioned: [],
      stockSymbols: [],
      targetPrice: 0,
      timeframe: '1D',
      keyFactors: ['Analysis unavailable']
    }
  }
}
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting live news feed processing...')
    
    // Use multiple reliable financial news RSS feeds
    const feeds = [
      'https://feeds.bloomberg.com/markets/news.rss',
      'https://rss.cnn.com/rss/money_topstories.rss',
      'https://feeds.finance.yahoo.com/rss/2.0/headline',
      'https://www.investing.com/rss/news.rss'
    ]
    
    let allNewsItems: any[] = []
    
    // Process each feed
    for (const feedUrl of feeds) {
      try {
        console.log(`Fetching from: ${feedUrl}`)
        const feedResponse = await fetch(feedUrl)
        const feedText = await feedResponse.text()
        
        console.log('Parsing RSS feed...')
        const newsItems = parseRSSFeed(feedText, feedUrl)
        allNewsItems = allNewsItems.concat(newsItems)
        console.log(`Found ${newsItems.length} items from this feed`)
      } catch (error) {
        console.error(`Error processing feed ${feedUrl}:`, error)
      }
    }
    
    console.log(`Total ${allNewsItems.length} news items found`)
    
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
        
        // Analyze with Gemini for stock prediction
        const analysis = await analyzeWithGemini(item.headline, item.content)
        
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

function parseRSSFeed(xmlText: string, feedUrl: string) {
  const items = []
  
  try {
    // Extract feed source name from URL
    const sourceMatch = feedUrl.match(/\/\/([^\/]+)/)
    const source = sourceMatch ? sourceMatch[1].replace('www.', '').replace('.com', '').replace('.rss', '') : 'RSS Feed'
    
    // Parse RSS/XML format
    const itemRegex = /<item[^>]*>(.*?)<\/item>/gs
    const matches = xmlText.matchAll(itemRegex)
    
    for (const match of matches) {
      const itemXml = match[1]
      
      // Extract title
      const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/s)
      const headline = (titleMatch?.[1] || titleMatch?.[2] || '').replace(/<[^>]*>/g, '').trim()
      
      // Extract description
      const descMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/s)
      const content = (descMatch?.[1] || descMatch?.[2] || '').replace(/<[^>]*>/g, '').trim()
      
      // Extract link
      const linkMatch = itemXml.match(/<link[^>]*>(.*?)<\/link>/s)
      const url = linkMatch?.[1]?.trim() || ''
      
      // Extract publication date
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/s)
      let publishedAt = new Date().toISOString()
      
      if (pubDateMatch) {
        try {
          publishedAt = new Date(pubDateMatch[1].trim()).toISOString()
        } catch (error) {
          console.error('Date parsing error:', error)
        }
      }
      
      if (headline && url && headline.length > 10) {
        items.push({
          headline: headline.substring(0, 500), // Limit headline length
          content: content ? content.substring(0, 1000) : headline, // Limit content length
          source: source.charAt(0).toUpperCase() + source.slice(1),
          url,
          publishedAt
        })
      }
    }
  } catch (error) {
    console.error('RSS parsing error:', error)
  }
  
  return items
}

async function analyzeWithGemini(headline: string, content: string) {
  const prompt = `
Analyze this financial news headline and content to predict stock market impact:

Headline: "${headline}"
Content: "${content}"

Provide analysis in this JSON format:
{
  "isFinanceRelated": boolean (true if about stocks, companies, markets, earnings, economy, crypto, trading),
  "isIndianMarket": boolean (true if mentions Indian companies like TCS, Infosys, Reliance, HDFC, NSE, BSE, INR, Indian economy),
  "sentiment": "positive" | "negative" | "neutral",
  "sentimentScore": number between -1 and 1 (-1 very negative, 0 neutral, 1 very positive),
  "prediction": "UP" | "DOWN" | "STABLE" (predicted stock movement based on news),
  "confidenceScore": number between 0 and 1 (confidence in prediction),
  "companiesMentioned": array of company names found in text,
  "stockSymbols": array of stock symbols like AAPL, TSLA, MSFT, TCS.NS, INFY.NS etc
}

For prediction logic:
- UP: Positive earnings, good news, partnerships, growth, buybacks, upgrades
- DOWN: Bad earnings, layoffs, scandals, downgrades, losses, regulatory issues  
- STABLE: Neutral news, mixed signals, or unclear impact

Extract any stock symbols, company names, and make realistic predictions based on news sentiment and likely market impact.
`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      throw new Error('No response from Gemini')
    }
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in Gemini response')
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
      stockSymbols: Array.isArray(analysis.stockSymbols) ? analysis.stockSymbols : []
    }
    
  } catch (error) {
    console.error('Gemini analysis error:', error)
    // Return more selective defaults - only process if we're sure it's finance-related
    const hasFinanceKeywords = (headline + ' ' + content).toLowerCase()
      .match(/(stock|market|trading|earn|profit|loss|price|share|invest|fund|bank|crypto|bitcoin|nasdaq|nyse|dow|s&p)/i)
    
    return {
      isFinanceRelated: Boolean(hasFinanceKeywords), // Only if has finance keywords
      isIndianMarket: Boolean((headline + ' ' + content).toLowerCase()
        .match(/(india|indian|nse|bse|mumbai|delhi|rupee|inr|tcs|infos|reliance|hdfc|sbi)/i)),
      sentiment: 'neutral',
      sentimentScore: 0,
      prediction: 'STABLE',
      confidenceScore: 0.3,
      companiesMentioned: [],
      stockSymbols: []
    }
  }
}
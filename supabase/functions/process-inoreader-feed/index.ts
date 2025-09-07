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
    console.log('Starting Inoreader feed processing...')
    
    const feedUrl = 'https://www.inoreader.com/stream/user/1003888559/tag/Senitnel/view/html?cs=m'
    
    // Fetch the RSS feed
    const feedResponse = await fetch(feedUrl)
    const feedText = await feedResponse.text()
    
    console.log('Fetched feed, parsing HTML...')
    
    // Parse HTML to extract news items
    const newsItems = parseInoreaderFeed(feedText)
    console.log(`Found ${newsItems.length} news items`)
    
    let processedCount = 0
    let addedCount = 0
    
    for (const item of newsItems) {
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
        
        // Analyze with Gemini
        const analysis = await analyzeWithGemini(item.headline, item.content)
        
        if (analysis.isFinanceRelated && analysis.isIndianMarket) {
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
              is_indian_market: true,
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
    
    // Log processing results
    await supabase
      .from('feed_processing_log')
      .insert({
        feed_url: feedUrl,
        items_processed: processedCount,
        items_added: addedCount,
        status: 'success'
      })
    
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
    
    await supabase
      .from('feed_processing_log')
      .insert({
        feed_url: 'https://www.inoreader.com/stream/user/1003888559/tag/Senitnel/view/html?cs=m',
        status: 'error',
        error_message: error.message
      })
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function parseInoreaderFeed(html: string) {
  const items = []
  
  // Simple HTML parsing for Inoreader format
  const articleRegex = /<article[^>]*>(.*?)<\/article>/gs
  const matches = html.matchAll(articleRegex)
  
  for (const match of matches) {
    const articleHtml = match[1]
    
    // Extract headline
    const headlineMatch = articleHtml.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/s)
    const headline = headlineMatch ? headlineMatch[1].replace(/<[^>]*>/g, '').trim() : ''
    
    // Extract content/description
    const contentMatch = articleHtml.match(/<p[^>]*>(.*?)<\/p>/s)
    const content = contentMatch ? contentMatch[1].replace(/<[^>]*>/g, '').trim() : ''
    
    // Extract URL
    const urlMatch = articleHtml.match(/href=["'](.*?)["']/s)
    const url = urlMatch ? urlMatch[1] : ''
    
    // Extract date (try different formats)
    const dateMatch = articleHtml.match(/(\d{4}-\d{2}-\d{2})/s) || 
                     articleHtml.match(/(\d{1,2}\/\d{1,2}\/\d{4})/s)
    const publishedAt = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString()
    
    if (headline && url) {
      items.push({
        headline,
        content: content || headline,
        source: 'Inoreader',
        url,
        publishedAt
      })
    }
  }
  
  return items
}

async function analyzeWithGemini(headline: string, content: string) {
  const prompt = `
Analyze this news headline and content for financial relevance and Indian market focus:

Headline: "${headline}"
Content: "${content}"

Provide analysis in this JSON format:
{
  "isFinanceRelated": boolean (true if mentions stocks, companies, markets, earnings, finance, economy),
  "isIndianMarket": boolean (true if mentions Indian companies, NSE, BSE, Indian markets, Indian economy, or Indian stock symbols),
  "sentiment": "positive" | "negative" | "neutral",
  "sentimentScore": number between -1 and 1,
  "prediction": "UP" | "DOWN" | "STABLE",
  "confidenceScore": number between 0 and 1,
  "companiesMentioned": array of company names mentioned,
  "stockSymbols": array of stock symbols mentioned (if any)
}

Focus on Indian stocks and companies. Only return true for isFinanceRelated if it's actually about financial markets, earnings, or business news.
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
    // Return default values if analysis fails
    return {
      isFinanceRelated: true, // Assume finance-related if we can't analyze
      isIndianMarket: true,   // Assume Indian market for this feed
      sentiment: 'neutral',
      sentimentScore: 0,
      prediction: 'STABLE',
      confidenceScore: 0.5,
      companiesMentioned: [],
      stockSymbols: []
    }
  }
}
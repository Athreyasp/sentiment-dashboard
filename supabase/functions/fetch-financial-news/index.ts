
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const newsApiKey = Deno.env.get('NEWS_API_KEY')
    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY not found in environment variables')
    }

    console.log('Fetching financial news from NewsAPI...')

    // Enhanced query for more comprehensive financial news
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=stock%20market%20OR%20finance%20OR%20trading%20OR%20cryptocurrency%20OR%20economy%20OR%20earnings%20OR%20Apple%20OR%20Tesla%20OR%20Microsoft%20OR%20Renesas&sortBy=publishedAt&language=en&pageSize=50`,
      {
        headers: {
          'X-API-Key': newsApiKey,
        },
      }
    )

    if (!newsResponse.ok) {
      console.error(`NewsAPI error: ${newsResponse.status}`)
      const errorText = await newsResponse.text()
      console.error('Error details:', errorText)
      throw new Error(`NewsAPI error: ${newsResponse.status} - ${errorText}`)
    }

    const newsData = await newsResponse.json()
    console.log(`Fetched ${newsData.articles?.length || 0} articles`)

    // Enhanced sentiment analysis with more keywords
    const enhancedSentimentAnalysis = (text: string) => {
      const headline = text.toLowerCase()
      
      const strongPositive = ['surge', 'soar', 'rally', 'boom', 'breakout', 'gains', 'beats', 'exceeds', 'record', 'all-time high']
      const positive = ['rise', 'up', 'growth', 'profit', 'boost', 'strong', 'optimistic', 'bullish', 'upgrade']
      const strongNegative = ['crash', 'plunge', 'collapse', 'tank', 'slump', 'disaster', 'crisis', 'panic']
      const negative = ['fall', 'drop', 'down', 'decline', 'loss', 'concern', 'worry', 'bearish', 'downgrade', 'weak']
      
      if (strongPositive.some(word => headline.includes(word))) return 'positive'
      if (strongNegative.some(word => headline.includes(word))) return 'negative'
      if (positive.some(word => headline.includes(word))) return 'positive'
      if (negative.some(word => headline.includes(word))) return 'negative'
      
      return 'neutral'
    }

    // Enhanced ticker extraction
    const extractTicker = (text: string) => {
      // Common company name to ticker mappings
      const companyToTicker: Record<string, string> = {
        'apple': 'AAPL',
        'microsoft': 'MSFT',
        'tesla': 'TSLA',
        'google': 'GOOGL',
        'alphabet': 'GOOGL',
        'amazon': 'AMZN',
        'meta': 'META',
        'facebook': 'META',
        'netflix': 'NFLX',
        'nvidia': 'NVDA',
        'jpmorgan': 'JPM',
        'berkshire': 'BRK.A',
        'johnson': 'JNJ',
        'visa': 'V',
        'procter': 'PG',
        'mastercard': 'MA',
        'toyota': 'TM',
        'samsung': '005930.KS',
        'asml': 'ASML',
        'taiwan semiconductor': 'TSM',
        'renesas': '6723.T',
        'sony': 'SONY'
      }

      const lowerText = text.toLowerCase()
      
      // Check for company names first
      for (const [company, ticker] of Object.entries(companyToTicker)) {
        if (lowerText.includes(company)) {
          return ticker
        }
      }

      // Look for ticker patterns (2-5 uppercase letters)
      const tickerMatch = text.match(/\b[A-Z]{2,5}\b/)
      return tickerMatch ? tickerMatch[0] : null
    }

    // Process and insert news articles
    if (newsData.articles && newsData.articles.length > 0) {
      const articlesToInsert = newsData.articles
        .filter((article: any) => article.title && article.publishedAt && article.url)
        .map((article: any) => {
          const sentiment = enhancedSentimentAnalysis(article.title + ' ' + (article.description || ''))
          const ticker = extractTicker(article.title + ' ' + (article.description || ''))

          return {
            headline: article.title,
            content: article.description || article.content,
            source: article.source?.name || 'Unknown',
            sentiment,
            ticker,
            url: article.url,
            published_at: article.publishedAt,
          }
        })

      // Check for existing articles and only insert new ones
      const { data: existingArticles } = await supabaseClient
        .from('financial_news')
        .select('url')
        .in('url', articlesToInsert.map(article => article.url))

      const existingUrls = new Set(existingArticles?.map(article => article.url) || [])
      const newArticles = articlesToInsert.filter(article => !existingUrls.has(article.url))

      if (newArticles.length > 0) {
        const { data, error } = await supabaseClient
          .from('financial_news')
          .insert(newArticles)

        if (error) {
          console.error('Database error:', error)
          throw error
        }

        console.log(`Successfully inserted ${newArticles.length} new news articles`)
      } else {
        console.log('No new articles to insert')
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        articlesProcessed: newsData.articles?.length || 0,
        message: 'Financial news fetched successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in fetch-financial-news function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

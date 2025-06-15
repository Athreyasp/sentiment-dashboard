
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
      throw new Error('NEWS_API_KEY not found')
    }

    console.log('Fetching financial news from NewsAPI...')

    // Fetch financial news from NewsAPI
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=finance OR stock OR market OR trading OR cryptocurrency OR economy&sortBy=publishedAt&language=en&pageSize=20`,
      {
        headers: {
          'X-API-Key': newsApiKey,
        },
      }
    )

    if (!newsResponse.ok) {
      throw new Error(`NewsAPI error: ${newsResponse.status}`)
    }

    const newsData = await newsResponse.json()
    console.log(`Fetched ${newsData.articles?.length || 0} articles`)

    // Process and insert news articles
    if (newsData.articles && newsData.articles.length > 0) {
      const articlesToInsert = newsData.articles
        .filter((article: any) => article.title && article.publishedAt && article.url)
        .map((article: any) => {
          // Simple sentiment analysis based on keywords
          const headline = article.title.toLowerCase()
          let sentiment = 'neutral'
          
          const positiveWords = ['surge', 'gains', 'up', 'rise', 'boost', 'growth', 'profit', 'beat', 'strong']
          const negativeWords = ['drop', 'fall', 'down', 'decline', 'loss', 'concern', 'challenge', 'weak']
          
          if (positiveWords.some(word => headline.includes(word))) {
            sentiment = 'positive'
          } else if (negativeWords.some(word => headline.includes(word))) {
            sentiment = 'negative'
          }

          // Extract potential ticker symbols (uppercase words 2-5 chars)
          const tickerMatch = article.title.match(/\b[A-Z]{2,5}\b/)
          const ticker = tickerMatch ? tickerMatch[0] : null

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

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const newsApiKey = Deno.env.get('NEWS_API_KEY');

    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY environment variable is required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Enhanced query for Indian financial news
    const indianFinancialQuery = 'India AND (stock OR share OR market OR NSE OR BSE OR NIFTY OR SENSEX OR rupee OR economy OR financial OR investment OR banking OR RBI OR "Reserve Bank" OR corporate OR earnings OR IPO OR mutual fund OR trading)';
    
    // Fetch from multiple Indian financial sources
    const sources = [
      'business-standard',
      'the-hindu',
      'the-times-of-india'
    ];

    const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(indianFinancialQuery)}&sources=${sources.join(',')}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${newsApiKey}`;
    
    console.log('Fetching Indian financial news from:', newsApiUrl);
    
    const response = await fetch(newsApiUrl);
    const newsData = await response.json();

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${newsData.message || 'Unknown error'}`);
    }

    console.log(`Fetched ${newsData.articles?.length || 0} articles from NewsAPI`);

    // Enhanced sentiment analysis for Indian financial context
    function enhancedIndianSentimentAnalysis(title: string, content: string): 'positive' | 'negative' | 'neutral' {
      const text = `${title} ${content}`.toLowerCase();
      
      const positiveKeywords = [
        'gain', 'rise', 'up', 'surge', 'bull', 'bullish', 'rally', 'boom', 'growth', 'profit',
        'increase', 'high', 'strong', 'optimistic', 'positive', 'upgrade', 'beat', 'outperform',
        'record', 'milestone', 'success', 'expansion', 'launch', 'partnership', 'acquisition',
        'nifty rises', 'sensex gains', 'rupee strengthens', 'fdi inflow', 'gdp growth',
        'earnings beat', 'buyback', 'dividend', 'bonus', 'listing gains', 'ipo success'
      ];

      const negativeKeywords = [
        'fall', 'drop', 'down', 'crash', 'bear', 'bearish', 'decline', 'loss', 'plunge',
        'decrease', 'low', 'weak', 'pessimistic', 'negative', 'downgrade', 'miss', 'underperform',
        'concern', 'worry', 'risk', 'crisis', 'recession', 'inflation', 'deficit',
        'nifty falls', 'sensex drops', 'rupee weakens', 'fii outflow', 'slowdown',
        'earnings miss', 'bankruptcy', 'default', 'suspension', 'delisting', 'scam'
      ];

      const positiveCount = positiveKeywords.filter(keyword => text.includes(keyword)).length;
      const negativeCount = negativeKeywords.filter(keyword => text.includes(keyword)).length;

      if (positiveCount > negativeCount && positiveCount > 0) return 'positive';
      if (negativeCount > positiveCount && negativeCount > 0) return 'negative';
      return 'neutral';
    }

    // Enhanced ticker extraction for Indian stocks
    function extractIndianTicker(title: string, content: string): string | null {
      const text = `${title} ${content}`;
      
      // Common Indian stock patterns
      const tickerPatterns = [
        /\b([A-Z]{2,})\s*(?:share|stock|equity)/gi,
        /\b(RELIANCE|TCS|INFY|HDFCBANK|ICICIBANK|BHARTIARTL|ITC|LT|SBIN|ASIANPAINT|MARUTI|HCLTECH|TECHM|BAJFINANCE|KOTAKBANK|TITAN|ULTRACEMCO|NESTLEIND|HINDUNILVR|WIPRO|AXISBANK|INDUSINDBK|NTPC|POWERGRID|COALINDIA|DRREDDY|SUNPHARMA|CIPLA|JSWSTEEL|TATASTEEL|HINDALCO|ADANIPORTS|HEROMOTOCO|BAJAJFINSV|DIVISLAB|BRITANNIA|EICHERMOT|SHREECEM|UPL|GRASIM|M&M|TATAMOTORS|ONGC|IOC|BPCL)\b/gi,
      ];

      for (const pattern of tickerPatterns) {
        const matches = text.match(pattern);
        if (matches) {
          return matches[0].replace(/\s*(share|stock|equity)/gi, '').trim().toUpperCase();
        }
      }

      return null;
    }

    // Process articles and filter for Indian financial news
    const processedArticles = (newsData.articles || [])
      .filter((article: any) => {
        const content = `${article.title} ${article.description || ''}`.toLowerCase();
        
        // Check for Indian financial context
        const indianKeywords = ['india', 'indian', 'nse', 'bse', 'nifty', 'sensex', 'rupee', 'rbi', 'mumbai', 'delhi'];
        const financialKeywords = ['stock', 'share', 'market', 'financial', 'bank', 'economy', 'trading', 'investment'];
        
        const hasIndianContext = indianKeywords.some(keyword => content.includes(keyword));
        const hasFinancialContext = financialKeywords.some(keyword => content.includes(keyword));
        
        return hasIndianContext && hasFinancialContext;
      })
      .map((article: any) => {
        const sentiment = enhancedIndianSentimentAnalysis(article.title, article.description || '');
        const ticker = extractIndianTicker(article.title, article.description || '');
        
        return {
          headline: article.title,
          content: article.description,
          source: article.source?.name || 'Unknown',
          url: article.url,
          published_at: article.publishedAt,
          sentiment,
          ticker,
        };
      });

    // Check for existing articles to avoid duplicates
    const existingUrls = processedArticles.length > 0 ? 
      await supabase
        .from('financial_news')
        .select('url')
        .in('url', processedArticles.map(article => article.url)) : 
      { data: [] };

    const existingUrlSet = new Set((existingUrls.data || []).map(item => item.url));
    const newArticles = processedArticles.filter(article => !existingUrlSet.has(article.url));

    console.log(`Found ${newArticles.length} new Indian financial articles to insert`);

    // Insert new articles
    if (newArticles.length > 0) {
      const { error: insertError } = await supabase
        .from('financial_news')
        .insert(newArticles);

      if (insertError) {
        console.error('Error inserting articles:', insertError);
        throw insertError;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully processed ${processedArticles.length} Indian financial articles, ${newArticles.length} new articles added`,
      total_articles: processedArticles.length,
      new_articles: newArticles.length,
      articles_with_tickers: newArticles.filter(a => a.ticker).length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-indian-financial-news function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
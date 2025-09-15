import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const symbol = body?.symbol
    
    if (!symbol) {
      throw new Error('Symbol parameter is required')
    }

    console.log(`Fetching Yahoo Finance data for: ${symbol}`)
    
    // Fetch data from Yahoo Finance
    const yahooResponse = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=7d&includePrePost=false`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    )
    
    if (!yahooResponse.ok) {
      throw new Error(`Yahoo Finance API returned ${yahooResponse.status}: ${yahooResponse.statusText}`)
    }

    const yahooData = await yahooResponse.json()
    const result = yahooData.chart?.result?.[0]
    
    if (!result) {
      throw new Error(`No data available for symbol: ${symbol}`)
    }

    const meta = result.meta
    const timestamps = result.timestamp || []
    const quotes = result.indicators?.quote?.[0] || {}
    const closes = quotes.close || []

    const currentPrice = meta.regularMarketPrice || meta.previousClose || 0
    const previousClose = meta.previousClose || 0
    const change = currentPrice - previousClose
    const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

    // Generate trend data from historical prices
    const trendData = timestamps.slice(-7).map((timestamp: number, index: number) => {
      const price = closes[closes.length - 7 + index] || currentPrice
      return {
        date: new Date(timestamp * 1000).toISOString().split('T')[0],
        sentiment: Math.random() * 100, // Mock sentiment data
        price: price
      }
    }).filter(item => !isNaN(item.price))

    const responseData = {
      success: true,
      data: {
        symbol: symbol,
        currentPrice,
        change,
        changePercent,
        previousClose,
        marketCap: meta.marketCap,
        volume: meta.regularMarketVolume,
        trend: trendData,
        meta: {
          currency: meta.currency || 'INR',
          exchangeName: meta.exchangeName || 'NSE',
          fullExchangeName: meta.fullExchangeName || 'National Stock Exchange of India',
          instrumentType: meta.instrumentType || 'EQUITY'
        }
      }
    }

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error fetching Yahoo Finance data:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: 'Failed to fetch data from Yahoo Finance API'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
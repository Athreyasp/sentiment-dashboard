
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface StockPrediction {
  symbol: string
  current_price: number
  predicted_price: number
  predicted_change: number
  confidence: number
  sentiment_impact: number
  recommendation: 'BUY' | 'SELL' | 'HOLD'
  factors: string[]
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { symbol, news_headline, sentiment } = await req.json()
    
    console.log(`Analyzing stock: ${symbol} with news: ${news_headline}`)

    // Fetch stock data from Yahoo Finance API (alternative to yfinance)
    const stockData = await fetchStockData(symbol)
    
    if (!stockData) {
      throw new Error(`Could not fetch data for ${symbol}`)
    }

    // Generate prediction based on technical analysis and sentiment
    const prediction = await generateStockPrediction(stockData, news_headline, sentiment)

    return new Response(
      JSON.stringify({
        success: true,
        data: prediction
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Stock analysis error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function fetchStockData(symbol: string) {
  try {
    // Using Yahoo Finance API alternative since yfinance is Python-specific
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=30d`
    )
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`)
    }

    const data = await response.json()
    const result = data.chart.result[0]
    
    if (!result) {
      throw new Error(`No data found for ${symbol}`)
    }

    const meta = result.meta
    const prices = result.indicators.quote[0]
    
    return {
      symbol: symbol,
      current_price: meta.regularMarketPrice,
      previous_close: meta.previousClose,
      day_high: meta.regularMarketDayHigh,
      day_low: meta.regularMarketDayLow,
      volume: meta.regularMarketVolume,
      market_cap: meta.marketCap,
      prices: {
        open: prices.open.slice(-30),
        high: prices.high.slice(-30),
        low: prices.low.slice(-30),
        close: prices.close.slice(-30),
        volume: prices.volume.slice(-30)
      },
      timestamps: result.timestamp.slice(-30)
    }
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error)
    return null
  }
}

async function generateStockPrediction(stockData: any, newsHeadline: string, sentiment: string): Promise<StockPrediction> {
  const currentPrice = stockData.current_price
  const previousClose = stockData.previous_close
  const dayChange = ((currentPrice - previousClose) / previousClose) * 100
  
  // Technical Analysis - Simple Moving Average and RSI calculation
  const prices = stockData.prices.close.filter((p: number) => p !== null)
  const sma5 = calculateSMA(prices, 5)
  const sma20 = calculateSMA(prices, 20)
  const rsi = calculateRSI(prices, 14)
  const volatility = calculateVolatility(prices)
  
  // Sentiment Impact Calculation
  let sentimentMultiplier = 1
  switch (sentiment) {
    case 'positive':
      sentimentMultiplier = 1.02 + (Math.random() * 0.03) // 2-5% positive impact
      break
    case 'negative':
      sentimentMultiplier = 0.98 - (Math.random() * 0.03) // 2-5% negative impact
      break
    default:
      sentimentMultiplier = 1 + ((Math.random() - 0.5) * 0.02) // ±1% neutral impact
  }
  
  // Technical indicators influence
  let technicalMultiplier = 1
  if (sma5 > sma20 && rsi < 70) {
    technicalMultiplier += 0.01 // Bullish trend
  } else if (sma5 < sma20 && rsi > 30) {
    technicalMultiplier -= 0.01 // Bearish trend
  }
  
  // Volatility adjustment
  const volatilityAdjustment = Math.min(volatility * 0.1, 0.05)
  
  // Calculate predicted price
  const baseChange = (sentimentMultiplier - 1) + (technicalMultiplier - 1)
  const predictedChange = baseChange + ((Math.random() - 0.5) * volatilityAdjustment)
  const predictedPrice = currentPrice * (1 + predictedChange)
  
  // Confidence calculation (higher for less volatile stocks and stronger signals)
  const confidence = Math.max(0.6, Math.min(0.95, 
    0.8 - (volatility * 0.5) + (Math.abs(baseChange) * 2)
  ))
  
  // Generate recommendation
  let recommendation: 'BUY' | 'SELL' | 'HOLD' = 'HOLD'
  if (predictedChange > 0.02 && rsi < 70) recommendation = 'BUY'
  else if (predictedChange < -0.02 && rsi > 30) recommendation = 'SELL'
  
  // Analysis factors
  const factors = [
    `Technical: SMA5 ${sma5 > sma20 ? 'above' : 'below'} SMA20`,
    `RSI: ${rsi.toFixed(1)} (${rsi > 70 ? 'Overbought' : rsi < 30 ? 'Oversold' : 'Neutral'})`,
    `Sentiment: ${sentiment.toUpperCase()} impact from news`,
    `Volatility: ${(volatility * 100).toFixed(1)}%`,
    `Volume: ${stockData.volume > (stockData.prices.volume.reduce((a: number, b: number) => a + b, 0) / stockData.prices.volume.length) ? 'Above' : 'Below'} average`
  ]
  
  return {
    symbol: stockData.symbol,
    current_price: currentPrice,
    predicted_price: predictedPrice,
    predicted_change: predictedChange * 100,
    confidence: confidence * 100,
    sentiment_impact: (sentimentMultiplier - 1) * 100,
    recommendation,
    factors
  }
}

function calculateSMA(prices: number[], period: number): number {
  const validPrices = prices.slice(-period)
  return validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length
}

function calculateRSI(prices: number[], period: number): number {
  const changes = prices.slice(1).map((price, i) => price - prices[i])
  const gains = changes.map(change => change > 0 ? change : 0)
  const losses = changes.map(change => change < 0 ? -change : 0)
  
  const avgGain = gains.slice(-period).reduce((sum, gain) => sum + gain, 0) / period
  const avgLoss = losses.slice(-period).reduce((sum, loss) => sum + loss, 0) / period
  
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - (100 / (1 + rs))
}

function calculateVolatility(prices: number[]): number {
  const returns = prices.slice(1).map((price, i) => Math.log(price / prices[i]))
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
  return Math.sqrt(variance)
}

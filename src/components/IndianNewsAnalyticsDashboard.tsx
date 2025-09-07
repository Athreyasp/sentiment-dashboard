import React, { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, BarChart3 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Extended interface that includes our new columns
interface ExtendedNewsItem {
  id: string
  headline: string
  content: string | null
  source: string
  url: string | null
  published_at: string
  sentiment: string | null
  sentiment_score?: number | null
  prediction?: string | null
  confidence_score?: number | null
  company_mentioned?: string[] | null
  stock_symbols?: string[] | null
  is_indian_market?: boolean | null
  ticker: string | null
  created_at: string
  updated_at: string
  processed_at?: string | null
}

export default function IndianNewsAnalyticsDashboard() {
  const [news, setNews] = useState<ExtendedNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadNews()
    
    // Set up real-time subscription
    const channel = supabase
      .channel('financial-news-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'financial_news'
        },
        (payload) => {
          const newItem = payload.new as ExtendedNewsItem
          if (newItem.is_indian_market) {
            setNews(prev => [newItem, ...prev])
            toast({
              title: "New Financial News",
              description: newItem.headline.substring(0, 100) + "...",
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('financial_news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(50)

      if (error) throw error
      
      // Filter for Indian news or add sample data if none exists
      const extendedNews = (data || []).map(item => ({
        ...item,
        sentiment_score: (item as any).sentiment_score || 0,
        prediction: (item as any).prediction || 'STABLE',
        confidence_score: (item as any).confidence_score || 0.5,
        company_mentioned: (item as any).company_mentioned || [],
        stock_symbols: (item as any).stock_symbols || [],
        is_indian_market: (item as any).is_indian_market ?? true,
        processed_at: (item as any).processed_at || null
      })) as ExtendedNewsItem[]
      
      setNews(extendedNews)
    } catch (error) {
      console.error('Error loading news:', error)
      toast({
        title: "Error",
        description: "Failed to load news data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const processFeed = async () => {
    try {
      setProcessing(true)
      toast({
        title: "Processing Feed",
        description: "Fetching and analyzing latest news with Gemini AI...",
      })

      const { data, error } = await supabase.functions.invoke('process-inoreader-feed')
      
      if (error) throw error
      
      toast({
        title: "Feed Processed",
        description: `Added ${data?.added || 0} new articles`,
      })
      
      await loadNews()
    } catch (error) {
      console.error('Error processing feed:', error)
      toast({
        title: "Error",
        description: "Failed to process feed. Make sure the Gemini API key is configured.",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const filteredNews = news.filter(item => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.headline.toLowerCase().includes(query) ||
      (item.company_mentioned && item.company_mentioned.some(company => company.toLowerCase().includes(query))) ||
      (item.stock_symbols && item.stock_symbols.some(symbol => symbol.toLowerCase().includes(query))) ||
      (item.ticker && item.ticker.toLowerCase().includes(query))
    )
  })

  const getSentimentBadge = (sentiment: string | null, score: number | null) => {
    const sentimentValue = sentiment || 'neutral'
    const scoreValue = score || 0
    const color = sentimentValue === 'positive' ? 'bg-green-100 text-green-800' :
                  sentimentValue === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
    
    return (
      <Badge className={color}>
        {sentimentValue} ({(Math.abs(scoreValue) * 100).toFixed(0)}%)
      </Badge>
    )
  }

  const getPredictionIcon = (prediction: string | null) => {
    switch (prediction) {
      case 'UP': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'DOWN': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getPredictionColor = (prediction: string | null) => {
    switch (prediction) {
      case 'UP': return 'text-green-600 bg-green-50'
      case 'DOWN': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Indian Financial News Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered sentiment analysis and stock predictions using Google Gemini
            </p>
          </div>
          <Button 
            onClick={processFeed} 
            disabled={processing}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${processing ? 'animate-spin' : ''}`} />
            {processing ? 'Processing...' : 'Refresh Feed'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold">{news.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50/60 backdrop-blur-sm border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <p className="text-2xl font-bold text-green-600">
                    {news.filter(n => n.sentiment === 'positive').length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50/60 backdrop-blur-sm border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                  <p className="text-2xl font-bold text-red-600">
                    {news.filter(n => n.sentiment === 'negative').length}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-50/60 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bullish Predictions</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {news.filter(n => n.prediction === 'UP').length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by company name, stock symbol, or headline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/60 backdrop-blur-sm"
          />
        </div>

        {/* News Items */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-lg font-medium">Loading financial news...</p>
              <p className="text-muted-foreground">Fetching latest Indian market updates</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No news articles found</p>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Click 'Refresh Feed' to fetch the latest Indian financial news"}
                </p>
                {searchQuery ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button 
                    onClick={processFeed}
                    disabled={processing}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  >
                    Refresh Feed
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredNews.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg leading-tight flex-1">
                      <a 
                        href={item.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.headline}
                      </a>
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getPredictionIcon(item.prediction)}
                      <Badge className={getPredictionColor(item.prediction)}>
                        {item.prediction || 'STABLE'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {item.content && item.content !== item.headline && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {item.content}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getSentimentBadge(item.sentiment, item.sentiment_score)}
                    
                    <Badge variant="outline" className="bg-blue-50">
                      Confidence: {((item.confidence_score || 0.5) * 100).toFixed(0)}%
                    </Badge>
                    
                    {(item.company_mentioned || []).map((company, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-800">
                        {company}
                      </Badge>
                    ))}
                    
                    {(item.stock_symbols || []).map((symbol, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">
                        {symbol}
                      </Badge>
                    ))}
                    
                    {item.ticker && (
                      <Badge className="bg-orange-100 text-orange-800">
                        {item.ticker}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="font-medium">{item.source}</span>
                    <span>{new Date(item.published_at).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>Powered by Google Gemini AI • Real-time Indian Financial News Analysis</p>
          <p className="mt-1">Updates automatically every few minutes</p>
        </div>
      </div>
    </div>
  )
}
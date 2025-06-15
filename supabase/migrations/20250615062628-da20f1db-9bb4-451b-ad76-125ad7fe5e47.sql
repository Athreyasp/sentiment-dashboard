
-- Create a table for financial news articles
CREATE TABLE public.financial_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  content TEXT,
  source TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')) DEFAULT 'neutral',
  ticker TEXT,
  url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index for better query performance
CREATE INDEX idx_financial_news_published_at ON public.financial_news(published_at DESC);
CREATE INDEX idx_financial_news_ticker ON public.financial_news(ticker);
CREATE INDEX idx_financial_news_sentiment ON public.financial_news(sentiment);

-- Enable Row Level Security (RLS) - make news publicly readable
ALTER TABLE public.financial_news ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read news (no authentication required)
CREATE POLICY "Anyone can view financial news" 
  ON public.financial_news 
  FOR SELECT 
  USING (true);

-- Enable realtime for live updates
ALTER TABLE public.financial_news REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_news;

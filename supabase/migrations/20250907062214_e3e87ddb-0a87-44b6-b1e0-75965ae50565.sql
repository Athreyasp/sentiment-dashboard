-- Add new columns to financial_news table for enhanced analysis
ALTER TABLE public.financial_news 
ADD COLUMN IF NOT EXISTS prediction VARCHAR(10) CHECK (prediction IN ('UP', 'DOWN', 'STABLE')),
ADD COLUMN IF NOT EXISTS confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
ADD COLUMN IF NOT EXISTS sentiment_score DECIMAL(3,2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
ADD COLUMN IF NOT EXISTS company_mentioned TEXT[],
ADD COLUMN IF NOT EXISTS stock_symbols TEXT[],
ADD COLUMN IF NOT EXISTS is_indian_market BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE;

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_financial_news_company_search ON public.financial_news USING GIN(company_mentioned);
CREATE INDEX IF NOT EXISTS idx_financial_news_symbols_search ON public.financial_news USING GIN(stock_symbols);
CREATE INDEX IF NOT EXISTS idx_financial_news_indian_market ON public.financial_news (is_indian_market, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_financial_news_sentiment ON public.financial_news (sentiment, sentiment_score);

-- Create a table for tracking feed processing
CREATE TABLE IF NOT EXISTS public.feed_processing_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_url TEXT NOT NULL,
  last_processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  items_processed INTEGER DEFAULT 0,
  items_added INTEGER DEFAULT 0,
  status TEXT DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for feed_processing_log
ALTER TABLE public.feed_processing_log ENABLE ROW LEVEL SECURITY;

-- Create policy for feed_processing_log (read-only for everyone)
CREATE POLICY "Feed processing log is viewable by everyone" 
ON public.feed_processing_log 
FOR SELECT 
USING (true);

-- Add RLS policy for inserting/updating financial_news (for edge functions)
CREATE POLICY "Edge functions can insert financial news" 
ON public.financial_news 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Edge functions can update financial news" 
ON public.financial_news 
FOR UPDATE 
USING (true);

-- Enable realtime for financial_news
ALTER TABLE public.financial_news REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_news;
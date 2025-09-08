-- Add missing columns for AI analysis features
ALTER TABLE financial_news 
ADD COLUMN IF NOT EXISTS sentiment_score NUMERIC,
ADD COLUMN IF NOT EXISTS prediction TEXT,
ADD COLUMN IF NOT EXISTS confidence_score NUMERIC,
ADD COLUMN IF NOT EXISTS company_mentioned TEXT[],
ADD COLUMN IF NOT EXISTS stock_symbols TEXT[],
ADD COLUMN IF NOT EXISTS is_indian_market BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE;

-- Update existing records to mark them as processed and set defaults
UPDATE financial_news 
SET 
  sentiment_score = CASE 
    WHEN sentiment = 'positive' THEN 0.7
    WHEN sentiment = 'negative' THEN -0.7  
    ELSE 0.0
  END,
  prediction = 'STABLE',
  confidence_score = 0.5,
  is_indian_market = TRUE,
  processed_at = now()
WHERE sentiment_score IS NULL;
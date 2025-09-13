-- Add additional columns to financial_news table for enhanced predictions
ALTER TABLE public.financial_news 
ADD COLUMN IF NOT EXISTS target_price NUMERIC,
ADD COLUMN IF NOT EXISTS timeframe TEXT DEFAULT '1D',
ADD COLUMN IF NOT EXISTS key_factors TEXT[];

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_financial_news_prediction ON public.financial_news(prediction, confidence_score);
CREATE INDEX IF NOT EXISTS idx_financial_news_indian_market ON public.financial_news(is_indian_market, published_at DESC);

-- Update trigger to ensure updated_at is set
DROP TRIGGER IF EXISTS update_financial_news_updated_at ON public.financial_news;
CREATE TRIGGER update_financial_news_updated_at
  BEFORE UPDATE ON public.financial_news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
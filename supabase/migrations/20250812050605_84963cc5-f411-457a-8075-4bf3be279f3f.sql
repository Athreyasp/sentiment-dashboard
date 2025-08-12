-- Create table for index data (NIFTY 50, SENSEX, etc.)
CREATE TABLE public.market_indices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  index_name TEXT NOT NULL,
  index_symbol TEXT NOT NULL,
  current_value DECIMAL(12,2) NOT NULL,
  change_value DECIMAL(12,2),
  change_percent DECIMAL(5,2),
  open_value DECIMAL(12,2),
  high_value DECIMAL(12,2),
  low_value DECIMAL(12,2),
  previous_close DECIMAL(12,2),
  market_cap BIGINT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.market_indices ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Market indices are viewable by everyone" 
ON public.market_indices 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_market_indices_updated_at
BEFORE UPDATE ON public.market_indices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial NIFTY 50 data
INSERT INTO public.market_indices (
  index_name,
  index_symbol, 
  current_value,
  change_value,
  change_percent,
  open_value,
  high_value,
  low_value,
  previous_close
) VALUES (
  'NIFTY 50',
  '^NSEI',
  24596.15,
  0.00,
  0.00,
  24596.15,
  24596.15,
  24596.15,
  24596.15
);
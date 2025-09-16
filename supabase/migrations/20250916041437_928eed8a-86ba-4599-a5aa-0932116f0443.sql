-- Remove duplicate entries, keeping only the most recent one based on created_at
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY headline, url ORDER BY created_at DESC) as rn
  FROM financial_news
  WHERE headline IS NOT NULL AND url IS NOT NULL
),
to_delete AS (
  SELECT id FROM duplicates WHERE rn > 1
)
DELETE FROM financial_news 
WHERE id IN (SELECT id FROM to_delete);

-- Also remove duplicates based on headline alone for cases where URL might be NULL
WITH headline_duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY headline ORDER BY created_at DESC) as rn
  FROM financial_news
  WHERE headline IS NOT NULL
),
headline_to_delete AS (
  SELECT id FROM headline_duplicates WHERE rn > 1
)
DELETE FROM financial_news 
WHERE id IN (SELECT id FROM headline_to_delete);

-- Add a unique constraint to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_financial_news_unique_headline 
ON financial_news (headline) 
WHERE headline IS NOT NULL;
-- 1) Remove duplicate rows based on exact URL (keep latest by published_at, then created_at)
with ranked_url as (
  select id,
         row_number() over (
           partition by url
           order by published_at desc nulls last, created_at desc
         ) as rn
  from public.financial_news
  where url is not null
)
delete from public.financial_news f
using ranked_url r
where f.id = r.id
  and r.rn > 1;

-- 2) Remove duplicate rows based on normalized headline when URL is null or differs
with ranked_headline as (
  select id,
         trim(regexp_replace(lower(coalesce(headline,'')), '\s+', ' ', 'g')) as norm_headline,
         row_number() over (
           partition by trim(regexp_replace(lower(coalesce(headline,'')), '\s+', ' ', 'g'))
           order by published_at desc nulls last, created_at desc
         ) as rn
  from public.financial_news
)
delete from public.financial_news f
using ranked_headline r
where f.id = r.id
  and r.rn > 1;

-- 3) Prevent future duplicates
--    a) Unique on URL when present
create unique index if not exists uniq_financial_news_url
  on public.financial_news (url)
  where url is not null;

--    b) Unique on normalized headline (case/space-insensitive)
create unique index if not exists uniq_financial_news_norm_headline
  on public.financial_news (
    (trim(regexp_replace(lower(headline), '\s+', ' ', 'g')))
  );

-- 4) Optimize dashboard query (Indian + recent ordering)
create index if not exists idx_financial_news_indian_recent
  on public.financial_news (is_indian_market, published_at desc);

CREATE OR REPLACE FUNCTION public.match_scholarships(profile_embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id bigint, content text, name text, url text)
 LANGUAGE sql
AS $function$
  select id, content, name, url
  from scholarships
  where scholarships.embedding <#> profile_embedding < -match_threshold
  order by scholarships.embedding <#> profile_embedding asc
  limit least(match_count, 100);
$function$
;
-- Drop old RLS policy that restricts to authenticated users only
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON institutions;

-- Create new RLS policy to allow all users (authenticated and anonymous) to view scholarships
CREATE POLICY "Enable select for all users"
ON "public"."institutions"
AS PERMISSIVE
FOR SELECT
TO anon, authenticated
USING (true);
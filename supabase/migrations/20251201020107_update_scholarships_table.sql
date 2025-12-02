-- Create benefit_type ENUM for type-safe benefit categorization
CREATE TYPE benefit_type AS ENUM ('tuition', 'housing', 'maintenance', 'other');

-- Drop unused columns (no longer needed since documents table handles embeddings/chat)
ALTER TABLE scholarships 
  DROP COLUMN IF EXISTS content,
  DROP COLUMN IF EXISTS embedding,
  DROP COLUMN IF EXISTS scholarship_category;

-- Add new columns for scholarship directory
ALTER TABLE scholarships 
  ADD COLUMN overview TEXT NOT NULL DEFAULT '',
  ADD COLUMN benefit_types benefit_type[] NOT NULL DEFAULT '{}';

-- Remove default from overview (make it explicitly required for new inserts)
ALTER TABLE scholarships 
  ALTER COLUMN overview DROP DEFAULT;

-- Drop old RLS policy that restricts to authenticated users only
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON scholarships;

-- Create new RLS policy to allow all users (authenticated and anonymous) to view scholarships
CREATE POLICY "Enable select for all users"
ON "public"."scholarships"
AS PERMISSIVE
FOR SELECT
TO anon, authenticated
USING (true);

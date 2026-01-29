-- Create study_level_type ENUM for type-safe study level categorization
CREATE TYPE study_level_type AS ENUM ('undergraduate', 'graduate');

-- Add study_levels column to scholarships table
ALTER TABLE scholarships 
  ADD COLUMN study_levels study_level_type[] NOT NULL DEFAULT '{}';

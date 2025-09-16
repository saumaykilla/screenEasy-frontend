-- Create profiles migration
-- This migration creates the profile structure based on the TypeScript schema

-- Create enums for section types and templates
CREATE TYPE section_type AS ENUM (
  'Skills',
  'PersonalDetails', 
  'RoleDetails',
  'EducationDetails',
  'WorkExperience',
  'CustomSection'
);

CREATE TYPE template_type AS ENUM (
  'Classic',
  'Modern'
);

-- Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Personal Details (JSONB for flexibility)
  personal_details JSONB NOT NULL DEFAULT '{
    "fullName": "",
    "email": "",
    "country": null,
    "contactNumber": null,
    "city": null
  }'::jsonb,
  
  -- Role Details
  role_details JSONB DEFAULT '{
    "summary": null,
    "linkedInURL": null,
    "additionalLinks": []
  }'::jsonb,
  
  -- Education Details
  education JSONB DEFAULT '{
    "fieldName": "Education",
    "lineItem": []
  }'::jsonb,
  
  -- Work Experience
  work_experience JSONB DEFAULT '{
    "fieldName": "Work Experience",
    "lineItem": []
  }'::jsonb,
  
  -- Skills
  skills JSONB DEFAULT '{
    "fieldName": "Skills",
    "data": null
  }'::jsonb,
  
  -- Custom Sections
  custom_sections JSONB DEFAULT '[]'::jsonb,
  
  -- Template and Section Order
  template template_type NOT NULL DEFAULT 'Classic',
  section_order JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT profiles_user_id_unique UNIQUE (user_id),
  CONSTRAINT profiles_personal_details_email_valid CHECK (
    (personal_details->>'email')::text ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  CONSTRAINT profiles_template_valid CHECK (
    template IN ('Classic', 'Modern')
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Optional: Policy for public read access (uncomment if needed)
-- CREATE POLICY "Profiles are publicly readable" ON profiles
--   FOR SELECT USING (true);

-- Create function to validate profile structure
CREATE OR REPLACE FUNCTION validate_profile_structure(profile_data JSONB)
RETURNS BOOLEAN AS $$
DECLARE
  personal_details JSONB;
  education JSONB;
  section_order JSONB;
  section_item JSONB;
BEGIN
  -- Check if personal_details exists and has required fields
  personal_details := profile_data->'personalDetails';
  IF personal_details IS NULL OR 
     (personal_details->>'fullName') IS NULL OR 
     (personal_details->>'email') IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if education exists and has required structure
  education := profile_data->'education';
  IF education IS NULL OR 
     (education->>'fieldName') IS NULL OR
     (education->'lineItem') IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if section_order exists and is an array
  section_order := profile_data->'sectionOrder';
  IF section_order IS NULL OR jsonb_typeof(section_order) != 'array' THEN
    RETURN FALSE;
  END IF;
  
  -- Validate each section order item
  FOR section_item IN SELECT * FROM jsonb_array_elements(section_order)
  LOOP
    IF (section_item->>'id') IS NULL OR 
       (section_item->>'type') IS NULL OR
       (section_item->>'value') IS NULL THEN
      RETURN FALSE;
    END IF;
  END LOOP;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Add check constraint for profile structure validation
-- Note: This is commented out as it might be too restrictive for initial setup
-- You can uncomment it after testing
-- ALTER TABLE profiles ADD CONSTRAINT profiles_structure_valid 
--   CHECK (validate_profile_structure(
--     jsonb_build_object(
--       'personalDetails', personal_details,
--       'education', education,
--       'sectionOrder', section_order
--     )
--   ));

-- Grant necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;


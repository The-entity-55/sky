-- Modify the user_profiles table to use clerk_user_id
ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_user_id_key;

-- Add clerk_user_id column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'user_profiles' 
                  AND column_name = 'clerk_user_id') THEN
        ALTER TABLE user_profiles
        ADD COLUMN clerk_user_id TEXT;
    END IF;
END $$;

-- Copy existing user_id to clerk_user_id if needed
UPDATE user_profiles
SET clerk_user_id = user_id
WHERE clerk_user_id IS NULL;

-- Make clerk_user_id NOT NULL and add unique constraint
ALTER TABLE user_profiles
ALTER COLUMN clerk_user_id SET NOT NULL;

ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_clerk_user_id_key UNIQUE (clerk_user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Create new policies
CREATE POLICY "Users can read own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

CREATE POLICY "Users can update own profile"
ON user_profiles
FOR UPDATE
TO authenticated
USING (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

CREATE POLICY "Users can insert own profile"
ON user_profiles
FOR INSERT
TO authenticated
WITH CHECK (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

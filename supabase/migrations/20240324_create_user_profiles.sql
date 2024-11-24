-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_user_id text NOT NULL UNIQUE,
    full_name text,
    email text,
    grade text,
    age text,
    school text,
    subjects text,
    bio text,
    phone_number text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

CREATE POLICY "Users can update own profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

CREATE POLICY "Users can insert own profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_user_id ON public.user_profiles(clerk_user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

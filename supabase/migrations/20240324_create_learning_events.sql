-- Create learning_events table
CREATE TABLE IF NOT EXISTS public.learning_events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_user_id text NOT NULL,
    type text NOT NULL CHECK (type IN ('question', 'note', 'voice_interaction')),
    subject text,
    content text NOT NULL,
    timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    FOREIGN KEY (clerk_user_id) REFERENCES public.user_profiles(clerk_user_id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.learning_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own learning events"
ON public.learning_events
FOR SELECT
TO authenticated
USING (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

CREATE POLICY "Users can insert own learning events"
ON public.learning_events
FOR INSERT
TO authenticated
WITH CHECK (clerk_user_id = current_setting('request.jwt.claims')::json->>'clerk_user_id');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_learning_events_clerk_user_id ON public.learning_events(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_learning_events_type ON public.learning_events(type);
CREATE INDEX IF NOT EXISTS idx_learning_events_timestamp ON public.learning_events(timestamp);

-- Add trigger for updated_at
CREATE TRIGGER handle_learning_events_updated_at
    BEFORE UPDATE ON public.learning_events
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Schema Phase 6: Analytics Tracking
-- This script creates the analytics_events table for tracking profile views and block clicks

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    block_id UUID REFERENCES public.blocks(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so public visitors can track views/clicks)
CREATE POLICY "Allow anonymous inserts for tracking"
    ON public.analytics_events
    FOR INSERT
    WITH CHECK (true);

-- Allow users to view their own analytics
CREATE POLICY "Users can view own analytics"
    ON public.analytics_events
    FOR SELECT
    USING (auth.uid() = profile_id);

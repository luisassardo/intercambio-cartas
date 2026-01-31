-- Anonymous Letter Exchange Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pseudonym TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name_encrypted TEXT NOT NULL,
  address_encrypted TEXT NOT NULL,
  city_encrypted TEXT NOT NULL,
  postal_code_encrypted TEXT NOT NULL,
  country_encrypted TEXT NOT NULL,
  is_hospice BOOLEAN DEFAULT FALSE,
  hospice_name TEXT,
  matched BOOLEAN DEFAULT FALSE,
  matched_to UUID REFERENCES participants(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES participants(id),
  receiver_id UUID NOT NULL REFERENCES participants(id),
  sender_pseudonym TEXT NOT NULL,
  receiver_pseudonym TEXT NOT NULL,
  emails_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_participants_matched ON participants(matched);
CREATE INDEX IF NOT EXISTS idx_participants_pseudonym ON participants(pseudonym);
CREATE INDEX IF NOT EXISTS idx_participants_is_hospice ON participants(is_hospice);
CREATE INDEX IF NOT EXISTS idx_matches_sender ON matches(sender_id);
CREATE INDEX IF NOT EXISTS idx_matches_receiver ON matches(receiver_id);

-- Enable Row Level Security on tables
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for participants
-- Allow anonymous inserts (for registration)
CREATE POLICY "Allow anonymous registration" 
  ON participants FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow authenticated users to read their own data (by email match)
CREATE POLICY "Users can read own participant data" 
  ON participants FOR SELECT 
  TO authenticated 
  USING (email = auth.email());

-- Allow service role to read all data (for admin functions)
CREATE POLICY "Service role can read all participants" 
  ON participants FOR SELECT 
  TO service_role 
  USING (true);

-- Allow service role to update participants
CREATE POLICY "Service role can update participants" 
  ON participants FOR UPDATE 
  TO service_role 
  USING (true);

-- Allow service role to delete participants
CREATE POLICY "Service role can delete participants" 
  ON participants FOR DELETE 
  TO service_role 
  USING (true);

-- Create RLS policies for matches
-- Allow service role full access to matches
CREATE POLICY "Service role can manage matches" 
  ON matches FOR ALL 
  TO service_role 
  USING (true);

-- Allow authenticated users to see their own matches
CREATE POLICY "Users can see their own matches" 
  ON matches FOR SELECT 
  TO authenticated 
  USING (
    sender_id IN (SELECT id FROM participants WHERE email = auth.email())
    OR receiver_id IN (SELECT id FROM participants WHERE email = auth.email())
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for admin dashboard (service role only)
CREATE OR REPLACE VIEW participant_stats AS
SELECT 
  COUNT(*) as total_participants,
  COUNT(*) FILTER (WHERE matched = FALSE) as unmatched_count,
  COUNT(*) FILTER (WHERE matched = TRUE) as matched_count,
  COUNT(*) FILTER (WHERE is_hospice = TRUE) as hospice_count
FROM participants;

-- Grant permissions
GRANT SELECT ON participant_stats TO service_role;
GRANT SELECT ON participant_stats TO authenticated;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name) VALUES ('admin'), ('broker'), ('lead');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id),
  phone VARCHAR(50),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create broker_profiles table
CREATE TABLE IF NOT EXISTS broker_profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  license_number VARCHAR(100),
  years_experience INTEGER,
  bio TEXT,
  website VARCHAR(255),
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property_types table
CREATE TABLE IF NOT EXISTS property_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_property_requests table
CREATE TABLE IF NOT EXISTS lead_property_requests (
  id SERIAL PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_type_id INTEGER NOT NULL REFERENCES property_types(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_min INTEGER,
  area_max INTEGER,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create broker_lead_connections table
CREATE TABLE IF NOT EXISTS broker_lead_connections (
  id SERIAL PRIMARY KEY,
  broker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  request_id INTEGER NOT NULL REFERENCES lead_property_requests(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(broker_id, request_id)
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_purpose VARCHAR(50),
  preferred_city VARCHAR(100),
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Enable RLS on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_property_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_lead_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for broker_profiles table
CREATE POLICY "Brokers can view their own profile" ON broker_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Brokers can update their own profile" ON broker_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for lead_property_requests table
CREATE POLICY "Leads can view their own requests" ON lead_property_requests
  FOR SELECT USING (auth.uid() = lead_id);

CREATE POLICY "Leads can insert their own requests" ON lead_property_requests
  FOR INSERT WITH CHECK (auth.uid() = lead_id);

CREATE POLICY "Leads can update their own requests" ON lead_property_requests
  FOR UPDATE USING (auth.uid() = lead_id);

CREATE POLICY "Brokers can view all active requests" ON lead_property_requests
  FOR SELECT USING (is_active = true);

-- Create policies for broker_lead_connections table
CREATE POLICY "Brokers can view their own connections" ON broker_lead_connections
  FOR SELECT USING (auth.uid() = broker_id);

CREATE POLICY "Brokers can insert their own connections" ON broker_lead_connections
  FOR INSERT WITH CHECK (auth.uid() = broker_id);

CREATE POLICY "Leads can view connections to their requests" ON broker_lead_connections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lead_property_requests
      WHERE lead_property_requests.id = broker_lead_connections.request_id
      AND lead_property_requests.lead_id = auth.uid()
    )
  );

-- Create policies for user_preferences table
CREATE POLICY "Users can view their own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
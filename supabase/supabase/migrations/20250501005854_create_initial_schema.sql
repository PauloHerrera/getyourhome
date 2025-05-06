-- Create status enum
create type public.status as enum (
    'pending',
    'active',
    'inactive',
    'deleted'
);

-- Create roles enum
create type public.roles as enum (
    'admin',
    'broker',
    'lead'
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  role public.roles NOT NULL,
  status public.status not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  terms_accepted boolean not null default false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brokers table
CREATE TABLE IF NOT EXISTS brokers (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- indexes for users table
create index users_metadata_idx on public.users using gin (metadata);

-- indexes for brokers table
create index brokers_license_number_idx on public.brokers (license_number);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;

grant all privileges on table public.users to authenticated, service_role;
grant all privileges on table public.brokers to authenticated, service_role;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for brokers table
CREATE POLICY "Brokers can view their own profile" ON brokers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Brokers can update their own profile" ON brokers
  FOR UPDATE USING (auth.uid() = id);


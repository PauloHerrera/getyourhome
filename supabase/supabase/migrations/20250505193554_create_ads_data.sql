-- Create transaction_type enum
create type public.transaction_type as enum (
    'sale',
    'rent',
    'sale_rent'
);

-- Create property_types table
CREATE TABLE IF NOT EXISTS property_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status status NOT NULL DEFAULT 'active',
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status status NOT NULL DEFAULT 'active',
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -- Create property_ads table
CREATE TABLE IF NOT EXISTS property_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status status NOT NULL DEFAULT 'pending',
  transaction_type transaction_type NOT NULL,
  property_type_id UUID NULL REFERENCES property_types(id),
  acquisition_purpose VARCHAR(100) NULL,
  min_price numeric(10, 2) not null default 0.0 check (min_price >= 0),
  max_price numeric(10, 2) not null default 0.0 check (max_price >= 0),
  bedrooms INTEGER default 0,
  bathrooms INTEGER default 0,
  area_min INTEGER default 0,
  area_max INTEGER default 0,
  neighborhood VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  uf VARCHAR(255) NULL,
  description TEXT NULL,
  mandatory_amenities VARCHAR(255)[] NULL,
  desired_amenities VARCHAR(255)[] NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- indexes for property_types table
create index property_types_status_idx on public.property_types using btree (status);

-- indexes for property_amenities table
create index property_amenities_status_idx on public.property_amenities using btree (status);

-- indexes for property_ads table
create index property_ads_lead_id_idx on public.property_ads using btree (lead_id);
create index property_ads_status_idx on public.property_ads using btree (status);
create index property_ads_property_type_id_idx on public.property_ads using btree (property_type_id);

-- Enable RLS
ALTER TABLE property_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_ads ENABLE ROW LEVEL SECURITY;


-- Allow only admins to insert into property_types
CREATE POLICY "Admins can insert property types" ON property_types
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow only admins to update property_types
CREATE POLICY "Admins can update property types" ON property_types
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow only admins to insert into property_amenities
CREATE POLICY "Admins can insert property amenities" ON property_amenities
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow only admins to update property_amenities
CREATE POLICY "Admins can update property amenities" ON property_amenities
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for property_ads table
CREATE POLICY "Users can view their own property ads" ON property_ads
  FOR SELECT USING (auth.uid() = lead_id);

-- Create policies for property_ads table
CREATE POLICY "Users can update their own property ads" ON property_ads
  FOR UPDATE USING (auth.uid() = lead_id);

-- Create policies for property_ads table
CREATE POLICY "Users can insert their own property ads" ON property_ads
  FOR INSERT WITH CHECK (auth.uid() = lead_id);

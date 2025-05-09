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

-- Create amenity_categories table
CREATE TABLE IF NOT EXISTS amenity_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  status status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status status NOT NULL DEFAULT 'active',
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  amenity_category_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  constraint property_amenities_amenity_category_id_fkey foreign key (amenity_category_id) references public.amenity_categories (id) on delete cascade
);

-- -- Create property_ads table
CREATE TABLE IF NOT EXISTS property_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL,
  status status NOT NULL DEFAULT 'pending',
  transaction_type transaction_type NOT NULL,
  property_type_id UUID NOT NULL,
  acquisition_purpose VARCHAR(100) NULL,
  min_budget numeric(10, 2) not null default 0.0 check (min_budget >= 0),
  max_budget numeric(10, 2) not null default 0.0 check (max_budget >= 0),
  min_area numeric(10, 2) default 0,
  max_area numeric(10, 2) default 0,
  bedrooms INTEGER default 0,
  bathrooms INTEGER default 0,
  parking_spaces INTEGER default 0,
  neighborhood VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  uf VARCHAR(255) NULL,
  mandatory_amenities jsonb NULL,
  desired_amenities jsonb NULL,
  observations TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  constraint property_ads_lead_id_fkey foreign key (lead_id) references public.users (id) on delete cascade,
  constraint property_ads_property_type_id_fkey foreign key (property_type_id) references public.property_types (id) on delete cascade
);

-- indexes for property_types table
create index property_types_status_idx on public.property_types using btree (status);

-- indexes for property_amenities table
create index property_amenities_status_idx on public.property_amenities using btree (status);
create index property_amenities_amenity_category_id_idx on public.property_amenities using btree (amenity_category_id);

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

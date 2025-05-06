-- Schema Definition
create schema if not exists private;

-- Schema Privileges
grant usage on schema private to authenticated;
grant all on schema private to service_role;

-- Function to create a user from supabase auth.users
create or replace function private.create_user_from_auth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.users (
        id,
        email,
        phone,
        name,
        last_name,
        role,
        terms_accepted
    )
    values (
        new.id,
        new.email,
        coalesce(new.phone, ''),
        coalesce(new.raw_user_meta_data ->> 'name', ''),
        coalesce(new.raw_user_meta_data ->> 'last_name', ''),
        coalesce(new.raw_user_meta_data ->> 'role', 'lead')::public.roles,
        coalesce(new.raw_user_meta_data ->> 'terms_accepted', 'false')::boolean
    )
    on conflict (id) do nothing;
    
    return new;
end;
$$;

-- Function to update a user from supabase auth.users
create or replace function private.update_user_from_auth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    update public.users
    set
        email = new.email,
        phone = new.phone,
        name = coalesce(new.raw_user_meta_data ->> 'name', name),
        last_name = coalesce(new.raw_user_meta_data ->> 'last_name', last_name),
        role = coalesce((new.raw_user_meta_data ->> 'role')::public.roles, role),
        terms_accepted = coalesce((new.raw_user_meta_data ->> 'terms_accepted')::boolean, terms_accepted),
        updated_at = now()
    where
        id = new.id;

    return new;
end;
$$;

-- create triggers
create trigger handle_auth_user_creation
    after insert on auth.users for each row
    execute function private.create_user_from_auth();

create trigger handle_auth_user_updates
    after update on auth.users for each row
    execute function private.update_user_from_auth();

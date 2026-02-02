# ⚡ QuantumStart Setup Guide

To activate the full power of your application (Login, Referrals, Profiles), you must run the following SQL in your **Supabase Dashboard**.

## 1. Go to Supabase SQL Editor
Navigate to your Supabase Project -> SQL Editor -> "+ New Query".

## 2. Paste & Run this Script
This script sets up the `profiles` table, security rules, and the auto-trigger that creates a profile for every new user.

```sql
-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  username text,
  avatar_url text,
  role text default 'miner', -- 'miner', 'pro', 'validator'
  tier text default 'nebula', -- 'nebula', 'quasar', 'singularity'
  referral_code text unique,
  referred_by text references profiles(referral_code),
  referral_count int default 0,
  hash_power text default '10 TH/s',
  balance_btc numeric default 0.00000000,
  balance_doge numeric default 0.00000000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;

-- Create Policy: Public can view profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

-- Create Policy: Users can insert their own profile
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

-- Create Policy: Users can update own profile
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  generated_code text;
begin
  -- Generate a random referral code (e.g., QS-8X2A)
  generated_code := 'QS-' || upper(substring(md5(random()::text) from 1 for 6));
  
  insert into public.profiles (id, email, username, referral_code, avatar_url)
  values (
    new.id, 
    new.email, 
    split_part(new.email, '@', 1),
    generated_code,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 3. Verify
Once run, try logging in on your site. You should see your email and a generated Referral Code in the Dashboard!

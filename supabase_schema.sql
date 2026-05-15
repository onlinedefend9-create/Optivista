-- Supabase Schema for OptiVista Morocco

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. STORES table
create table public.stores (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROFILES table (Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  email text not null,
  full_name text,
  role text check (role in ('admin', 'staff')) default 'staff',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CUSTOMERS table
create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade not null,
  name text not null,
  phone text,
  email text,
  address text,
  last_visit timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PRESCRIPTIONS table
create table public.prescriptions (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete cascade not null,
  od_sphere text,
  od_cylinder text,
  od_axis text,
  od_addition text,
  os_sphere text,
  os_cylinder text,
  os_axis text,
  os_addition text,
  pd text,
  notes text,
  prescribed_by text,
  date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. INVENTORY table
create table public.inventory (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade not null,
  type text check (type in ('frame', 'lens', 'contact_lens', 'accessory')) not null,
  brand text not null,
  model text,
  color text,
  size text,
  price decimal(10,2) not null default 0.00,
  stock integer not null default 0,
  min_stock_alert integer not null default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ORDERS table
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete cascade not null,
  prescription_id uuid references public.prescriptions(id) on delete set null,
  frame_id uuid references public.inventory(id) on delete set null,
  lens_id uuid references public.inventory(id) on delete set null,
  status text check (status in ('pending', 'supplier', 'ready', 'delivered', 'cancelled')) default 'pending',
  total_amount decimal(10,2) not null default 0.00,
  paid_amount decimal(10,2) not null default 0.00,
  delivery_date date,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. APPOINTMENTS table
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete cascade not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  title text not null,
  status text check (status in ('scheduled', 'completed', 'cancelled', 'no_show')) default 'scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.stores enable row level security;
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.prescriptions enable row level security;
alter table public.inventory enable row level security;
alter table public.orders enable row level security;
alter table public.appointments enable row level security;

-- Policies (Multi-tenant check)
CREATE POLICY "Users can only see data from their store" ON public.profiles FOR ALL TO authenticated USING (store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "Users can only see customers from their store" ON public.customers FOR ALL TO authenticated USING (store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "Users can only see prescriptions for their store's customers" ON public.prescriptions FOR ALL TO authenticated USING (customer_id IN (SELECT id FROM public.customers WHERE store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid())));
CREATE POLICY "Users can only see inventory from their store" ON public.inventory FOR ALL TO authenticated USING (store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "Users can only see orders from their store" ON public.orders FOR ALL TO authenticated USING (store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "Users can only see appointments from their store" ON public.appointments FOR ALL TO authenticated USING (store_id = (SELECT store_id FROM public.profiles WHERE id = auth.uid()));

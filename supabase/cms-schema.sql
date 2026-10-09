begin;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- PUBLIC NOTICES
-- =========================================================

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),

  title text not null
    check (char_length(trim(title)) between 3 and 180),

  category text not null
    check (char_length(trim(category)) between 2 and 80),

  summary text not null
    check (char_length(trim(summary)) between 3 and 500),

  body text not null
    check (char_length(trim(body)) >= 3),

  status text not null default 'draft'
    check (status in ('draft', 'published', 'inactive')),

  published_at timestamptz,
  closing_at timestamptz,

  keywords text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists notices_set_updated_at
on public.notices;

create trigger notices_set_updated_at
before update on public.notices
for each row
execute function public.set_updated_at();

alter table public.notices enable row level security;

drop policy if exists "Rawal public can read published notices"
on public.notices;

create policy "Rawal public can read published notices"
on public.notices
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Rawal admin can read all notices"
on public.notices;

create policy "Rawal admin can read all notices"
on public.notices
for select
to authenticated
using (auth.uid() is not null);

drop policy if exists "Rawal admin can create notices"
on public.notices;

create policy "Rawal admin can create notices"
on public.notices
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can update notices"
on public.notices;

create policy "Rawal admin can update notices"
on public.notices
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can delete notices"
on public.notices;

create policy "Rawal admin can delete notices"
on public.notices
for delete
to authenticated
using (auth.uid() is not null);


-- =========================================================
-- DOCUMENTS
-- =========================================================

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),

  title text not null
    check (char_length(trim(title)) between 3 and 180),

  description text not null
    check (char_length(trim(description)) between 3 and 600),

  category text not null
    check (char_length(trim(category)) between 2 and 80),

  document_type text not null default 'PDF'
    check (char_length(trim(document_type)) between 2 and 30),

  file_name text not null,
  file_url text not null,
  storage_path text,

  file_size_bytes bigint
    check (file_size_bytes is null or file_size_bytes >= 0),

  status text not null default 'draft'
    check (status in ('draft', 'published', 'inactive')),

  published_at timestamptz,

  keywords text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists documents_set_updated_at
on public.documents;

create trigger documents_set_updated_at
before update on public.documents
for each row
execute function public.set_updated_at();

alter table public.documents enable row level security;

drop policy if exists "Rawal public can read published documents"
on public.documents;

create policy "Rawal public can read published documents"
on public.documents
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Rawal admin can read all documents"
on public.documents;

create policy "Rawal admin can read all documents"
on public.documents
for select
to authenticated
using (auth.uid() is not null);

drop policy if exists "Rawal admin can create documents"
on public.documents;

create policy "Rawal admin can create documents"
on public.documents
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can update documents"
on public.documents;

create policy "Rawal admin can update documents"
on public.documents
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can delete documents"
on public.documents;

create policy "Rawal admin can delete documents"
on public.documents
for delete
to authenticated
using (auth.uid() is not null);


-- =========================================================
-- CITY UPDATES
-- =========================================================

create table if not exists public.city_updates (
  id uuid primary key default gen_random_uuid(),

  title text not null
    check (char_length(trim(title)) between 3 and 180),

  category text not null
    check (char_length(trim(category)) between 2 and 80),

  summary text not null
    check (char_length(trim(summary)) between 3 and 500),

  status text not null default 'draft'
    check (status in ('draft', 'published', 'inactive')),

  published_at timestamptz,

  keywords text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists city_updates_set_updated_at
on public.city_updates;

create trigger city_updates_set_updated_at
before update on public.city_updates
for each row
execute function public.set_updated_at();

alter table public.city_updates enable row level security;

drop policy if exists "Rawal public can read published city updates"
on public.city_updates;

create policy "Rawal public can read published city updates"
on public.city_updates
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Rawal admin can read all city updates"
on public.city_updates;

create policy "Rawal admin can read all city updates"
on public.city_updates
for select
to authenticated
using (auth.uid() is not null);

drop policy if exists "Rawal admin can create city updates"
on public.city_updates;

create policy "Rawal admin can create city updates"
on public.city_updates
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can update city updates"
on public.city_updates;

create policy "Rawal admin can update city updates"
on public.city_updates
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can delete city updates"
on public.city_updates;

create policy "Rawal admin can delete city updates"
on public.city_updates
for delete
to authenticated
using (auth.uid() is not null);


-- =========================================================
-- COMMUNITY EVENTS
-- =========================================================

create table if not exists public.community_events (
  id uuid primary key default gen_random_uuid(),

  title text not null
    check (char_length(trim(title)) between 3 and 180),

  summary text not null
    check (char_length(trim(summary)) between 3 and 500),

  location text,

  starts_at timestamptz not null,
  ends_at timestamptz,

  status text not null default 'draft'
    check (status in ('draft', 'published', 'inactive')),

  published_at timestamptz,

  keywords text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint community_events_end_after_start
    check (ends_at is null or ends_at >= starts_at)
);

drop trigger if exists community_events_set_updated_at
on public.community_events;

create trigger community_events_set_updated_at
before update on public.community_events
for each row
execute function public.set_updated_at();

alter table public.community_events enable row level security;

drop policy if exists "Rawal public can read published community events"
on public.community_events;

create policy "Rawal public can read published community events"
on public.community_events
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Rawal admin can read all community events"
on public.community_events;

create policy "Rawal admin can read all community events"
on public.community_events
for select
to authenticated
using (auth.uid() is not null);

drop policy if exists "Rawal admin can create community events"
on public.community_events;

create policy "Rawal admin can create community events"
on public.community_events
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can update community events"
on public.community_events;

create policy "Rawal admin can update community events"
on public.community_events
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);

drop policy if exists "Rawal admin can delete community events"
on public.community_events;

create policy "Rawal admin can delete community events"
on public.community_events
for delete
to authenticated
using (auth.uid() is not null);


-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists notices_status_idx
on public.notices (status, published_at desc);

create index if not exists documents_status_idx
on public.documents (status, published_at desc);

create index if not exists city_updates_status_idx
on public.city_updates (status, published_at desc);

create index if not exists community_events_status_idx
on public.community_events (status, starts_at);


-- =========================================================
-- DOCUMENT STORAGE
-- =========================================================

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'rawal-documents',
  'rawal-documents',
  true,
  10485760,
  array['application/pdf']
)
on conflict (id)
do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;


drop policy if exists "Rawal admin can select document objects"
on storage.objects;

create policy "Rawal admin can select document objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'rawal-documents'
  and auth.uid() is not null
);


drop policy if exists "Rawal admin can upload document objects"
on storage.objects;

create policy "Rawal admin can upload document objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'rawal-documents'
  and auth.uid() is not null
);


drop policy if exists "Rawal admin can update document objects"
on storage.objects;

create policy "Rawal admin can update document objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'rawal-documents'
  and auth.uid() is not null
)
with check (
  bucket_id = 'rawal-documents'
  and auth.uid() is not null
);


drop policy if exists "Rawal admin can delete document objects"
on storage.objects;

create policy "Rawal admin can delete document objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'rawal-documents'
  and auth.uid() is not null
);

commit;

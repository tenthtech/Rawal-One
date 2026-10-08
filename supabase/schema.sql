begin;

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  severity text not null
    constraint alerts_severity_check
    check (severity in ('advisory', 'warning', 'emergency')),
  title text not null
    constraint alerts_title_check
    check (char_length(btrim(title)) between 1 and 120),
  message text not null
    constraint alerts_message_check
    check (char_length(btrim(message)) between 1 and 600),
  affected_area text not null
    constraint alerts_affected_area_check
    check (char_length(btrim(affected_area)) between 1 and 120),
  status text not null default 'draft'
    constraint alerts_status_check
    check (status in ('draft', 'published', 'inactive')),
  more_info_url text
    constraint alerts_more_info_url_check
    check (
      more_info_url is null
      or (
        char_length(more_info_url) between 1 and 300
        and left(more_info_url, 1) = '/'
        and left(more_info_url, 2) <> '//'
        and more_info_url <> '/admin'
        and more_info_url not like '/admin/%'
        and more_info_url !~ '[[:cntrl:]]'
      )
    ),
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint alerts_published_at_check
    check (status <> 'published' or published_at is not null)
);

alter table public.alerts enable row level security;

revoke all on table public.alerts from anon, authenticated;
grant select on table public.alerts to anon;
grant select, insert, update on table public.alerts to authenticated;

drop policy if exists "Public can read active published alerts" on public.alerts;
create policy "Public can read active published alerts"
on public.alerts
for select
to anon
using (
  status = 'published'
  and published_at is not null
  and (expires_at is null or expires_at > now())
);

drop policy if exists "Authenticated users can read alerts" on public.alerts;
create policy "Authenticated users can read alerts"
on public.alerts
for select
to authenticated
using (coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false);

drop policy if exists "Authenticated users can create alerts" on public.alerts;
create policy "Authenticated users can create alerts"
on public.alerts
for insert
to authenticated
with check (coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false);

drop policy if exists "Authenticated users can update alerts" on public.alerts;
create policy "Authenticated users can update alerts"
on public.alerts
for update
to authenticated
using (coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false)
with check (coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false);

commit;

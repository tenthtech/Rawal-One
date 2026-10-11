begin;

-- This seed mirrors the repository-backed public content. Fixed UUIDs and
-- conflict ignores make repeated execution safe without overwriting later edits.

-- =========================================================
-- PUBLIC NOTICES
-- =========================================================

insert into public.notices (
  id,
  title,
  category,
  summary,
  body,
  status,
  published_at,
  closing_at,
  keywords,
  created_at,
  updated_at
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'Development application consultation',
    'Planning & development',
    'Residents can review information related to a demonstration development application and consultation period.',
    E'This demonstration notice outlines an illustrative proposal for common building and development work. It does not relate to a real property or planning decision.\n\nThe notice summarises the example consultation period and the general information a resident might expect to review through a municipal website.',
    'published',
    '2026-10-05 00:00:00+00',
    '2026-10-30 23:59:59.999+05',
    array[
      'development',
      'application',
      'permit',
      'planning',
      'consultation',
      'building'
    ]::text[],
    '2026-10-05 00:00:00+00',
    '2026-10-05 00:00:00+00'
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'Temporary traffic management notice',
    'Roads & transport',
    'Temporary traffic changes will apply during scheduled demonstration maintenance activity.',
    E'This notice demonstrates how temporary traffic information could be presented while routine road maintenance is under way.\n\nResidents should use the current road-services information for available guidance about closures, diversions and street conditions in this demonstration.',
    'published',
    '2026-10-07 00:00:00+00',
    null,
    array[
      'road',
      'traffic',
      'transport',
      'maintenance',
      'temporary closure',
      'diversion'
    ]::text[],
    '2026-10-07 00:00:00+00',
    '2026-10-07 00:00:00+00'
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'Community facility operating-hours update',
    'Community services',
    'Updated demonstration operating hours apply to selected community facilities.',
    E'Selected demonstration facilities use an updated weekday timetable for general enquiries and community bookings.\n\nThis example shows how residents could find a concise operating-hours update alongside related facility information.',
    'published',
    '2026-10-06 00:00:00+00',
    null,
    array[
      'community facility',
      'operating hours',
      'opening times',
      'recreation',
      'booking',
      'community services'
    ]::text[],
    '2026-10-06 00:00:00+00',
    '2026-10-06 00:00:00+00'
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'Waste collection schedule consultation',
    'Waste & recycling',
    'Residents can review a proposed demonstration change to collection scheduling.',
    E'This demonstration notice presents an illustrative change to the timing of selected household collection routes.\n\nIt shows the type of schedule information and closing date that a municipal consultation notice could make easy to find.',
    'published',
    '2026-09-28 00:00:00+00',
    '2026-10-23 23:59:59.999+05',
    array[
      'waste',
      'garbage',
      'trash',
      'recycling',
      'collection schedule',
      'consultation',
      'feedback'
    ]::text[],
    '2026-09-28 00:00:00+00',
    '2026-09-28 00:00:00+00'
  )
on conflict (id) do nothing;


-- =========================================================
-- DOCUMENTS
-- =========================================================

insert into public.documents (
  id,
  title,
  description,
  category,
  document_type,
  file_name,
  file_url,
  storage_path,
  file_size_bytes,
  status,
  published_at,
  keywords,
  created_at,
  updated_at
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'Waste collection guide 2026',
    'Household collection, disposal and recycling guidance.',
    'waste-recycling',
    'PDF',
    'waste-collection-guide-2026.pdf',
    '/documents/waste-collection-guide-2026.pdf',
    null,
    null,
    'published',
    '2026-09-01 00:00:00+00',
    array[
      'waste',
      'garbage',
      'trash',
      'recycling',
      'collection schedule',
      'household bins',
      'disposal'
    ]::text[],
    '2026-09-01 00:00:00+00',
    '2026-09-01 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'Building permit application form',
    'Application form for common building and development work.',
    'permits-development',
    'PDF',
    'building-permit-application-form.pdf',
    '/documents/building-permit-application-form.pdf',
    null,
    null,
    'published',
    '2026-08-12 00:00:00+00',
    array[
      'building permit',
      'application',
      'development',
      'construction',
      'planning',
      'renovation',
      'form'
    ]::text[],
    '2026-08-12 00:00:00+00',
    '2026-08-12 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    'Water connection request form',
    'Form for requesting a new municipal water or sewer connection.',
    'water-sewer',
    'PDF',
    'water-connection-request-form.pdf',
    '/documents/water-connection-request-form.pdf',
    null,
    null,
    'published',
    '2026-08-20 00:00:00+00',
    array[
      'water',
      'sewer',
      'connection',
      'supply',
      'application',
      'request',
      'form'
    ]::text[],
    '2026-08-20 00:00:00+00',
    '2026-08-20 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    'Community facility booking form',
    'Request form for selected community facilities and spaces.',
    'parks-recreation',
    'PDF',
    'community-facility-booking-form.pdf',
    '/documents/community-facility-booking-form.pdf',
    null,
    null,
    'published',
    '2026-09-03 00:00:00+00',
    array[
      'community facility',
      'booking',
      'park',
      'recreation',
      'hall',
      'space',
      'form'
    ]::text[],
    '2026-09-03 00:00:00+00',
    '2026-09-03 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000005',
    'Road excavation permit guidance',
    'Guidance for road excavation and related permissions.',
    'roads-streets',
    'PDF',
    'road-excavation-permit-guidance.pdf',
    '/documents/road-excavation-permit-guidance.pdf',
    null,
    null,
    'published',
    '2026-07-14 00:00:00+00',
    array[
      'road',
      'street',
      'excavation',
      'permit',
      'permission',
      'works',
      'guidance'
    ]::text[],
    '2026-07-14 00:00:00+00',
    '2026-07-14 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000006',
    'Public information request form',
    'General demonstration form for requesting municipal information.',
    'community-services',
    'PDF',
    'public-information-request-form.pdf',
    '/documents/public-information-request-form.pdf',
    null,
    null,
    'published',
    '2026-08-18 00:00:00+00',
    array[
      'public information',
      'records',
      'resident request',
      'community',
      'information access',
      'form'
    ]::text[],
    '2026-08-18 00:00:00+00',
    '2026-08-18 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000007',
    'Accessibility statement',
    'Rawal One accessibility approach and resident support information.',
    'corporate-information',
    'PDF',
    'accessibility-statement.pdf',
    '/documents/accessibility-statement.pdf',
    null,
    null,
    'published',
    '2026-06-30 00:00:00+00',
    array[
      'accessibility',
      'accessible',
      'disability',
      'support',
      'inclusive',
      'statement'
    ]::text[],
    '2026-06-30 00:00:00+00',
    '2026-06-30 00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000008',
    'Emergency preparedness guide',
    'General preparedness information for households and communities.',
    'public-safety',
    'PDF',
    'emergency-preparedness-guide.pdf',
    '/documents/emergency-preparedness-guide.pdf',
    null,
    null,
    'published',
    '2026-08-25 00:00:00+00',
    array[
      'emergency',
      'preparedness',
      'safety',
      'household plan',
      'community',
      'supplies',
      'guide'
    ]::text[],
    '2026-08-25 00:00:00+00',
    '2026-08-25 00:00:00+00'
  )
on conflict (id) do nothing;


-- =========================================================
-- CITY UPDATES
-- =========================================================

insert into public.city_updates (
  id,
  title,
  category,
  summary,
  status,
  published_at,
  keywords,
  created_at,
  updated_at
)
values
  (
    '30000000-0000-4000-8000-000000000001',
    'Road maintenance planned near Sixth Road',
    'Service update',
    'Crews will carry out scheduled road maintenance in the area. Drivers should allow extra travel time.',
    'published',
    '2026-10-08 00:00:00+00',
    '{}'::text[],
    '2026-10-08 00:00:00+00',
    '2026-10-08 00:00:00+00'
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    'Recreation programme registration opens Monday',
    'Community',
    'Registration will open for the next round of community recreation programmes.',
    'published',
    '2026-10-12 00:00:00+00',
    '{}'::text[],
    '2026-10-12 00:00:00+00',
    '2026-10-12 00:00:00+00'
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    'Development application consultation',
    'Public notice',
    'Residents can review information related to a demonstration development application and consultation period.',
    'published',
    '2026-10-05 00:00:00+00',
    '{}'::text[],
    '2026-10-05 00:00:00+00',
    '2026-10-05 00:00:00+00'
  )
on conflict (id) do nothing;


-- =========================================================
-- COMMUNITY EVENTS
-- =========================================================

insert into public.community_events (
  id,
  title,
  summary,
  location,
  starts_at,
  ends_at,
  status,
  published_at,
  keywords
)
values
  (
    '40000000-0000-4000-8000-000000000001',
    'Community clean-up morning',
    'Neighbourhood volunteers can join a morning clean-up activity and waste-awareness session.',
    null,
    '2026-10-17 00:00:00+00',
    null,
    'published',
    null,
    '{}'::text[]
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    'Family recreation evening',
    'An evening of family activities and community recreation programming.',
    null,
    '2026-10-24 00:00:00+00',
    null,
    'published',
    null,
    '{}'::text[]
  )
on conflict (id) do nothing;

commit;

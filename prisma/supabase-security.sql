-- Enable RLS on Supabase-exposed tables and block direct PostgREST access
-- while allowing Prisma to keep using the database connection normally.

alter table public."User" enable row level security;
alter table public."Session" enable row level security;
alter table public."Booking" enable row level security;
alter table public."ContactMessage" enable row level security;

revoke all on table public."User" from anon, authenticated;
revoke all on table public."Session" from anon, authenticated;
revoke all on table public."Booking" from anon, authenticated;
revoke all on table public."ContactMessage" from anon, authenticated;

comment on table public."User" is 'Private application table. Access only through server-side Prisma.';
comment on table public."Session" is 'Private application table. Access only through server-side Prisma.';
comment on table public."Booking" is 'Private application table. Access only through server-side Prisma.';
comment on table public."ContactMessage" is 'Private application table. Access only through server-side Prisma.';

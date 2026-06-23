-- Tabla de leads para el form "Notify me" de la landing.
-- Inserción exclusivamente server-side (API route con service_role); el cliente
-- nunca toca esta tabla directamente.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,                       -- de dónde vino el lead (ej. 'landing-notify')
  locale      text default 'en',          -- idioma activo al momento de registrarse
  created_at  timestamptz not null default now()
);

-- Un email solo entra una vez a la waitlist (case-insensitive).
create unique index if not exists leads_email_unique on public.leads (lower(email));

-- RLS habilitado SIN políticas: ni anon ni authenticated pueden leer/escribir.
-- Solo el service_role (usado server-side en la API route) bypassa RLS.
alter table public.leads enable row level security;

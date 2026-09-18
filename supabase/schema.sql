-- Popote — schéma de base de données Supabase (Postgres)
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────────────────

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  region text,
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  icone text
);

create table if not exists criteria (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  description text
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references cities(id) on delete cascade,
  category_id uuid not null references categories(id) on delete restrict,
  nom text not null,
  quartier text,
  adresse text,
  lat double precision,
  lng double precision,
  prix text check (prix in ('€', '€€', '€€€')),
  description text,
  image_url text,
  telephone text,
  email text,
  site_web text,
  instagram text,
  horaires text,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publie', 'archive')),
  created_at timestamptz not null default now()
);

create table if not exists address_criteria (
  address_id uuid not null references addresses(id) on delete cascade,
  criterion_id uuid not null references criteria(id) on delete cascade,
  primary key (address_id, criterion_id)
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  ville text not null,
  categorie_suggeree text,
  adresse text,
  description text,
  contact_email text,
  statut text not null default 'en_attente' check (statut in ('en_attente', 'validee', 'rejetee')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────

alter table cities enable row level security;
alter table categories enable row level security;
alter table criteria enable row level security;
alter table addresses enable row level security;
alter table address_criteria enable row level security;
alter table submissions enable row level security;

-- Lecture publique des données déjà "publiques"
create policy "Lecture publique villes actives" on cities
  for select using (actif = true);

create policy "Lecture publique catégories" on categories
  for select using (true);

create policy "Lecture publique critères" on criteria
  for select using (true);

create policy "Lecture publique adresses publiées" on addresses
  for select using (statut = 'publie');

create policy "Lecture publique liens critères" on address_criteria
  for select using (true);

-- N'importe qui peut proposer une adresse (formulaire public)
create policy "Création publique de soumissions" on submissions
  for insert with check (true);

-- Les utilisateurs connectés (admin) ont accès complet à tout
create policy "Admin accès total villes" on cities
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin accès total catégories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin accès total critères" on criteria
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin accès total adresses" on addresses
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin accès total liens critères" on address_criteria
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin accès total soumissions" on submissions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────
-- Données de départ
-- ─────────────────────────────────────────────────────────

insert into cities (slug, nom, region, actif) values
  ('lyon', 'Lyon', 'Auvergne-Rhône-Alpes', true),
  ('paris', 'Paris', 'Île-de-France', true),
  ('rouen', 'Rouen', 'Normandie', true)
on conflict (slug) do nothing;

insert into categories (slug, nom, icone) values
  ('boulangerie', 'Boulangeries', '🥖'),
  ('primeur', 'Primeurs', '🥕'),
  ('fromagerie', 'Fromageries', '🧀'),
  ('epicerie', 'Épiceries', '🛒'),
  ('restaurant', 'Restaurants', '🍽️'),
  ('cafe', 'Cafés', '☕'),
  ('marche', 'Marchés', '🧺'),
  ('vrac', 'Vrac', '♻️')
on conflict (slug) do nothing;

insert into criteria (slug, label, description) values
  ('bio', 'Bio', 'Produits certifiés issus de l''agriculture biologique.'),
  ('circuit-court', 'Circuit court', 'Peu ou pas d''intermédiaire entre le producteur et l''enseigne.'),
  ('de-saison', 'De saison', 'Produits proposés au moment de leur récolte naturelle.'),
  ('vrac', 'Vrac', 'Possibilité d''acheter sans emballage, au poids ou à la quantité voulue.'),
  ('artisan-independant', 'Artisan indépendant', 'Commerce à taille humaine, tenu par celles et ceux qui y travaillent.')
on conflict (slug) do nothing;

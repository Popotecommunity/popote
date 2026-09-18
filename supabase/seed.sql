-- Popote — données de démonstration (adresses FICTIVES)
-- À exécuter après schema.sql, dans Supabase Dashboard > SQL Editor.
-- Sert uniquement à visualiser le rendu du site avant le vrai référencement.

with c as (select id from cities where slug = 'lyon')
insert into addresses (city_id, category_id, nom, quartier, adresse, prix, description, statut)
select c.id, cat.id, v.nom, v.quartier, v.adresse, v.prix, v.description, 'publie'
from c, categories cat,
  (values
    ('boulangerie', 'Les Mains dans la Farine', 'Croix-Rousse', '12 rue des Tables Claudiennes, 69004 Lyon', '€', 'Du levain, du temps et beaucoup de cœur.'),
    ('primeur', 'Le Potager des Pentes', 'Les Pentes', '4 montée de la Grande Côte, 69001 Lyon', '€', 'Les saisons donnent le ton, les maraîchers font le reste.'),
    ('fromagerie', 'La Meule Heureuse', 'Presqu''île', '18 rue Mercière, 69002 Lyon', '€€', 'Des fromages de caractère, des conseils tout en douceur.')
  ) as v(cat_slug, nom, quartier, adresse, prix, description)
where cat.slug = v.cat_slug;

-- Rattache les critères aux adresses de démo
insert into address_criteria (address_id, criterion_id)
select a.id, cr.id
from addresses a
join criteria cr on
  (a.nom = 'Les Mains dans la Farine' and cr.slug in ('bio', 'circuit-court')) or
  (a.nom = 'Le Potager des Pentes' and cr.slug in ('de-saison', 'bio')) or
  (a.nom = 'La Meule Heureuse' and cr.slug in ('circuit-court'))
on conflict do nothing;

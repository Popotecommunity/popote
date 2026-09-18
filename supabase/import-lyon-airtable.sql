-- Popote — import des adresses Lyon depuis Airtable
-- À exécuter dans Supabase Dashboard > SQL Editor > New query
-- (après schema.sql, avant ou après seed.sql — indépendant des adresses fictives)

-- 0) Étend la table addresses avec les champs présents dans Airtable
--    (si tu as déjà exécuté schema.sql avant cette mise à jour)
alter table addresses add column if not exists telephone text;
alter table addresses add column if not exists email text;
alter table addresses add column if not exists site_web text;
alter table addresses add column if not exists instagram text;
alter table addresses add column if not exists horaires text;

-- 1) Nouvelle catégorie utilisée dans l'Airtable
insert into categories (slug, nom, icone) values
  ('producteur', 'Producteurs & vente directe', '🌾')
on conflict (slug) do nothing;

-- 2) Nouveaux critères utilisés dans l'Airtable
insert into criteria (slug, label, description) values
  ('produits-locaux', 'Produits locaux', 'Les produits vendus sont originaires de la région.'),
  ('producteurs-identifies', 'Producteurs identifiés', 'L''adresse peut nommer précisément le ou les producteurs derrière les produits vendus.'),
  ('fabrication-artisanale', 'Fabrication artisanale', 'Le produit est fabriqué sur place ou à petite échelle, à la main.')
on conflict (slug) do nothing;

-- 3) Les 14 adresses (toutes à Lyon)
with c as (select id from cities where slug = 'lyon')
insert into addresses (
  city_id, category_id, nom, quartier, adresse, lat, lng, description,
  telephone, email, site_web, instagram, horaires, statut
)
select c.id, cat.id, v.nom, v.quartier, v.adresse, v.lat, v.lng, v.description,
  v.telephone, v.email, v.site_web, v.instagram, v.horaires, v.statut
from c, categories cat,
  (values
    ('epicerie', 'Meloco', 'Croix-Rousse', '6 rue Duviard, 69004 Lyon', 45.774750, 4.828137,
      'Épicerie-cantine paysanne proposant une alimentation bio, locale et de saison, avec une cuisine sur place.',
      '09 87 18 07 72', 'contact@epiceriemeloco.fr', 'https://epiceriemeloco.fr/', 'https://www.instagram.com/epicerie.meloco/',
      'Lundi 16h–19h30 ; mardi à vendredi 10h–14h et 16h–19h ; samedi 9h30–14h.', 'brouillon'),

    ('boulangerie', 'Cocol Boulangerie', 'Les Chartreux', '49 rue des Chartreux, 69001 Lyon', null, null,
      'Boulangerie artisanale proposant du pain bio au levain, des viennoiseries maison, du café et une offre de snacking cuisinée.',
      null, null, null, 'https://www.instagram.com/cocol.boulangerie/',
      'Lundi à vendredi 7h–19h ; dimanche 7h30–13h30.', 'brouillon'),

    ('producteur', 'Arbralégumes – Saint-Sébastien', null, '27 montée Saint-Sébastien, 69001 Lyon', 45.770441, 4.835904,
      'Point de distribution de paniers bio, frais et issus d''une agriculture paysanne de proximité.',
      null, null, 'https://arbralegumes.fr/', null,
      'Distribution le mardi de 17h30 à 19h.', 'publie'),

    ('producteur', 'Arbralégumes – Denfert-Rochereau', null, '28 rue Denfert-Rochereau, 69004 Lyon', 45.775533, 4.824953,
      'Point de distribution de paniers bio, frais et issus d''une agriculture paysanne de proximité.',
      null, null, 'https://arbralegumes.fr/', null,
      'Distribution le mardi de 17h30 à 19h.', 'publie'),

    ('epicerie', 'De l''Autre Côté de la Rue', null, '75 cours de la Liberté, 69003 Lyon', 45.756448, 4.842999,
      'Épicerie coopérative proposant des produits paysans locaux ou biologiques en circuit court.',
      '04 72 60 88 05', null, 'https://delautrecotedelarue.net/', null,
      'Lundi 16h–20h ; mardi à samedi 10h–20h.', 'publie'),

    ('epicerie', 'Épicentre', null, '104 route de Vienne, 69008 Lyon', 45.737751, 4.852300,
      'Épicerie solidaire proposant des produits biologiques, locaux et en vrac.',
      '06 17 94 82 69', 'epicentre.lyon8@gmail.com', 'https://epicentre-lyon.org/', null,
      'Mercredi et jeudi 10h–12h30 / 15h–18h30 ; vendredi et samedi 10h–13h.', 'publie'),

    ('producteur', 'Guill''AMAP', null, '38 rue Camille-Roy, 69007 Lyon', 45.745235, 4.847976,
      'AMAP de quartier proposant des produits biologiques achetés directement auprès des producteurs.',
      null, null, 'https://guillamap.fr/', null,
      'Distribution le mercredi de 18h30 à 20h30.', 'publie'),

    ('boulangerie', 'La Miecyclette', null, '193 avenue Paul-Santy, 69008 Lyon', 45.724045, 4.883675,
      'Boulangerie lyonnaise en SCOP produisant du pain biologique au levain naturel, pétri à la main et cuit au feu de bois.',
      '09 72 31 52 08', 'contact@lamiecyclette.fr', 'https://lamiecyclette.fr/', 'https://www.instagram.com/la_miecyclette/',
      null, 'publie'),

    ('epicerie', 'La P''tite Distrib', null, '19 boulevard Yves-Farge, 69007 Lyon', 45.743435, 4.834650,
      'Épicerie de quartier privilégiant les produits biologiques, locaux et la réduction des déchets.',
      null, 'contact@laptitedistrib.fr', 'https://laptitedistrib.fr/', null,
      'Lundi 10h–19h30 ; mardi à samedi 9h–19h30 (pause le jeudi de 14h à 15h).', 'publie'),

    ('fromagerie', 'Laiterie de Lyon', null, '13 rue Montebello, 69003 Lyon', 45.756061, 4.842252,
      'Laiterie urbaine fabriquant à Lyon des fromages, des yaourts biologiques et de la mozzarella.',
      '04 78 79 78 80', 'laiteriedelyon@gmail.com', 'https://laiteriedelyon.fr/', null,
      'Mardi à vendredi 10h–13h / 16h–19h ; samedi 10h–13h / 15h–19h.', 'publie'),

    ('epicerie', 'Rue des Producteurs – Girondins', null, '63 rue des Girondins, 69007 Lyon', 45.738064, 4.835396,
      'Épicerie indépendante en circuit court travaillant exclusivement avec de petits producteurs locaux.',
      '04 72 94 45 77', 'contact@ruedesproducteurs.fr', 'https://ruedesproducteurs.fr/', null,
      null, 'publie'),

    ('epicerie', 'Rue des Producteurs – Berthelot', null, '33 avenue Berthelot, 69007 Lyon', 45.746609, 4.837935,
      'Épicerie indépendante en circuit court travaillant exclusivement avec de petits producteurs locaux.',
      '04 37 70 84 41', 'contact@ruedesproducteurs.fr', 'https://ruedesproducteurs.fr/', null,
      null, 'publie'),

    ('epicerie', 'Rue des Producteurs – Gambetta', null, '108 cours Gambetta, 69007 Lyon', 45.751271, 4.854280,
      'Épicerie indépendante en circuit court travaillant exclusivement avec de petits producteurs locaux.',
      '09 86 58 53 11', 'contact@ruedesproducteurs.fr', 'https://ruedesproducteurs.fr/', null,
      null, 'publie'),

    ('epicerie', 'Scarole et Marcellin', null, '98 rue Béchevelin, 69007 Lyon', 45.747527, 4.838020,
      'Épicerie-cuisine valorisant les produits frais d''environ 80 producteurs locaux.',
      '04 26 00 04 97', 'scarole.marcellin@gmail.com', 'https://scarole-et-marcellin.fr/', null,
      'Lundi 10h30–14h / 15h30–19h ; mardi à vendredi 9h30–14h / 15h30–19h.', 'publie')

  ) as v(cat_slug, nom, quartier, adresse, lat, lng, description, telephone, email, site_web, instagram, horaires, statut)
where cat.slug = v.cat_slug;

-- 4) Rattache les critères à chaque adresse
insert into address_criteria (address_id, criterion_id)
select a.id, cr.id
from addresses a
join criteria cr on
  (a.nom = 'Meloco' and cr.slug in ('circuit-court','produits-locaux','de-saison','bio','producteurs-identifies','artisan-independant')) or
  (a.nom = 'Cocol Boulangerie' and cr.slug in ('bio','fabrication-artisanale','artisan-independant')) or
  (a.nom = 'Arbralégumes – Saint-Sébastien' and cr.slug in ('circuit-court','produits-locaux','de-saison','bio','producteurs-identifies')) or
  (a.nom = 'Arbralégumes – Denfert-Rochereau' and cr.slug in ('circuit-court','produits-locaux','de-saison','bio','producteurs-identifies')) or
  (a.nom = 'De l''Autre Côté de la Rue' and cr.slug in ('circuit-court','produits-locaux','de-saison','bio','producteurs-identifies','artisan-independant')) or
  (a.nom = 'Épicentre' and cr.slug in ('produits-locaux','bio','artisan-independant')) or
  (a.nom = 'Guill''AMAP' and cr.slug in ('circuit-court','produits-locaux','de-saison','bio','producteurs-identifies')) or
  (a.nom = 'La Miecyclette' and cr.slug in ('bio','fabrication-artisanale','artisan-independant')) or
  (a.nom = 'La P''tite Distrib' and cr.slug in ('produits-locaux','bio','artisan-independant')) or
  (a.nom = 'Laiterie de Lyon' and cr.slug in ('produits-locaux','bio','fabrication-artisanale','artisan-independant')) or
  (a.nom = 'Rue des Producteurs – Girondins' and cr.slug in ('circuit-court','produits-locaux','de-saison','producteurs-identifies','artisan-independant')) or
  (a.nom = 'Rue des Producteurs – Berthelot' and cr.slug in ('circuit-court','produits-locaux','de-saison','producteurs-identifies','artisan-independant')) or
  (a.nom = 'Rue des Producteurs – Gambetta' and cr.slug in ('circuit-court','produits-locaux','de-saison','producteurs-identifies','artisan-independant')) or
  (a.nom = 'Scarole et Marcellin' and cr.slug in ('circuit-court','produits-locaux','de-saison','producteurs-identifies','artisan-independant'))
on conflict do nothing;

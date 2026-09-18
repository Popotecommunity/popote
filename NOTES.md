# Popote — notes de projet

## Concept
Annuaire, ville par ville, des bonnes adresses pour une alimentation locale,
de saison et en circuit court (épiceries, primeurs, fromageries, marchés,
artisans, restaurants...).

## Design de référence
Repris depuis https://popote-community.netlify.app/ (généré par IA, sans repo
accessible) : palette crème / vert olive / terracotta, typo serif pour les
titres, badges "Bio / Circuit court / De saison", pages Explorer / La carte /
Nos critères / Le journal.

## Stack choisie
- Next.js (App Router, TypeScript) — front public + back office admin
- Supabase — Postgres (villes, adresses, catégories, critères, soumissions),
  Auth (connexion admin), Storage (photos des adresses)
- Déploiement cible : Netlify (comme le site actuel)

## Modèle de données (v1)
- `cities` (id, slug, nom, région, statut actif)
- `categories` (id, slug, nom, icône) — boulangerie, primeur, fromagerie...
- `criteria` (id, slug, label, description) — bio, circuit court, de saison, vrac
- `addresses` (id, city_id, nom, catégorie_id, adresse, quartier, lat/lng,
  prix €/€€/€€€, description, statut: brouillon/publié/archivé)
- `address_criteria` (address_id, criterion_id) — table de jointure
- `submissions` (soumissions du formulaire "Partager une bonne adresse",
  statut: en attente/validée/rejetée) — alimente `addresses` après modération

## Back office (/admin)
- Connexion (Supabase Auth, email/mot de passe)
- CRUD villes, catégories, critères
- CRUD adresses (avec critères à cocher, statut publié/brouillon)
- File de modération des soumissions communautaires

## À faire ensuite
- Cahier des charges précis des critères (ex: huile d'olive → pas "circuit
  court" partout en France) — à formaliser avec l'utilisateur
- Vraies adresses (les actuelles sont fictives)
- Charte graphique définitive

# Popote

Le carnet des bonnes adresses pour manger local, de saison et en circuit
court — ville par ville.

Stack : **Next.js** (App Router, TypeScript, Tailwind CSS v4) + **Supabase**
(base de données Postgres, authentification, back office).

## 1. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com), crée un compte et un nouveau projet (gratuit).
2. Dans **Project Settings → API**, récupère :
   - `Project URL`
   - `anon public` key
3. Copie `.env.local.example` en `.env.local` et colle ces deux valeurs :

```bash
cp .env.local.example .env.local
```

## 2. Créer les tables

Dans le Dashboard Supabase → **SQL Editor → New query**, exécute dans l'ordre :

1. Le contenu de [`supabase/schema.sql`](supabase/schema.sql) — crée les tables,
   les règles de sécurité (RLS) et quelques villes/catégories/critères de départ.
2. (Optionnel) Le contenu de [`supabase/seed.sql`](supabase/seed.sql) — ajoute
   3 adresses **fictives** à Lyon pour voir le rendu du site.

## 3. Créer ton compte admin (back office)

Dans le Dashboard Supabase → **Authentication → Users → Add user**, crée un
utilisateur avec ton email et un mot de passe. C'est ce compte qui te connecte
sur `/admin`.

## 4. Lancer le site en local

```bash
npm install
npm run dev
```

- Site public : http://localhost:3000
- Back office : http://localhost:3000/admin (connexion avec le compte créé à l'étape 3)

## Structure

- `src/app/` — pages publiques (accueil, `/explorer/[ville]`, `/criteres`, `/journal`, `/proposer`)
- `src/app/admin/` — back office protégé (villes, catégories, critères, adresses, soumissions)
- `src/lib/data.ts` — requêtes publiques (lecture des adresses publiées, etc.)
- `src/lib/supabase/` — clients Supabase (navigateur, serveur, middleware)
- `supabase/schema.sql` — schéma de base de données à exécuter dans Supabase
- `supabase/seed.sql` — données de démonstration (fictives)

## Back office — ce qu'on peut gérer

- **Villes** : ajouter/modifier/activer une ville (elle apparaît alors dans le sélecteur et sur `/explorer/[ville]`)
- **Catégories** : les types de commerces (boulangerie, primeur…)
- **Critères** : les badges affichés sur les fiches (bio, circuit court…)
- **Adresses** : créer/modifier/publier une fiche, cocher ses critères, choisir son statut (brouillon / publié / archivé)
- **Soumissions** : les propositions envoyées via le formulaire public `/proposer` — à valider ou rejeter avant de créer la fiche correspondante dans Adresses

## Déploiement (Netlify)

1. Pousse ce projet sur GitHub.
2. Sur [netlify.com](https://netlify.com), "Add new site → Import an existing project", connecte le repo.
3. Netlify détecte Next.js automatiquement.
4. Dans **Site settings → Environment variables**, ajoute `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Déploie.

## À faire ensuite

- Formaliser le cahier des charges des critères (voir `/criteres`) — notamment
  pour les produits qui ne peuvent pas être locaux partout (ex. huile d'olive).
- Remplacer les adresses fictives par de vraies adresses.
- Affiner la charte graphique.
- Éventuellement : upload d'images (Supabase Storage) plutôt qu'une URL manuelle, vraie carte interactive (Mapbox/Leaflet).

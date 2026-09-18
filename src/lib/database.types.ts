export type AddressStatus = "brouillon" | "publie" | "archive";
export type SubmissionStatus = "en_attente" | "validee" | "rejetee";
export type PriceLevel = "€" | "€€" | "€€€";

export interface City {
  id: string;
  slug: string;
  nom: string;
  region: string | null;
  actif: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  nom: string;
  icone: string | null;
}

export interface Criterion {
  id: string;
  slug: string;
  label: string;
  description: string | null;
}

export interface Address {
  id: string;
  city_id: string;
  category_id: string;
  nom: string;
  quartier: string | null;
  adresse: string | null;
  lat: number | null;
  lng: number | null;
  prix: PriceLevel | null;
  description: string | null;
  image_url: string | null;
  telephone: string | null;
  email: string | null;
  site_web: string | null;
  instagram: string | null;
  horaires: string | null;
  statut: AddressStatus;
  created_at: string;
  // Joined fields (populated by queries, not columns)
  city?: City;
  category?: Category;
  criteria?: Criterion[];
}

export interface Submission {
  id: string;
  nom: string;
  ville: string;
  categorie_suggeree: string | null;
  adresse: string | null;
  description: string | null;
  contact_email: string | null;
  statut: SubmissionStatus;
  created_at: string;
}

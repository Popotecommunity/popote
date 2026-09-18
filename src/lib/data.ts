import { createClient } from "@/lib/supabase/server";
import type { Address, City, Category, Criterion, Submission } from "@/lib/database.types";

export async function getCities(): Promise<City[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("actif", true)
    .order("nom");
  if (error) throw error;
  return data as City[];
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .eq("actif", true)
    .maybeSingle();
  if (error) throw error;
  return data as City | null;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").order("nom");
  if (error) throw error;
  return data as Category[];
}

export async function getCriteria(): Promise<Criterion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("criteria").select("*").order("label");
  if (error) throw error;
  return data as Criterion[];
}

export async function getPublishedAddressesByCity(
  citySlug: string,
): Promise<Address[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addresses")
    .select(
      "*, city:cities!inner(*), category:categories(*), criteria:address_criteria(criterion:criteria(*))",
    )
    .eq("statut", "publie")
    .eq("city.slug", citySlug)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    criteria: (row.criteria as Array<{ criterion: Criterion }>).map(
      (link) => link.criterion,
    ),
  })) as Address[];
}

export async function getFeaturedAddresses(limit = 3): Promise<Address[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addresses")
    .select(
      "*, city:cities(*), category:categories(*), criteria:address_criteria(criterion:criteria(*))",
    )
    .eq("statut", "publie")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;

  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    criteria: (row.criteria as Array<{ criterion: Criterion }>).map(
      (link) => link.criterion,
    ),
  })) as Address[];
}

export async function createSubmission(input: {
  nom: string;
  ville: string;
  categorie_suggeree?: string;
  adresse?: string;
  description?: string;
  contact_email?: string;
}): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert(input);
  if (error) throw error;
}

export type { Address, City, Category, Criterion, Submission };

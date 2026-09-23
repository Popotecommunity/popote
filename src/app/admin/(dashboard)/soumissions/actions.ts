"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function slugify(value: string) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function findOrCreateCity(
  supabase: Awaited<ReturnType<typeof createClient>>,
  nomVille: string,
) {
  const { data: cities } = await supabase.from("cities").select("id, nom");
  const match = (cities ?? []).find((c) => normalize(c.nom) === normalize(nomVille));
  if (match) return match.id;

  const { data: created, error } = await supabase
    .from("cities")
    .insert({ nom: nomVille.trim(), slug: slugify(nomVille), actif: true })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return created.id;
}

async function findCategoryId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  categorieSuggeree: string | null,
) {
  const { data: categories } = await supabase.from("categories").select("id, nom, slug");
  const list = categories ?? [];

  if (categorieSuggeree) {
    const needle = normalize(categorieSuggeree);
    const match = list.find(
      (c) => needle.includes(normalize(c.nom)) || normalize(c.nom).includes(needle),
    );
    if (match) return match.id;
  }

  const fallback = list.find((c) => c.slug === "epicerie") ?? list[0];
  if (!fallback) throw new Error("Aucune catégorie disponible pour créer l'adresse.");
  return fallback.id;
}

export async function markSubmission(id: string, statut: "validee" | "rejetee") {
  const supabase = await createClient();

  if (statut === "validee") {
    const { data: submission, error: fetchError } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);

    const cityId = await findOrCreateCity(supabase, submission.ville);

    const { data: existing } = await supabase
      .from("addresses")
      .select("id")
      .eq("city_id", cityId)
      .ilike("nom", submission.nom)
      .maybeSingle();

    if (!existing) {
      const categoryId = await findCategoryId(supabase, submission.categorie_suggeree);
      const { error: insertError } = await supabase.from("addresses").insert({
        city_id: cityId,
        category_id: categoryId,
        nom: submission.nom,
        adresse: submission.adresse,
        description: submission.description,
        statut: "publie",
      });
      if (insertError) throw new Error(insertError.message);
    }
  }

  const { error } = await supabase.from("submissions").update({ statut }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/soumissions");
  revalidatePath("/admin/adresses");
  revalidatePath("/admin/villes");
}

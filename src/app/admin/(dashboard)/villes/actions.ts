"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCity(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim() || null;
  if (!nom) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("cities")
    .insert({ nom, region, slug: slugify(nom), actif: true });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/villes");
}

export async function updateCity(id: string, formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim() || null;
  const actif = formData.get("actif") === "on";
  if (!nom) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("cities")
    .update({ nom, region, slug: slugify(nom), actif })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/villes");
  redirect("/admin/villes");
}

export async function deleteCity(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/villes");
}

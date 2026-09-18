"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readAddressFields(formData: FormData) {
  return {
    nom: String(formData.get("nom") ?? "").trim(),
    city_id: String(formData.get("city_id") ?? ""),
    category_id: String(formData.get("category_id") ?? ""),
    quartier: String(formData.get("quartier") ?? "").trim() || null,
    adresse: String(formData.get("adresse") ?? "").trim() || null,
    prix: String(formData.get("prix") ?? "") || null,
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    telephone: String(formData.get("telephone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    site_web: String(formData.get("site_web") ?? "").trim() || null,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    horaires: String(formData.get("horaires") ?? "").trim() || null,
    statut: String(formData.get("statut") ?? "brouillon"),
  };
}

function readCriteriaIds(formData: FormData) {
  return formData.getAll("criteria_ids").map((v) => String(v));
}

export async function createAddress(formData: FormData) {
  const fields = readAddressFields(formData);
  if (!fields.nom || !fields.city_id || !fields.category_id) return;

  const supabase = await createClient();
  const { data, error } = await supabase.from("addresses").insert(fields).select("id").single();
  if (error) throw new Error(error.message);

  const criteriaIds = readCriteriaIds(formData);
  if (criteriaIds.length > 0) {
    const { error: linkError } = await supabase
      .from("address_criteria")
      .insert(criteriaIds.map((criterion_id) => ({ address_id: data.id, criterion_id })));
    if (linkError) throw new Error(linkError.message);
  }

  revalidatePath("/admin/adresses");
  redirect("/admin/adresses");
}

export async function updateAddress(id: string, formData: FormData) {
  const fields = readAddressFields(formData);
  if (!fields.nom || !fields.city_id || !fields.category_id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("addresses").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  const { error: clearError } = await supabase
    .from("address_criteria")
    .delete()
    .eq("address_id", id);
  if (clearError) throw new Error(clearError.message);

  const criteriaIds = readCriteriaIds(formData);
  if (criteriaIds.length > 0) {
    const { error: linkError } = await supabase
      .from("address_criteria")
      .insert(criteriaIds.map((criterion_id) => ({ address_id: id, criterion_id })));
    if (linkError) throw new Error(linkError.message);
  }

  revalidatePath("/admin/adresses");
  redirect("/admin/adresses");
}

export async function deleteAddress(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("addresses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/adresses");
}

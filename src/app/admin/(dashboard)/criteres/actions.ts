"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCriterion(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!label) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("criteria")
    .insert({ label, description, slug: slugify(label) });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/criteres");
}

export async function deleteCriterion(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("criteria").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/criteres");
}

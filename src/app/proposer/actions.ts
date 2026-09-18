"use server";

import { redirect } from "next/navigation";
import { createSubmission } from "@/lib/data";

export async function submitAddress(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const ville = String(formData.get("ville") ?? "").trim();

  if (!nom || !ville) {
    redirect("/proposer?erreur=1");
  }

  await createSubmission({
    nom,
    ville,
    categorie_suggeree: String(formData.get("categorie_suggeree") ?? "") || undefined,
    adresse: String(formData.get("adresse") ?? "") || undefined,
    description: String(formData.get("description") ?? "") || undefined,
    contact_email: String(formData.get("contact_email") ?? "") || undefined,
  });

  redirect("/proposer?merci=1");
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markSubmission(id: string, statut: "validee" | "rejetee") {
  const supabase = await createClient();
  const { error } = await supabase.from("submissions").update({ statut }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/soumissions");
}

import { createClient } from "@/lib/supabase/server";
import AddressForm from "../AddressForm";
import { createAddress } from "../actions";
import type { City, Category, Criterion } from "@/lib/database.types";

export default async function NouvelleAdressePage() {
  const supabase = await createClient();
  const [{ data: cities }, { data: categories }, { data: criteria }] = await Promise.all([
    supabase.from("cities").select("*").order("nom"),
    supabase.from("categories").select("*").order("nom"),
    supabase.from("criteria").select("*").order("label"),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Nouvelle adresse</h1>
      <AddressForm
        action={createAddress}
        cities={(cities ?? []) as City[]}
        categories={(categories ?? []) as Category[]}
        criteria={(criteria ?? []) as Criterion[]}
      />
    </div>
  );
}

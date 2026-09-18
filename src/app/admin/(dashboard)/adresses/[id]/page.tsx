import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddressForm from "../AddressForm";
import { updateAddress } from "../actions";
import type { Address, City, Category, Criterion } from "@/lib/database.types";

export default async function EditAdressePage({
  params,
}: PageProps<"/admin/adresses/[id]">) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: address }, { data: cities }, { data: categories }, { data: criteria }] =
    await Promise.all([
      supabase
        .from("addresses")
        .select("*, criteria:address_criteria(criterion:criteria(*))")
        .eq("id", id)
        .maybeSingle(),
      supabase.from("cities").select("*").order("nom"),
      supabase.from("categories").select("*").order("nom"),
      supabase.from("criteria").select("*").order("label"),
    ]);

  if (!address) notFound();

  const normalizedAddress = {
    ...address,
    criteria: (address.criteria as Array<{ criterion: Criterion }>).map((link) => link.criterion),
  } as Address & { criteria: Criterion[] };

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Modifier {normalizedAddress.nom}</h1>
      <AddressForm
        action={updateAddress.bind(null, id)}
        cities={(cities ?? []) as City[]}
        categories={(categories ?? []) as Category[]}
        criteria={(criteria ?? []) as Criterion[]}
        address={normalizedAddress}
      />
    </div>
  );
}

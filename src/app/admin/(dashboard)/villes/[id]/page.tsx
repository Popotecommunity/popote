import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCity } from "../actions";
import type { City } from "@/lib/database.types";

export default async function EditCityPage({
  params,
}: PageProps<"/admin/villes/[id]">) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("cities").select("*").eq("id", id).maybeSingle();
  const city = data as City | null;

  if (!city) notFound();

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-3xl text-ink">Modifier {city.nom}</h1>

      <form action={updateCity.bind(null, city.id)} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-ink/80">Nom</label>
          <input
            name="nom"
            defaultValue={city.nom}
            required
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Région</label>
          <input
            name="region"
            defaultValue={city.region ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input type="checkbox" name="actif" defaultChecked={city.actif} />
          Ville active (visible sur le site)
        </label>
        <button
          type="submit"
          className="rounded-full bg-olive text-cream px-6 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

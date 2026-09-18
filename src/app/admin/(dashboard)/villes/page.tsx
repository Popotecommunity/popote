import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createCity, deleteCity } from "./actions";
import type { City } from "@/lib/database.types";

export default async function VillesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("cities").select("*").order("nom");
  const cities = (data ?? []) as City[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Villes</h1>
      <p className="mt-1 text-sm text-ink/60">
        Chaque ville active apparaît dans le sélecteur d&rsquo;accueil et dans /explorer.
      </p>

      <form action={createCity} className="mt-8 flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-ink/60">Nom de la ville</label>
          <input
            name="nom"
            required
            className="mt-1 block rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">Région</label>
          <input
            name="region"
            className="mt-1 block rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-olive text-cream px-5 py-2 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-5 py-3">Ville</th>
              <th className="px-5 py-3">Région</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id} className="border-t border-line">
                <td className="px-5 py-3 font-medium">{city.nom}</td>
                <td className="px-5 py-3 text-ink/60">{city.region ?? "—"}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium rounded-full px-3 py-1 ${
                      city.actif ? "bg-olive/10 text-olive" : "bg-ink/10 text-ink/50"
                    }`}
                  >
                    {city.actif ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right space-x-3">
                  <Link href={`/admin/villes/${city.id}`} className="text-olive font-medium hover:underline">
                    Modifier
                  </Link>
                  <form action={deleteCity.bind(null, city.id)} className="inline">
                    <button type="submit" className="text-terracotta font-medium hover:underline">
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {cities.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-ink/50">
                  Aucune ville pour l&rsquo;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

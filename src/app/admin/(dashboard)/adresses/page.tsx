import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteAddress } from "./actions";

const statutLabels: Record<string, string> = {
  brouillon: "Brouillon",
  publie: "Publié",
  archive: "Archivé",
};

export default async function AdressesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("addresses")
    .select("*, city:cities(nom), category:categories(nom)")
    .order("created_at", { ascending: false });

  const addresses = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Adresses</h1>
          <p className="mt-1 text-sm text-ink/60">
            {addresses.length} adresse{addresses.length > 1 ? "s" : ""} au total.
          </p>
        </div>
        <Link
          href="/admin/adresses/nouvelle"
          className="rounded-full bg-olive text-cream px-5 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          + Nouvelle adresse
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-5 py-3">Nom</th>
              <th className="px-5 py-3">Ville</th>
              <th className="px-5 py-3">Catégorie</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.id as string} className="border-t border-line">
                <td className="px-5 py-3 font-medium">{address.nom as string}</td>
                <td className="px-5 py-3 text-ink/60">
                  {(address.city as { nom: string } | null)?.nom ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink/60">
                  {(address.category as { nom: string } | null)?.nom ?? "—"}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium rounded-full px-3 py-1 ${
                      address.statut === "publie"
                        ? "bg-olive/10 text-olive"
                        : address.statut === "archive"
                          ? "bg-ink/10 text-ink/50"
                          : "bg-terracotta/10 text-terracotta"
                    }`}
                  >
                    {statutLabels[address.statut as string] ?? (address.statut as string)}
                  </span>
                </td>
                <td className="px-5 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/adresses/${address.id}`}
                    className="text-olive font-medium hover:underline"
                  >
                    Modifier
                  </Link>
                  <form action={deleteAddress.bind(null, address.id as string)} className="inline">
                    <button type="submit" className="text-terracotta font-medium hover:underline">
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {addresses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-6 text-center text-ink/50">
                  Aucune adresse pour l&rsquo;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

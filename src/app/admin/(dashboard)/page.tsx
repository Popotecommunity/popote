import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: villes }, { count: adresses }, { count: publiees }, { count: enAttente }] =
    await Promise.all([
      supabase.from("cities").select("*", { count: "exact", head: true }),
      supabase.from("addresses").select("*", { count: "exact", head: true }),
      supabase
        .from("addresses")
        .select("*", { count: "exact", head: true })
        .eq("statut", "publie"),
      supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .eq("statut", "en_attente"),
    ]);

  const stats = [
    { label: "Villes actives", value: villes ?? 0, href: "/admin/villes" },
    { label: "Adresses publiées", value: publiees ?? 0, href: "/admin/adresses" },
    { label: "Adresses au total", value: adresses ?? 0, href: "/admin/adresses" },
    { label: "Soumissions en attente", value: enAttente ?? 0, href: "/admin/soumissions" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Tableau de bord</h1>
      <p className="mt-1 text-sm text-ink/60">Vue d&rsquo;ensemble du carnet Popote.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-line bg-white p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-3xl font-serif text-olive">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

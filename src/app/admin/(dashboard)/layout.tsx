import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/adresses", label: "Adresses" },
  { href: "/admin/soumissions", label: "Soumissions" },
  { href: "/admin/villes", label: "Villes" },
  { href: "/admin/categories", label: "Catégories" },
  { href: "/admin/criteres", label: "Critères" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-cream-dark">
      <aside className="w-60 shrink-0 bg-olive text-cream flex flex-col">
        <div className="px-6 py-6">
          <p className="font-serif text-2xl">
            Popote<span className="text-terracotta">.</span>
          </p>
          <p className="text-xs text-cream/60 mt-1">Back office</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-cream/85 hover:bg-cream/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-6">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-cream/70 hover:bg-cream/10 transition-colors"
          >
            ← Voir le site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left rounded-lg px-3 py-2 text-sm text-cream/70 hover:bg-cream/10 transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-10 py-10">{children}</main>
    </div>
  );
}

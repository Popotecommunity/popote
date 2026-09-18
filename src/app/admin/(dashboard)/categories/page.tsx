import { createClient } from "@/lib/supabase/server";
import { createCategory, deleteCategory } from "./actions";
import type { Category } from "@/lib/database.types";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("nom");
  const categories = (data ?? []) as Category[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Catégories</h1>
      <p className="mt-1 text-sm text-ink/60">
        Les types de commerces proposés dans les filtres d&rsquo;Explorer.
      </p>

      <form action={createCategory} className="mt-8 flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-ink/60">Nom</label>
          <input
            name="nom"
            required
            placeholder="Fromagerie"
            className="mt-1 block rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">Icône (emoji)</label>
          <input
            name="icone"
            placeholder="🧀"
            className="mt-1 block w-20 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-olive text-cream px-5 py-2 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm"
          >
            <span>{category.icone}</span>
            <span className="font-medium">{category.nom}</span>
            <form action={deleteCategory.bind(null, category.id)}>
              <button type="submit" className="text-terracotta hover:underline">
                ×
              </button>
            </form>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-ink/50">Aucune catégorie pour l&rsquo;instant.</p>
        )}
      </div>
    </div>
  );
}

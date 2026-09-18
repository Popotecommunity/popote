import { createClient } from "@/lib/supabase/server";
import { createCriterion, deleteCriterion } from "./actions";
import type { Criterion } from "@/lib/database.types";

export default async function CriteresAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("criteria").select("*").order("label");
  const criteria = (data ?? []) as Criterion[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Critères</h1>
      <p className="mt-1 text-sm text-ink/60">
        Les badges affichés sur les fiches d&rsquo;adresses. Voir aussi le cahier
        des charges sur la page publique{" "}
        <span className="font-medium">/criteres</span>.
      </p>

      <form action={createCriterion} className="mt-8 flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-ink/60">Label</label>
          <input
            name="label"
            required
            placeholder="Circuit court"
            className="mt-1 block rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <div className="flex-1 min-w-[240px]">
          <label className="text-xs font-medium text-ink/60">Description</label>
          <input
            name="description"
            placeholder="Définition courte du critère"
            className="mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-olive text-cream px-5 py-2 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {criteria.map((criterion) => (
          <div
            key={criterion.id}
            className="flex items-start justify-between rounded-xl border border-line bg-white px-5 py-4"
          >
            <div>
              <p className="font-medium">{criterion.label}</p>
              {criterion.description && (
                <p className="mt-1 text-sm text-ink/60">{criterion.description}</p>
              )}
            </div>
            <form action={deleteCriterion.bind(null, criterion.id)}>
              <button type="submit" className="text-terracotta text-sm font-medium hover:underline">
                Supprimer
              </button>
            </form>
          </div>
        ))}
        {criteria.length === 0 && (
          <p className="text-sm text-ink/50">Aucun critère pour l&rsquo;instant.</p>
        )}
      </div>
    </div>
  );
}

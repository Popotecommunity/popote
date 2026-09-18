import type { Address } from "@/lib/database.types";

export default function AddressCard({ address }: { address: Address }) {
  return (
    <article className="rounded-2xl border border-line bg-white/60 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink/50">
        <span>
          {address.category?.nom ?? "Adresse"}
          {address.prix ? ` · ${address.prix}` : ""}
        </span>
      </div>

      <h3 className="font-serif text-xl text-ink">{address.nom}</h3>

      <p className="text-sm text-ink/60">
        {address.city?.nom}
        {address.quartier ? ` · ${address.quartier}` : ""}
      </p>

      {address.description && (
        <p className="text-sm text-ink/70">{address.description}</p>
      )}

      {address.criteria && address.criteria.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {address.criteria.map((criterion) => (
            <span
              key={criterion.id}
              className="text-xs font-medium rounded-full bg-olive/10 text-olive px-3 py-1"
            >
              {criterion.label}
            </span>
          ))}
        </div>
      )}

      {(address.horaires || address.site_web) && (
        <div className="mt-1 space-y-1 text-xs text-ink/50">
          {address.horaires && <p>{address.horaires}</p>}
          {address.site_web && (
            <a
              href={address.site_web}
              target="_blank"
              rel="noreferrer"
              className="text-olive hover:underline"
            >
              Site web →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

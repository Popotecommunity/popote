import type { Address, City, Category, Criterion } from "@/lib/database.types";

export default function AddressForm({
  action,
  cities,
  categories,
  criteria,
  address,
}: {
  action: (formData: FormData) => void | Promise<void>;
  cities: City[];
  categories: Category[];
  criteria: Criterion[];
  address?: Address & { criteria?: Criterion[] };
}) {
  const selectedCriteriaIds = new Set((address?.criteria ?? []).map((c) => c.id));

  return (
    <form action={action} className="mt-8 space-y-5 max-w-2xl">
      <div>
        <label className="text-sm font-medium text-ink/80">Nom de l&rsquo;adresse *</label>
        <input
          name="nom"
          required
          defaultValue={address?.nom}
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80">Ville *</label>
          <select
            name="city_id"
            required
            defaultValue={address?.city_id ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          >
            <option value="" disabled>
              Choisir une ville
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink/80">Catégorie *</label>
          <select
            name="category_id"
            required
            defaultValue={address?.category_id ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          >
            <option value="" disabled>
              Choisir une catégorie
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80">Quartier</label>
          <input
            name="quartier"
            defaultValue={address?.quartier ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Niveau de prix</label>
          <select
            name="prix"
            defaultValue={address?.prix ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          >
            <option value="">—</option>
            <option value="€">€</option>
            <option value="€€">€€</option>
            <option value="€€€">€€€</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink/80">Adresse postale</label>
        <input
          name="adresse"
          defaultValue={address?.adresse ?? ""}
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink/80">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={address?.description ?? ""}
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink/80">Photo (URL)</label>
        <input
          name="image_url"
          defaultValue={address?.image_url ?? ""}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80">Téléphone</label>
          <input
            name="telephone"
            defaultValue={address?.telephone ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Email</label>
          <input
            name="email"
            defaultValue={address?.email ?? ""}
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80">Site web</label>
          <input
            name="site_web"
            defaultValue={address?.site_web ?? ""}
            placeholder="https://…"
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Instagram</label>
          <input
            name="instagram"
            defaultValue={address?.instagram ?? ""}
            placeholder="https://…"
            className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink/80">Horaires</label>
        <input
          name="horaires"
          defaultValue={address?.horaires ?? ""}
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        />
      </div>

      <div>
        <span className="text-sm font-medium text-ink/80">Critères</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {criteria.map((criterion) => (
            <label
              key={criterion.id}
              className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="criteria_ids"
                value={criterion.id}
                defaultChecked={selectedCriteriaIds.has(criterion.id)}
              />
              {criterion.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink/80">Statut</label>
        <select
          name="statut"
          defaultValue={address?.statut ?? "brouillon"}
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
        >
          <option value="brouillon">Brouillon</option>
          <option value="publie">Publié</option>
          <option value="archive">Archivé</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-full bg-olive text-cream px-6 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
      >
        Enregistrer
      </button>
    </form>
  );
}

"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import AddressCard from "@/components/site/AddressCard";
import type { Address, Category, Criterion, City } from "@/lib/database.types";

const AddressMap = dynamic(() => import("@/components/site/AddressMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-2xl border border-line bg-cream-dark animate-pulse" />
  ),
});

const LYON_CENTER: [number, number] = [45.764, 4.8357];

export default function ExplorerClient({
  city,
  addresses,
  categories,
  criteria,
}: {
  city: City;
  addresses: Address[];
  categories: Category[];
  criteria: Criterion[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCriteria, setActiveCriteria] = useState<string[]>([]);
  const [view, setView] = useState<"liste" | "carte">("liste");

  const toggleCriterion = (slug: string) => {
    setActiveCriteria((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const filtered = useMemo(() => {
    return addresses.filter((address) => {
      if (activeCategory && address.category?.slug !== activeCategory) {
        return false;
      }
      if (activeCriteria.length > 0) {
        const addressCriteriaSlugs = (address.criteria ?? []).map((c) => c.slug);
        const hasAll = activeCriteria.every((slug) => addressCriteriaSlugs.includes(slug));
        if (!hasAll) return false;
      }
      return true;
    });
  }, [addresses, activeCategory, activeCriteria]);

  const mapCenter = useMemo<[number, number]>(() => {
    const located = filtered.filter((a) => a.lat != null && a.lng != null);
    if (located.length === 0) return LYON_CENTER;
    const lat = located.reduce((sum, a) => sum + (a.lat as number), 0) / located.length;
    const lng = located.reduce((sum, a) => sum + (a.lng as number), 0) / located.length;
    return [lat, lng];
  }, [filtered]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
        {city.nom}, côté gourmand
      </p>
      <h1 className="mt-3 font-serif text-4xl">Les bonnes adresses, au coin de la rue.</h1>

      {/* Filtres catégories */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            activeCategory === null
              ? "bg-olive text-cream border-olive"
              : "border-line text-ink/70 hover:border-olive"
          }`}
        >
          Tout
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              activeCategory === category.slug
                ? "bg-olive text-cream border-olive"
                : "border-line text-ink/70 hover:border-olive"
            }`}
          >
            {category.icone} {category.nom}
          </button>
        ))}
      </div>

      {/* Filtres critères */}
      <div className="mt-4 flex flex-wrap gap-2">
        {criteria.map((criterion) => {
          const isSauge = criterion.slug === "de-saison";
          const isActive = activeCriteria.includes(criterion.slug);
          return (
            <button
              key={criterion.id}
              onClick={() => toggleCriterion(criterion.slug)}
              className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                isActive
                  ? isSauge
                    ? "bg-sauge text-cream border-sauge"
                    : "bg-terracotta text-cream border-terracotta"
                  : isSauge
                    ? "border-line text-ink/60 hover:border-sauge"
                    : "border-line text-ink/60 hover:border-terracotta"
              }`}
            >
              {criterion.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-ink/50">
          {filtered.length} adresse{filtered.length > 1 ? "s" : ""} à découvrir
        </p>

        <div className="flex gap-1 rounded-full border border-line p-1">
          <button
            onClick={() => setView("liste")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              view === "liste" ? "bg-olive text-cream" : "text-ink/60 hover:text-olive"
            }`}
          >
            Liste
          </button>
          <button
            onClick={() => setView("carte")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              view === "carte" ? "bg-olive text-cream" : "text-ink/60 hover:text-olive"
            }`}
          >
            Carte
          </button>
        </div>
      </div>

      {view === "carte" ? (
        <div className="mt-6">
          <AddressMap addresses={filtered} center={mapCenter} />
          {filtered.some((a) => a.lat == null || a.lng == null) && (
            <p className="mt-3 text-xs text-ink/40">
              Certaines adresses n&rsquo;ont pas encore de coordonnées et n&rsquo;apparaissent pas sur la carte.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((address) => <AddressCard key={address.id} address={address} />)
          ) : (
            <p className="text-sm text-ink/50 col-span-3">
              Aucune adresse ne correspond à ces filtres pour le moment.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

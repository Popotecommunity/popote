"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { City } from "@/lib/database.types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function HeroSearch({ cities }: { cities: City[] }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [erreur, setErreur] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = normalize(value);

    if (!query) return;

    const match = cities.find(
      (city) => normalize(city.nom) === query || normalize(city.nom).includes(query),
    );

    if (match) {
      setErreur(false);
      router.push(`/explorer/${match.slug}`);
    } else {
      setErreur(true);
    }
  };

  return (
    <div className="mt-8 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-full border border-line bg-white overflow-hidden"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setErreur(false);
          }}
          placeholder="Une ville, un quartier, une adresse…"
          className="flex-1 px-5 py-3 text-sm outline-none bg-transparent"
        />
        <button
          type="submit"
          className="bg-olive text-cream px-6 py-3 text-sm font-medium hover:bg-olive-light transition-colors"
        >
          Explorer
        </button>
      </form>

      {erreur && (
        <p className="mt-2 text-sm text-ink/60">
          Popote n&rsquo;est pas encore dans cette ville. Essaie{" "}
          {cities.map((city, i) => (
            <span key={city.id}>
              <a href={`/explorer/${city.slug}`} className="text-olive hover:underline">
                {city.nom}
              </a>
              {i < cities.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

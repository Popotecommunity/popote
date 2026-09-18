import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream-dark mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-olive">
            Popote<span className="text-terracotta">.</span>
          </p>
          <p className="mt-3 text-sm text-ink/70 max-w-xs">
            Le carnet des bonnes adresses pour manger local, de saison et en
            circuit court, ville par ville.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Le carnet</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li><Link href="/explorer/lyon" className="hover:text-olive">Explorer</Link></li>
            <li><Link href="/criteres" className="hover:text-olive">Nos critères</Link></li>
            <li><Link href="/journal" className="hover:text-olive">Le journal</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Contribuer</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li><Link href="/proposer" className="hover:text-olive">Proposer une adresse</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70 py-4 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Popote — Projet en développement.
      </div>
    </footer>
  );
}

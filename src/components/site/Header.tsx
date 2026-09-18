import Link from "next/link";

const links = [
  { href: "/explorer/lyon", label: "Explorer" },
  { href: "/criteres", label: "Nos critères" },
  { href: "/journal", label: "Le journal" },
];

export default function Header() {
  return (
    <header className="border-b border-line bg-cream/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 font-serif text-2xl font-semibold text-olive">
          Popote
          <span className="text-terracotta text-3xl leading-none">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-olive transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/proposer"
          className="inline-flex items-center gap-2 rounded-full border border-olive px-4 py-2 text-sm font-medium text-olive hover:bg-olive hover:text-cream transition-colors"
        >
          + Ajouter une adresse
        </Link>
      </div>
    </header>
  );
}

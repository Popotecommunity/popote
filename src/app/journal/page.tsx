import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const articles = [
  {
    rubrique: "Savoir-faire",
    titre: "Le levain, une histoire de patience.",
    duree: "3 min de lecture",
  },
  {
    rubrique: "Dans le panier",
    titre: "Un panier de saison, mille possibilités.",
    duree: "3 min de lecture",
  },
  {
    rubrique: "Vie de quartier",
    titre: "Retrouver le plaisir des courses à pied.",
    duree: "3 min de lecture",
  },
];

export default function JournalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            Le journal Popote
          </p>
          <h1 className="mt-3 font-serif text-4xl">À lire, à goûter, à partager.</h1>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.titre} className="rounded-2xl border border-line p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  {article.rubrique} · {article.duree}
                </p>
                <h2 className="mt-3 font-serif text-xl">{article.titre}</h2>
                <span className="mt-4 inline-block text-sm text-olive font-medium">
                  À venir
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AddressCard from "@/components/site/AddressCard";
import { getCities, getFeaturedAddresses } from "@/lib/data";

const convictions = [
  {
    numero: "01",
    titre: "Des gens indépendants",
    texte: "Des commerces à taille humaine, portés par celles et ceux qui y travaillent.",
  },
  {
    numero: "02",
    titre: "Le goût du local",
    texte: "Des producteurs proches et des circuits plus courts, quand le produit le permet.",
  },
  {
    numero: "03",
    titre: "Du bon sens, de saison",
    texte: "Des étals et des assiettes qui suivent les récoltes. Moins de superflu, plus de goût.",
  },
];

export default async function Home() {
  const [cities, featured] = await Promise.all([
    getCities().catch(() => []),
    getFeaturedAddresses(3).catch(() => []),
  ]);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <p className="flex items-center gap-2 text-sm font-semibold text-terracotta">
            <span aria-hidden>✳</span> LE BON GOÛT D&rsquo;ÊTRE TOUT PRÈS
          </p>

          <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05] text-ink max-w-2xl">
            Manger local
            <br />
            n&rsquo;a jamais été
            <br />
            <span className="italic text-terracotta">aussi simple.</span>
          </h1>

          <p className="mt-6 max-w-md text-ink/70">
            Les bonnes adresses pour acheter, cuisiner et manger près de chez
            vous.
          </p>

          <form
            action="/explorer/lyon"
            className="mt-8 flex max-w-lg rounded-full border border-line bg-white overflow-hidden"
          >
            <input
              type="text"
              placeholder="Une ville, un quartier, une adresse…"
              className="flex-1 px-5 py-3 text-sm outline-none bg-transparent"
              disabled
            />
            <button
              type="submit"
              className="bg-olive text-cream px-6 py-3 text-sm font-medium hover:bg-olive-light transition-colors"
            >
              Explorer
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3 text-sm text-ink/60">
            <span>On vous emmène ?</span>
            {cities.length > 0
              ? cities.map((city, i) => (
                  <span key={city.id}>
                    <Link href={`/explorer/${city.slug}`} className="text-olive font-medium hover:underline">
                      {city.nom}
                    </Link>
                    {i < cities.length - 1 && <span className="mx-1 text-ink/30">·</span>}
                  </span>
                ))
              : (
                <>
                  <Link href="/explorer/paris" className="text-olive font-medium hover:underline">Paris</Link>
                  <Link href="/explorer/lyon" className="text-olive font-medium hover:underline">Lyon</Link>
                  <Link href="/explorer/rouen" className="text-olive font-medium hover:underline">Rouen</Link>
                </>
              )}
          </div>
        </section>

        {/* Convictions */}
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-line">
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            Moins de blabla, plus de bon
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl max-w-xl">
            De bonnes adresses. Pour de bonnes raisons.
          </h2>
          <p className="mt-4 max-w-xl text-ink/70">
            On aime savoir ce que l&rsquo;on mange. Et surtout, qui se cache
            derrière. Voici les convictions qui guident notre carnet.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {convictions.map((c) => (
              <div key={c.numero}>
                <span className="text-sm font-semibold text-olive/60">{c.numero}</span>
                <h3 className="mt-2 font-serif text-xl">{c.titre}</h3>
                <p className="mt-2 text-sm text-ink/70">{c.texte}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-ink/40 max-w-xl">
            Dans cette démonstration, les badges illustrent ces critères ; ils
            ne constituent pas une certification.{" "}
            <Link href="/criteres" className="underline hover:text-olive">
              Voir notre cahier des charges.
            </Link>
          </p>
        </section>

        {/* Adresses en avant */}
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-line">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
                Les adresses qu&rsquo;on aime
              </p>
              <h2 className="mt-3 font-serif text-3xl">Nos coups de cœur du moment.</h2>
            </div>
            <Link href="/explorer/lyon" className="hidden md:inline text-sm font-medium text-olive hover:underline">
              Toutes les adresses →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.length > 0 ? (
              featured.map((address) => <AddressCard key={address.id} address={address} />)
            ) : (
              <p className="text-sm text-ink/50 col-span-3">
                Aucune adresse publiée pour l&rsquo;instant — connecte Supabase
                et ajoute des adresses depuis le back office (/admin).
              </p>
            )}
          </div>
        </section>

        {/* Proposer une adresse */}
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-line">
          <div className="rounded-3xl bg-olive text-cream px-8 py-14 text-center">
            <p className="text-sm font-semibold text-cream/70 uppercase tracking-wide">
              Les bonnes adresses se transmettent
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Votre pépite de quartier mérite d&rsquo;être connue.
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-cream/80">
              Une épicerie de cœur, un artisan passionné ? Faites une place à
              vos découvertes dans le carnet.
            </p>
            <Link
              href="/proposer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream text-olive px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              Partager une bonne adresse
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const criteres = [
  {
    label: "Circuit court",
    def: "Un ou zéro intermédiaire entre le producteur et le point de vente. On regarde qui vend, pas seulement ce qui est vendu.",
    limite:
      "Ne s'applique pas à tous les produits partout : l'huile d'olive vendue à Rouen ne peut pas être en circuit court local. Dans ce cas, le badge porte sur les produits concernés de l'adresse, pas sur l'adresse entière.",
  },
  {
    label: "De saison",
    def: "Les produits phares de l'adresse suivent le calendrier des récoltes de la région, sans forçage (serre chauffée, import hors saison).",
    limite: "S'applique surtout aux primeurs, marchés et restaurants qui composent leur carte selon l'arrivage.",
  },
  {
    label: "Bio",
    def: "Certification officielle (AB, Eurofeuille) détenue par le producteur ou le commerce pour les produits concernés.",
    limite: "Terme réglementé : on ne l'attribue que si une certification est vérifiable, jamais par déduction.",
  },
  {
    label: "Artisan indépendant",
    def: "Commerce à taille humaine, non franchisé, tenu par les personnes qui le font vivre au quotidien.",
    limite: "N'indique rien sur l'origine des produits — c'est un critère sur la structure du commerce, pas sur ce qu'il vend.",
  },
  {
    label: "Vrac",
    def: "Possibilité d'acheter au poids ou à la quantité voulue, sans emballage imposé.",
    limite: "Peut concerner une partie seulement de l'offre du commerce.",
  },
];

export default function CriteresPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            Cahier des charges — brouillon
          </p>
          <h1 className="mt-3 font-serif text-4xl">Nos critères, sans grand flou.</h1>
          <p className="mt-4 text-ink/70">
            Popote référence des adresses, pas des marques. Chaque badge que
            vous voyez sur une fiche répond à une définition précise, avec ses
            limites. Ce document est amené à évoluer : dites-nous où on se
            trompe.
          </p>

          <div className="mt-12 space-y-10">
            {criteres.map((c) => (
              <div key={c.label} className="border-t border-line pt-6">
                <h2 className="font-serif text-2xl text-olive">{c.label}</h2>
                <p className="mt-2 text-ink/80">{c.def}</p>
                <p className="mt-2 text-sm text-ink/50">
                  <span className="font-semibold">Limite : </span>
                  {c.limite}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-cream-dark p-6 border border-line">
            <h3 className="font-serif text-xl">Questions encore ouvertes</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/70 list-disc list-inside">
              <li>Comment traiter les produits qui ne peuvent structurellement pas être locaux (huile d&rsquo;olive, café, épices) ?</li>
              <li>Un badge par produit ou par adresse entière ?</li>
              <li>Qui valide une fiche : modération éditoriale ou communautaire ?</li>
              <li>Faut-il une distance kilométrique de référence pour &laquo; circuit court &raquo; ?</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

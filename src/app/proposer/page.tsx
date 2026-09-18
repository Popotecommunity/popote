import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { submitAddress } from "@/app/proposer/actions";

export default async function ProposerPage({
  searchParams,
}: PageProps<"/proposer">) {
  const params = await searchParams;
  const merci = params?.merci === "1";
  const erreur = params?.erreur === "1";

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            Contribuer
          </p>
          <h1 className="mt-3 font-serif text-4xl">Proposez une bonne adresse.</h1>
          <p className="mt-4 text-ink/70">
            Chaque suggestion est relue avant publication, pour rester fidèle
            à nos critères. Merci pour votre aide à faire grandir le carnet.
          </p>

          {merci && (
            <p className="mt-6 rounded-xl bg-olive/10 text-olive px-4 py-3 text-sm">
              Merci ! Votre suggestion a bien été reçue, elle est en cours de relecture.
            </p>
          )}
          {erreur && (
            <p className="mt-6 rounded-xl bg-terracotta/10 text-terracotta px-4 py-3 text-sm">
              Le nom de l&rsquo;adresse et la ville sont nécessaires pour envoyer votre suggestion.
            </p>
          )}

          <form action={submitAddress} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-ink/80">Nom de l&rsquo;adresse *</label>
              <input
                name="nom"
                required
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/80">Ville *</label>
              <input
                name="ville"
                required
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/80">Type de commerce</label>
              <input
                name="categorie_suggeree"
                placeholder="Boulangerie, primeur, épicerie…"
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/80">Adresse</label>
              <input
                name="adresse"
                placeholder="Rue, quartier…"
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/80">
                Pourquoi cette adresse mérite d&rsquo;être dans Popote ?
              </label>
              <textarea
                name="description"
                rows={4}
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/80">Votre email (optionnel)</label>
              <input
                type="email"
                name="contact_email"
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-olive text-cream px-6 py-3 text-sm font-medium hover:bg-olive-light transition-colors"
            >
              Envoyer ma suggestion
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

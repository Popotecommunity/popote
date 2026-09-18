import { requestPasswordReset } from "@/app/admin/actions";

export default async function ForgotPasswordPage({
  searchParams,
}: PageProps<"/admin/mot-de-passe-oublie">) {
  const params = await searchParams;
  const envoye = params?.envoye === "1";

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <p className="font-serif text-3xl text-olive text-center">
          Popote<span className="text-terracotta">.</span>
        </p>
        <p className="mt-1 text-center text-sm text-ink/60">Mot de passe oublié</p>

        {envoye ? (
          <p className="mt-8 rounded-lg bg-olive/10 text-olive px-4 py-3 text-sm text-center">
            Si un compte existe avec cet email, un lien de réinitialisation vient
            d&rsquo;être envoyé. Vérifie ta boîte mail (et les spams).
          </p>
        ) : (
          <form action={requestPasswordReset} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-ink/80">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-olive text-cream px-6 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
            >
              Envoyer le lien de réinitialisation
            </button>
          </form>
        )}

        <a
          href="/admin/login"
          className="mt-4 block text-center text-sm text-ink/50 hover:text-olive"
        >
          ← Retour à la connexion
        </a>
      </div>
    </main>
  );
}

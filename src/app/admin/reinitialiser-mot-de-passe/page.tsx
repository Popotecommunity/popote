import { updatePassword } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/admin/reinitialiser-mot-de-passe">) {
  const params = await searchParams;
  const erreur = params?.erreur === "1";
  const code = typeof params?.code === "string" ? params.code : undefined;

  const supabase = await createClient();

  let lienValide = false;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    lienValide = !error;
  } else {
    const { data } = await supabase.auth.getUser();
    lienValide = !!data.user;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <p className="font-serif text-3xl text-olive text-center">
          Popote<span className="text-terracotta">.</span>
        </p>
        <p className="mt-1 text-center text-sm text-ink/60">Nouveau mot de passe</p>

        {!lienValide ? (
          <p className="mt-8 rounded-lg bg-terracotta/10 text-terracotta px-4 py-3 text-sm text-center">
            Ce lien est invalide ou a expiré.{" "}
            <a href="/admin/mot-de-passe-oublie" className="underline">
              Demander un nouveau lien
            </a>
            .
          </p>
        ) : (
          <>
            {erreur && (
              <p className="mt-6 rounded-lg bg-terracotta/10 text-terracotta px-4 py-3 text-sm">
                Le mot de passe doit contenir au moins 6 caractères.
              </p>
            )}
            <form action={updatePassword} className="mt-8 space-y-4">
              <div>
                <label className="text-sm font-medium text-ink/80">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-olive text-cream px-6 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
              >
                Enregistrer le mot de passe
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

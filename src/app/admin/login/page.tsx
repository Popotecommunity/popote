import { redirect } from "next/navigation";
import { login } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const erreur = params?.erreur === "1";

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <p className="font-serif text-3xl text-olive text-center">
          Popote<span className="text-terracotta">.</span>
        </p>
        <p className="mt-1 text-center text-sm text-ink/60">Back office</p>

        {erreur && (
          <p className="mt-6 rounded-lg bg-terracotta/10 text-terracotta px-4 py-3 text-sm">
            Identifiants incorrects.
          </p>
        )}

        <form action={login} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink/80">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 outline-none focus:border-olive"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-olive text-cream px-6 py-2.5 text-sm font-medium hover:bg-olive-light transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}

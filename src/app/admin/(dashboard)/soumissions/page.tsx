import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { markSubmission } from "./actions";
import type { Submission } from "@/lib/database.types";

const statutLabels: Record<string, string> = {
  en_attente: "En attente",
  validee: "Validée",
  rejetee: "Rejetée",
};

export default async function SoumissionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });
  const submissions = (data ?? []) as Submission[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Soumissions</h1>
      <p className="mt-1 text-sm text-ink/60 max-w-xl">
        Propositions envoyées via le formulaire public. Valider une soumission
        ne crée pas encore automatiquement la fiche — utilisez ensuite{" "}
        <Link href="/admin/adresses/nouvelle" className="text-olive hover:underline">
          Nouvelle adresse
        </Link>{" "}
        pour la publier avec les bons critères.
      </p>

      <div className="mt-8 space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-lg">{submission.nom}</p>
                <p className="text-sm text-ink/60">
                  {submission.ville}
                  {submission.categorie_suggeree ? ` · ${submission.categorie_suggeree}` : ""}
                </p>
              </div>
              <span
                className={`text-xs font-medium rounded-full px-3 py-1 shrink-0 ${
                  submission.statut === "validee"
                    ? "bg-olive/10 text-olive"
                    : submission.statut === "rejetee"
                      ? "bg-ink/10 text-ink/50"
                      : "bg-terracotta/10 text-terracotta"
                }`}
              >
                {statutLabels[submission.statut]}
              </span>
            </div>

            {submission.adresse && (
              <p className="mt-3 text-sm text-ink/70">{submission.adresse}</p>
            )}
            {submission.description && (
              <p className="mt-2 text-sm text-ink/70">{submission.description}</p>
            )}
            {submission.contact_email && (
              <p className="mt-2 text-xs text-ink/50">Contact : {submission.contact_email}</p>
            )}

            {submission.statut === "en_attente" && (
              <div className="mt-4 flex gap-3">
                <form action={markSubmission.bind(null, submission.id, "validee")}>
                  <button
                    type="submit"
                    className="rounded-full bg-olive text-cream px-4 py-1.5 text-sm font-medium hover:bg-olive-light transition-colors"
                  >
                    Valider
                  </button>
                </form>
                <form action={markSubmission.bind(null, submission.id, "rejetee")}>
                  <button
                    type="submit"
                    className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/70 hover:border-terracotta hover:text-terracotta transition-colors"
                  >
                    Rejeter
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}

        {submissions.length === 0 && (
          <p className="text-sm text-ink/50">Aucune soumission pour l&rsquo;instant.</p>
        )}
      </div>
    </div>
  );
}

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const engagements = [
  {
    titre: "Une majorité de produits locaux ou régionaux",
    paragraphs: [
      "Une adresse Popote privilégie les produits cultivés, élevés, fabriqués ou transformés à proximité.",
      "À titre de repère, nous considérons comme local un produit provenant d’un rayon d’environ 150 kilomètres autour du commerce. Nous tenons également compte de l’échelle régionale lorsque celle-ci est plus adaptée à la réalité des filières.",
      "Le local doit être privilégié chaque fois qu’une production de qualité existe sur le territoire.",
    ],
  },
  {
    titre: "Le respect des saisons",
    paragraphs: [
      "Les fruits et légumes ont une saison, et Popote y tient.",
      "Les commerces sélectionnés adaptent autant que possible leur offre aux cycles naturels et expliquent clairement les éventuelles exceptions. La saisonnalité est évaluée avec réalisme, en fonction de la nature de chaque commerce et de ses produits.",
    ],
  },
  {
    titre: "Des producteurs et des filières identifiés",
    paragraphs: [
      "La mention « origine France » ne suffit pas toujours.",
      "Nous valorisons les commerces capables de présenter leurs producteurs, leurs artisans partenaires, leurs lieux de fabrication ou leurs principales filières d’approvisionnement.",
      "L’objectif n’est pas d’exiger une traçabilité parfaite de chaque ingrédient, mais de pouvoir comprendre ce que l’on achète et d’où cela vient.",
    ],
  },
  {
    titre: "Des circuits aussi courts que possible",
    paragraphs: [
      "La vente directe et les approvisionnements comprenant peu d’intermédiaires sont privilégiés.",
      "Un commerce n’a cependant pas besoin de fonctionner exclusivement en circuit court pour être référencé. Nous évaluons la cohérence générale de sa démarche et la place réellement accordée aux producteurs.",
    ],
  },
  {
    titre: "Une fabrication véritablement artisanale",
    paragraphs: [
      "Pour les boulangeries, fromageries, boucheries, conserveries et autres artisans, nous vérifions que la fabrication est réalisée sur place ou dans un atelier clairement identifié.",
      "Les expressions « artisanal », « fait maison » ou « fabriqué ici » doivent correspondre à une réalité concrète.",
    ],
  },
  {
    titre: "Une démarche indépendante et ancrée dans son territoire",
    paragraphs: [
      "Popote met en avant les commerçants indépendants, les artisans, les producteurs en vente directe, les marchés et les petites enseignes qui participent à la vie de leur quartier ou de leur territoire.",
      "Nous nous intéressons autant aux produits qu’aux personnes qui les cultivent, les fabriquent, les sélectionnent et les vendent.",
    ],
  },
];

const transparenceItems = [
  "l’origine de ses principaux produits ;",
  "l’identité de ses producteurs ou fournisseurs ;",
  "ses méthodes de fabrication ;",
  "la place accordée au local et au saisonnier ;",
  "les raisons de ses approvisionnements plus lointains.",
];

const loinConditions = [
  "leur provenance est clairement annoncée ;",
  "leur producteur, leur fournisseur ou leur filière est identifiable ;",
  "leur sélection répond à une véritable exigence de qualité ;",
  "ils complètent une offre majoritairement cohérente avec les engagements de Popote ;",
  "ils ne sont pas utilisés pour créer artificiellement une image locale ou responsable.",
];

const exclusions = [
  "dont l’origine des produits reste volontairement floue ;",
  "proposant principalement des produits industriels sans démarche particulière ;",
  "utilisant abusivement les termes « local », « artisanal » ou « fait maison » ;",
  "mettant en avant quelques références locales comme simple argument marketing ;",
  "dont les engagements annoncés ne peuvent pas être vérifiés.",
];

export default function CriteresPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm font-semibold text-terracotta uppercase tracking-wide">
            Le cahier des charges Popote
          </p>
          <h1 className="mt-3 font-serif text-4xl">Qu&rsquo;est-ce qu&rsquo;une adresse Popote ?</h1>

          <p className="mt-6 text-ink/80">
            Popote sélectionne des commerces alimentaires indépendants qui
            défendent une alimentation plus locale, plus saisonnière et plus
            transparente.
          </p>
          <p className="mt-4 text-ink/80">
            Notre ambition n&rsquo;est pas de promettre une alimentation
            « 100&nbsp;% locale ». Certains produits, comme le café, le
            chocolat, le thé, les épices, les agrumes ou encore certaines
            huiles d&rsquo;olive, ne peuvent tout simplement pas être produits
            partout en France.
          </p>
          <p className="mt-4 text-ink/80">Notre principe est donc simple :</p>
          <p className="mt-2 font-serif text-xl text-olive italic">
            L&rsquo;essentiel vient d&rsquo;ici, les exceptions sont choisies avec soin.
          </p>
          <p className="mt-4 text-ink/80">
            Nous privilégions les commerces qui peuvent expliquer d&rsquo;où
            viennent leurs produits, qui les cultivent ou les fabriquent, et
            pourquoi ils ont été sélectionnés.
          </p>

          {/* Les engagements */}
          <h2 className="mt-16 font-serif text-3xl">Les engagements que nous regardons</h2>
          <div className="mt-8 space-y-10">
            {engagements.map((e) => (
              <div key={e.titre} className="border-t border-line pt-6">
                <h3 className="font-serif text-2xl text-olive">{e.titre}</h3>
                {e.paragraphs.map((p, i) => (
                  <p key={i} className="mt-2 text-ink/80">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="border-t border-line pt-6">
              <h3 className="font-serif text-2xl text-olive">Une transparence sans détour</h3>
              <p className="mt-2 text-ink/80">La transparence est au cœur de Popote.</p>
              <p className="mt-2 text-ink/80">Une adresse sélectionnée doit pouvoir expliquer :</p>
              <ul className="mt-3 space-y-1.5 text-ink/80 list-disc list-inside">
                {transparenceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-ink/80">
                Nous préférons une exception clairement expliquée à une
                promesse de local impossible à vérifier.
              </p>
            </div>
          </div>

          {/* Produits qui viennent de loin */}
          <h2 className="mt-16 font-serif text-3xl">Et les produits qui viennent de loin ?</h2>
          <p className="mt-4 text-ink/80">
            Un commerce proposant du café, du chocolat, du thé, des épices,
            des agrumes ou de l&rsquo;huile d&rsquo;olive peut parfaitement
            rejoindre Popote.
          </p>
          <p className="mt-4 text-ink/80">Ces produits sont acceptés lorsque :</p>
          <ul className="mt-3 space-y-1.5 text-ink/80 list-disc list-inside">
            {loinConditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-ink/80">
            Le lointain n&rsquo;est donc pas interdit. Il doit être choisi,
            assumé et expliqué.
          </p>

          {/* Sélection */}
          <h2 className="mt-16 font-serif text-3xl">Comment sélectionnons-nous les adresses ?</h2>
          <p className="mt-4 text-ink/80">
            Chaque commerce est étudié dans son ensemble. Nous ne cherchons
            pas la perfection et nous n&rsquo;appliquons pas une simple liste
            de cases à cocher.
          </p>
          <p className="mt-4 text-ink/80">Deux engagements sont indispensables :</p>
          <ul className="mt-3 space-y-1.5 text-ink/80 list-disc list-inside">
            <li>l&rsquo;indépendance du commerce ;</li>
            <li>la transparence de sa démarche.</li>
          </ul>
          <p className="mt-4 text-ink/80">
            L&rsquo;adresse doit également répondre de manière convaincante à
            plusieurs autres critères&nbsp;: approvisionnement local ou
            régional, saisonnalité, circuits courts, producteurs identifiés,
            fabrication artisanale ou relations équitables avec ses
            partenaires.
          </p>
          <p className="mt-4 text-ink/80">
            Sur chaque fiche, nous expliquons concrètement pourquoi cette
            adresse a sa place chez Popote.
          </p>

          {/* Exclusions */}
          <h2 className="mt-16 font-serif text-3xl">Ce que nous ne référençons pas</h2>
          <p className="mt-4 text-ink/80">Nous écartons les commerces :</p>
          <ul className="mt-3 space-y-1.5 text-ink/80 list-disc list-inside">
            {exclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-ink/80">
            Popote référence les commerces alimentaires, artisans,
            producteurs et marchés. Les restaurants ne font pas partie du
            périmètre actuel.
          </p>

          {/* Cahier vivant */}
          <h2 className="mt-16 font-serif text-3xl">Un cahier des charges vivant</h2>
          <p className="mt-4 text-ink/80">
            Les pratiques évoluent, les saisons changent et les commerces
            peuvent faire progresser leurs approvisionnements.
          </p>
          <p className="mt-4 text-ink/80">
            Notre sélection n&rsquo;est donc jamais définitivement acquise.
            Les informations sont vérifiées et peuvent être mises à jour
            lorsque la démarche d&rsquo;une adresse évolue.
          </p>
          <p className="mt-4 text-ink/80">
            Un commerce peut également ne pas remplir tous les critères
            aujourd&rsquo;hui, tout en avançant dans la bonne direction.
            Popote souhaite valoriser les engagements réels, encourager les
            progrès et donner aux consommateurs les informations nécessaires
            pour choisir en connaissance de cause.
          </p>

          <div className="mt-16 rounded-2xl bg-olive text-cream px-8 py-10 text-center">
            <p className="font-serif text-2xl italic">
              Cultivé près d&rsquo;ici quand c&rsquo;est possible, choisi avec
              soin lorsque ça ne l&rsquo;est pas.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

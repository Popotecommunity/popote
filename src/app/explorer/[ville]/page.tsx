import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ExplorerClient from "@/components/site/ExplorerClient";
import {
  getCityBySlug,
  getPublishedAddressesByCity,
  getCategories,
  getCriteria,
} from "@/lib/data";

export default async function ExplorerPage({
  params,
}: PageProps<"/explorer/[ville]">) {
  const { ville } = await params;

  const city = await getCityBySlug(ville).catch(() => null);
  if (!city) notFound();

  const [addresses, categories, criteria] = await Promise.all([
    getPublishedAddressesByCity(ville).catch(() => []),
    getCategories().catch(() => []),
    getCriteria().catch(() => []),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <ExplorerClient
          city={city}
          addresses={addresses}
          categories={categories}
          criteria={criteria}
        />
      </main>
      <Footer />
    </>
  );
}

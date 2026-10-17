import type { Metadata } from "next";
import PageBuilder from "@/src/components/PageBuilder";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export const metadata: Metadata = {
  title: "BonVoyage · Page Builder",
  description: "Generatore di sezioni basato sui token del Design System",
};

export default function PageBuilderPage() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <main className="flex min-h-svh flex-col bg-light">
        <Navbar />
        <section className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="flex max-w-xl flex-col items-center gap-4 text-center">
            <span className="text-badge font-semibold uppercase text-muted">
              Strumento di sviluppo
            </span>
            <h1 className="text-heading font-bold text-dark">
              Page Builder non disponibile in produzione
            </h1>
            <p className="text-base text-muted">
              Il generatore di pagine scrive file sul filesystem locale ed è
              attivo solo in ambiente di sviluppo. Avvia il progetto con{" "}
              <code className="rounded-card bg-dark px-2 py-1 text-badge text-light">
                npm run dev
              </code>{" "}
              e visita{" "}
              <code className="rounded-card bg-dark px-2 py-1 text-badge text-light">
                localhost:3000/page-builder
              </code>
              .
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return <PageBuilder />;
}

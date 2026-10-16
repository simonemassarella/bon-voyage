import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BonVoyage · Prenota",
  description: "Conferma la tua prenotazione BonVoyage",
};

interface BookPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstParam(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

async function BookingContent({ searchParams }: BookPageProps) {
  const params = await searchParams;
  const destinazione = firstParam(params.destinazione, "Maldive, Atollo di Malé");
  const prezzo = firstParam(params.prezzo, "da 1.200€");

  return (
    <div className="grid w-full gap-6 sm:grid-cols-[1fr_1.4fr]">
      {/* Riepilogo viaggio */}
      <aside className="flex h-fit flex-col rounded-card bg-dark p-6 shadow-md">
        <span className="w-fit rounded-button bg-success px-3 py-1 text-badge font-semibold text-light">
          Conferma richiesta
        </span>
        <h1 className="mt-4 text-heading font-bold text-light">{destinazione}</h1>
        <p className="mt-2 text-base text-light/70">7 Notti • Volo Incluso</p>
        <div className="mt-6 border-t border-light/10 pt-4">
          <p className="text-badge font-semibold uppercase tracking-wide text-light/60">
            Prezzo totale
          </p>
          <p className="mt-1 text-heading font-bold text-light">{prezzo}</p>
          <p className="mt-1 text-badge text-muted">Tasse e bagaglio inclusi</p>
        </div>
      </aside>

      {/* Form di conferma */}
      <form className="flex flex-col gap-4 rounded-card bg-light p-6 shadow-md">
        <h2 className="text-heading font-bold text-dark">Dati di prenotazione</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="nome"
            placeholder="Nome e cognome"
            required
            className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
          />
          <input
            type="date"
            name="partenza"
            aria-label="Data di partenza"
            required
            className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
          />
          <select
            name="viaggiatori"
            aria-label="Numero di viaggiatori"
            defaultValue="2"
            className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none focus:border-brand"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} viaggiator{n === 1 ? "e" : "i"}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="note"
          rows={3}
          placeholder="Note o richieste speciali (opzionale)"
          className="resize-none rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-button bg-brand py-2.5 text-base font-semibold text-light transition-opacity hover:opacity-90"
        >
          Conferma prenotazione
        </button>
        <p className="text-center text-badge text-muted">
          Nessun addebito ora: ti contatteremo per finalizzare il pagamento.
        </p>
      </form>
    </div>
  );
}

export default function BookPage({ searchParams }: BookPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <header className="border-b border-muted/10 bg-light px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="text-heading font-bold text-dark">
            BonVoyage
          </Link>
          <Link
            href="/"
            className="text-base font-semibold text-brand transition-opacity hover:opacity-80"
          >
            ← Torna alle destinazioni
          </Link>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-4xl flex-1 items-center px-6 py-12">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center py-24 text-base text-muted">
              Caricamento riepilogo…
            </div>
          }
        >
          <BookingContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

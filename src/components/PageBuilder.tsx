"use client";

import { useState } from "react";
import {
  BLOCK_COMPONENTS,
  resolvePrompt,
} from "@/src/components/page-builder/blocks";
import {
  HOME_COMPONENTS,
  type RegistryEntry,
} from "@/src/components/page-builder/home-blocks";

const EXAMPLE_PROMPTS = [
  "Crea una sezione recensioni con 3 card di viaggiatori soddisfatti",
  "Crea una sezione contatti con una mappa finta e un form",
  "Crea una hero con un'offerta estiva",
  "Crea una sezione offerta estiva con sconti",
  "Crea una sezione con i loghi dei partner",
  "Crea una griglia di destinazioni",
  "Crea una sezione prezzi con 3 pacchetti",
  "Crea una sezione FAQ",
];

const OUTPUT_CONTRACT = `<DestinationCard
  title="Kyoto"
  price="1.500€"
  description="5 Notti"
  bgVariant="light"
  borderRadius="card"
/>`;

const REMOVE_INTENT = /rimuov|elimin|togli|cancell/i;
const MOVE_TOP = /in cima|in alto|all'inizio|per prim/i;
const MOVE_BOTTOM = /in fondo|in basso|alla fine|per ultim/i;

export default function PageBuilder() {
  const [prompt, setPrompt] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [blocks, setBlocks] = useState<string[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [removingKey, setRemovingKey] = useState<string | null>(null);

  const registry: Record<string, RegistryEntry> =
    loadedSlug === "/" ? HOME_COMPONENTS : BLOCK_COMPONENTS;
  const [exportState, setExportState] = useState<
    "idle" | "saving" | "done" | "error"
  >("idle");
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);

  const generate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setExportState("idle");
    setExportedUrl(null);
    const matched: string[] = resolvePrompt(prompt).filter(
      (key) => key in registry,
    );
    setTimeout(() => {
      setBlocks((prev) => {
        if (prev !== null && REMOVE_INTENT.test(prompt)) {
          return prev.filter((key) => !matched.includes(key));
        }
        if (
          prev !== null &&
          (MOVE_TOP.test(prompt) || MOVE_BOTTOM.test(prompt)) &&
          matched.length > 0
        ) {
          const moving = prev.filter((key) => matched.includes(key));
          const rest = prev.filter((key) => !matched.includes(key));
          return MOVE_TOP.test(prompt)
            ? [...moving, ...rest]
            : [...rest, ...moving];
        }
        if (prev !== null) {
          return [...prev, ...matched.filter((key) => !prev.includes(key))];
        }
        return matched;
      });
      setIsGenerating(false);
    }, 600);
  };

  const loadPage = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadError(null);
    try {
      const slug = pageSlug.trim().toLowerCase();
      const res = await fetch(
        `/api/save-component?slug=${encodeURIComponent(slug)}`,
      );
      const data = await res.json();
      if (res.ok) {
        setBlocks(data.componentsList);
        setLoadedSlug(data.slug);
        setExportState("idle");
        setExportedUrl(null);
      } else {
        setLoadError(data.error ?? "Errore di caricamento");
      }
    } catch {
      setLoadError("Errore di rete");
    } finally {
      setIsLoading(false);
    }
  };

  const removeBlock = async (key: string) => {
    if (removingKey) return;
    setRemovingKey(key);
    setLoadError(null);
    const slug =
      loadedSlug !== null && loadedSlug !== "/"
        ? loadedSlug
        : pageSlug.trim().toLowerCase();
    try {
      const res = await fetch("/api/save-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageSlug: slug || undefined, remove: key }),
      });
      const data = await res.json();
      if (res.ok) {
        setBlocks(data.componentsList);
      } else {
        setLoadError(data.error ?? "Errore durante la rimozione");
      }
    } catch {
      setLoadError("Errore di rete");
    } finally {
      setRemovingKey(null);
    }
  };

  const exportComponent = async () => {
    if (!blocks?.length || exportState === "saving") return;
    setExportState("saving");
    try {
      const res = await fetch("/api/save-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageSlug: pageSlug.trim() || undefined,
          componentsList: blocks,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setExportState("done");
        setExportedUrl(data.url ?? null);
      } else {
        setExportState("error");
      }
    } catch {
      setExportState("error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <header className="flex items-center gap-3 border-b border-muted/10 bg-light px-6 py-4 shadow-sm">
        <span className="h-3 w-3 rounded-button bg-brand" aria-hidden="true" />
        <h1 className="text-heading font-bold text-dark">
          BonVoyage <span className="font-normal text-muted">· Page Builder</span>
        </h1>
      </header>

      <div className="grid flex-1 gap-6 p-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="flex h-fit flex-col gap-4 rounded-card bg-light p-6 shadow-md">
          <label
            htmlFor="prompt"
            className="text-badge font-semibold uppercase tracking-wide text-muted"
          >
            Descrivi la sezione da generare
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            placeholder='Es. "Crea una sezione recensioni con 3 card di viaggiatori soddisfatti"'
            className="w-full resize-y rounded-card border border-muted/30 bg-slate-50 p-4 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="page-slug"
              className="text-badge font-semibold uppercase tracking-wide text-muted"
            >
              URL della Pagina
            </label>
            <div className="flex items-center gap-2">
              <span className="text-base text-muted">/</span>
              <input
                id="page-slug"
                type="text"
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                placeholder="es. offerte-estate"
                className="min-w-0 flex-1 rounded-card border border-muted/30 bg-slate-50 px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
              />
            </div>
            <button
              type="button"
              onClick={loadPage}
              disabled={isLoading}
              className="w-fit rounded-button border border-muted/30 px-4 py-1.5 text-badge font-semibold text-dark transition-colors hover:border-brand disabled:opacity-50"
            >
              {isLoading ? "Caricamento…" : "Carica Pagina Esistente"}
            </button>
            {loadError ? (
              <p className="text-badge font-semibold text-brand">{loadError}</p>
            ) : (
              <p className="text-badge text-muted">
                Vuoto o «home» = homepage reale. Compilato = pagina nuova o
                esistente da caricare.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={generate}
            disabled={!prompt.trim() || isGenerating}
            className="rounded-button bg-brand px-5 py-2.5 text-base font-semibold text-light transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? "Generazione…" : "Genera Interfaccia"}
          </button>

          <div className="flex flex-col gap-2">
            <p className="text-badge font-semibold uppercase tracking-wide text-muted">
              Prompt suggeriti
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="rounded-button border border-muted/30 px-3 py-1 text-badge text-dark transition-colors hover:border-brand"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-badge font-semibold uppercase tracking-wide text-muted">
              Contratto di output
            </p>
            <p className="text-badge text-muted">
              Il generatore non produce HTML libero: assembla istanze dei
              componenti popolando solo props rigide validate da tokens.json.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(BLOCK_COMPONENTS).map(({ label }) => (
                <span
                  key={label}
                  className="rounded-button border border-muted/30 px-2 py-0.5 text-badge text-muted"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-badge text-muted">
              Su una pagina caricata, «rimuovi X» o «sposta X in fondo»
              riscrivono il file eliminando solo quel blocco, senza toccare
              il resto del codice.
            </p>
            <pre className="overflow-x-auto rounded-card bg-dark p-3 text-badge text-light">
              {OUTPUT_CONTRACT}
            </pre>
          </div>
        </aside>

        <section className="flex min-h-[480px] flex-col rounded-card bg-light p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-badge font-semibold uppercase tracking-wide text-muted">
              Anteprima
            </p>
            {blocks && blocks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {loadedSlug && (
                  <span className="rounded-button bg-dark px-3 py-1 text-badge font-semibold text-light">
                    Modifica: {loadedSlug}
                  </span>
                )}
                {blocks.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => removeBlock(key)}
                    title={`Rimuovi ${registry[key]?.label ?? key}`}
                    className="rounded-button bg-success px-3 py-1 text-badge font-semibold text-light transition-opacity hover:opacity-80"
                  >
                    {registry[key]?.label ?? key} ×
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex-1 rounded-card border border-dashed border-muted/30 bg-slate-50 p-6">
            {blocks === null && (
              <div className="flex h-full min-h-64 items-center justify-center text-center">
                <p className="max-w-xs text-base text-muted">
                  Scrivi un prompt e premi{" "}
                  <span className="font-semibold text-dark">Genera Interfaccia</span>{" "}
                  per assemblare la pagina con i componenti del Design System.
                </p>
              </div>
            )}

            {blocks !== null && blocks.length === 0 && (
              <div className="flex h-full min-h-64 items-center justify-center text-center">
                <p className="max-w-xs text-base text-muted">
                  Nessun blocco riconosciuto. Prova con parole chiave come{" "}
                  <span className="font-semibold text-dark">
                    recensioni, contatti, destinazioni, prezzi, hero, faq
                  </span>
                  .
                </p>
              </div>
            )}

            {blocks !== null && blocks.length > 0 && (
              <div className="flex flex-col gap-8">
                {blocks.map((key) => {
                  const entry = registry[key];
                  if (!entry) return null;
                  const { Component, label } = entry;
                  return (
                    <div
                      key={key}
                      className="group relative rounded-card border border-transparent transition-colors hover:border-brand"
                    >
                      <button
                        type="button"
                        onClick={() => removeBlock(key)}
                        disabled={removingKey === key}
                        title={`Rimuovi ${label}`}
                        aria-label={`Rimuovi ${label}`}
                        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-button bg-dark text-badge font-bold text-light opacity-0 shadow-md transition-opacity hover:opacity-90 group-hover:opacity-100 disabled:opacity-50"
                      >
                        ×
                      </button>
                      <Component />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {blocks !== null && blocks.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-badge text-muted">
                {exportState === "done" && exportedUrl ? (
                  <>
                    Esportato!{" "}
                    <a
                      href={exportedUrl}
                      className="font-semibold text-brand underline underline-offset-2 hover:opacity-80"
                    >
                      Vai alla tua nuova pagina: {exportedUrl}
                    </a>
                  </>
                ) : exportState === "error" ? (
                  "Errore durante l'esportazione del file."
                ) : (
                  "Lascia l'URL vuoto per aggiornare la homepage"
                )}
              </p>
              <button
                type="button"
                onClick={exportComponent}
                disabled={exportState === "saving"}
                className="rounded-button bg-brand px-5 py-2 text-base font-semibold text-light transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {exportState === "saving"
                  ? "Esportazione…"
                  : pageSlug.trim()
                    ? "Genera Nuova Pagina"
                    : "Esporta Componente nella Homepage"}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

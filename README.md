# BonVoyage

Piattaforma di viaggi con Design System token-driven e **Page Builder** interno: le pagine vengono assemblate, modificate ed eliminate via prompt testuale, con scrittura fisica dei file sul filesystem.

Stack: **Next.js 16** (App Router, Turbopack, Cache Components) · **React 19** · **Tailwind CSS v4** · **TypeScript** strict.

## Avvio rapido

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # build di produzione
npm run lint         # eslint
npx tsc --noEmit     # typecheck
```

## Design Tokens

`tokens.json` è la **single source of truth** del brand (colori, radius, dimensioni testo, font). Modificandolo, l'intera UI si aggiorna senza toccare i componenti.

```
tokens.json ──▶ tailwind.config.ts (importa il JSON)
                     │
                     ▼
        @config "../tailwind.config.ts" in app/globals.css
                     │
                     ▼
     classi semantiche: bg-brand, text-dark, text-muted,
     bg-success, bg-light, rounded-card, rounded-button,
     text-badge, text-base, text-heading
```

> **Nota Tailwind v4**: niente `tailwind.config` auto-caricato — il file TS viene agganciato da `globals.css` via `@config`. I cambiamenti a `tokens.json` propagano in HMR perché il JSON è una dipendenza del config.

## Props rigide (stile Serenis)

I componenti non accettano classi Tailwind arbitrarie: solo props tipizzate derivate dal JSON (`src/types/design-system.ts`):

```ts
export type BrandColor = keyof typeof tokens.global.color;   // "brand" | "success" | "dark" | "muted" | "light"
export type CardRadius = keyof typeof tokens.global.size.radius; // "card" | "button"
```

```tsx
<DestinationCard
  title="Kyoto" price="1.500€" description="9 Notti"
  bgVariant="light" borderRadius="card"   // ← violazioni = errore TS
/>
```

Le varianti vengono mappate tramite lookup con classi letterali (`BG_VARIANTS`, `RADIUS_CLASSES`…), perché Tailwind scansiona solo stringhe statiche — `bg-${variant}` non genererebbe CSS.

## Rotte

| Rotta | Descrizione |
|---|---|
| `/` | Landing page (Navbar, Hero + SearchBar, Destinazioni, Recensioni, Footer) |
| `/book` | Pagina di prenotazione con riepilogo via query params (`?destinazione=…&prezzo=…`) |
| `/page-builder` | Generatore di pagine/sezioni via prompt |
| `/<slug>` | Pagine create dal builder (`offerte-estate`, `storie-clienti`, `homepage`…) |

## Page Builder

Prompt testuale → `resolvePrompt()` mappa keyword (regex IT/EN) → chiavi di blocco → il registry renderizza componenti pre-strutturati. Nessun HTML libero, niente `dangerouslySetInnerHTML`.

**Blocchi**: `hero`, `promo`, `reviews`, `destinations`, `pricing`, `contacts`, `partners`, `faq` (+ `generated` solo sulla home).

**Comandi supportati** (su una pagina caricata o in preview):

- `"aggiungi X"` / prompt normale → merge dei blocchi riconosciuti (deduplicati)
- `"rimuovi X"`, `"elimina X"` → filtra quel blocco
- `"sposta X in cima / in fondo"` → riordina
- Hover su un blocco → pulsante `×` per rimozione diretta dal file
- Campo **URL della Pagina**: `home` o vuoto = homepage reale (`app/page.tsx`); uno slug = `app/<slug>/page.tsx`

### Homepage come file builder

`app/page.tsx` usa lo stesso formato dei file generati (`const BLOCKS = [...] as const` + registry `HOME_COMPONENTS` in `src/components/page-builder/home-blocks.tsx`), così il builder la carica e modifica come qualsiasi pagina. `HOME_COMPONENTS` estende il registry base con le sezioni home-specifiche (hero con SearchBar, griglia destinazioni con link a `/book`) e wrappa i blocchi generici in una `Band` centrata.

## API

`POST/GET /api/save-component` (`app/api/save-component/route.ts`)

```ts
// Lettura blocchi di una pagina
GET /api/save-component?slug=offerte-estate   // slug "" o "home" → homepage
→ { ok, slug, componentsList }

// Crea/sovrascrive una pagina
POST { pageSlug: "offerte-estate", componentsList: ["hero","faq"] }
→ { ok, url: "/offerte-estate" }              // slug vuoto/home → app/page.tsx

// Rimuove un blocco dal file
POST { pageSlug: "offerte-estate", remove: "faq" }
→ { ok, url, componentsList }                  // lista aggiornata
```

Validazione server-side: slug `^[a-z0-9-]+$` (anti path-traversal), slug riservati (`api`, `book`, `page-builder`), chiavi ammesse solo dal registry corretto. **Dev-only**: su hosting serverless (Vercel) il filesystem è read-only — le scritture falliscono in produzione.

## Struttura

```
tokens.json                     # design tokens (single source of truth)
rules.md                        # regole di brand per componente
tailwind.config.ts              # tokens → theme Tailwind
app/
  page.tsx                      # homepage (formato builder)
  layout.tsx                    # font Plus Jakarta Sans
  globals.css                   # @config + @theme (font)
  book/                         # prenotazione
  page-builder/                 # UI del builder
  api/save-component/           # GET/POST filesystem
  <slug>/                       # pagine generate
src/
  types/design-system.ts        # union types derivati da tokens.json + mappe classi
  components/                   # Navbar, Footer, SearchBar, DestinationCard,
                                # PartnerSection, GeneratedSection, PageBuilder
  components/page-builder/
    blocks.tsx                  # registry blocchi + matcher prompt
    home-blocks.tsx             # registry homepage (band wrapper + sezioni home)
```

## Deploy

Repo: [github.com/simonemassarella/bon-voyage](https://github.com/simonemassarella/bon-voyage). Importabile su Vercel senza configurazione (framework rilevato). Limitazione: l'API di scrittura file funziona solo in dev — vedi sopra.

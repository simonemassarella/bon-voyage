import type { ComponentType } from "react";
import DestinationCard, {
  type DestinationCardProps,
} from "@/src/components/DestinationCard";
import PartnerSection from "@/src/components/PartnerSection";

export type BlockKey =
  | "hero"
  | "promo"
  | "reviews"
  | "destinations"
  | "pricing"
  | "contacts"
  | "partners"
  | "faq";

const BLOCK_MATCHERS: { key: BlockKey; patterns: RegExp[] }[] = [
  {
    key: "hero",
    patterns: [/hero/i, /banner/i, /copertina/i, /intestazione/i, /jumbotron/i],
  },
  {
    key: "promo",
    patterns: [/offert/i, /scont/i, /promo/i, /saldi/i, /deal/i],
  },
  {
    key: "reviews",
    patterns: [/recension/i, /review/i, /testimonial/i, /opinion/i, /feedback/i, /viaggiator/i],
  },
  {
    key: "destinations",
    patterns: [/destinazion/i, /tour/i, /itinerar/i, /maldive|santorini|bali/i, /card.*(mare|volo|hotel)/i],
  },
  {
    key: "pricing",
    patterns: [/prezz/i, /pricing/i, /pacchett/i, /tariff/i],
  },
  {
    key: "contacts",
    patterns: [/contatt/i, /contact/i, /mappa/i, /form/i, /email/i, /newsletter/i],
  },
  {
    key: "partners",
    patterns: [/partner/i, /affiliat/i, /sponsor/i, /loghi/i],
  },
  {
    key: "faq",
    patterns: [/faq/i, /domande/i, /dubbi/i, /frequenti/i],
  },
];

export function resolvePrompt(prompt: string): BlockKey[] {
  return BLOCK_MATCHERS.filter((block) =>
    block.patterns.some((pattern) => pattern.test(prompt)),
  ).map((block) => block.key);
}

function HeroSection() {
  return (
    <section className="rounded-card bg-dark p-8">
      <span className="rounded-button bg-brand px-3 py-1 text-badge font-semibold text-light">
        Offerta Estate
      </span>
      <h3 className="mt-4 max-w-md text-heading font-bold text-light">
        Esplora il mondo con BonVoyage
      </h3>
      <p className="mt-2 max-w-md text-base text-light/70">
        Pacchetti su misura, voli inclusi e assistenza dedicata per le tue prossime vacanze.
      </p>
      <button
        type="button"
        className="mt-5 rounded-button bg-brand px-5 py-2 text-base font-semibold text-light transition-opacity hover:opacity-90"
      >
        Prenota ora
      </button>
    </section>
  );
}

function PromoSection() {
  return (
    <section className="rounded-card bg-brand p-8">
      <span className="rounded-button bg-light px-3 py-1 text-badge font-semibold text-brand">
        Offerta Estate
      </span>
      <h3 className="mt-4 max-w-md text-heading font-bold text-light">
        -30% sulle destinazioni selezionate
      </h3>
      <p className="mt-2 max-w-md text-base text-light/80">
        Prenota entro il 31 agosto: volo, hotel ed escursioni inclusi nel
        prezzo scontato.
      </p>
      <button
        type="button"
        className="mt-5 rounded-button bg-dark px-5 py-2 text-base font-semibold text-light transition-opacity hover:opacity-90"
      >
        Scopri le offerte
      </button>
    </section>
  );
}

const REVIEWS = [
  { name: "Giulia R.", trip: "Maldive", initials: "GR", text: "Organizzazione impeccabile e resort da sogno. Torneremo sicuramente!" },
  { name: "Marco T.", trip: "Santorini", initials: "MT", text: "Volo e hotel perfetti, zero pensieri. Il team BonVoyage è stato super." },
  { name: "Elena B.", trip: "Bali", initials: "EB", text: "Itinerario curato nei minimi dettagli. La guida locale era fantastica." },
];

export function ReviewsSection() {
  return (
    <section>
      <h3 className="text-heading font-bold text-dark">Cosa dicono i nostri viaggiatori</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {REVIEWS.map((review) => (
          <article key={review.name} className="rounded-card bg-light p-5 shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-badge font-bold text-light">
                {review.initials}
              </span>
              <div>
                <p className="text-base font-semibold text-dark">{review.name}</p>
                <p className="text-badge text-muted">{review.trip}</p>
              </div>
            </div>
            <p className="mt-3 text-brand" aria-label="5 stelle">★★★★★</p>
            <p className="mt-2 text-base text-muted">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const GENERATED_DESTINATIONS: DestinationCardProps[] = [
  {
    title: "Maldive, Atollo di Malé",
    description: "7 Notti • Volo Incluso",
    price: "da 1.200€",
    badgeText: "Disponibile Ora",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    imageAlt: "Laguna turchese con bungalow sulle Maldive",
    bgVariant: "light",
    borderRadius: "card",
  },
  {
    title: "Santorini, Grecia",
    description: "5 Notti • Volo Incluso",
    price: "da 890€",
    badgeText: "-20%",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    imageAlt: "Case bianche e cupole blu di Santorini",
    bgVariant: "light",
    borderRadius: "card",
  },
  {
    title: "Bali, Indonesia",
    description: "10 Notti • Volo Incluso",
    price: "da 1.450€",
    badgeText: "Ultimi posti",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    imageAlt: "Risaie e templi di Bali",
    bgVariant: "light",
    borderRadius: "card",
  },
];

function DestinationsSection() {
  return (
    <section>
      <h3 className="text-heading font-bold text-dark">Destinazioni in evidenza</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GENERATED_DESTINATIONS.map((props) => (
          <DestinationCard key={props.title} {...props} />
        ))}
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Essential", price: "da 499€", features: ["Volo A/R", "Hotel 3★", "Assistenza base"], highlight: false },
  { name: "Explorer", price: "da 899€", features: ["Volo A/R", "Hotel 4★", "2 Escursioni incluse"], highlight: true },
  { name: "Platinum", price: "da 1.599€", features: ["Volo A/R", "Resort 5★", "Tour privati"], highlight: false },
];

function PricingSection() {
  return (
    <section>
      <h3 className="text-heading font-bold text-dark">I nostri pacchetti</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-card bg-light p-5 shadow-md ${plan.highlight ? "ring-2 ring-brand" : ""}`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-4 rounded-button bg-success px-3 py-1 text-badge font-semibold text-light">
                Più scelto
              </span>
            )}
            <p className="text-badge font-semibold uppercase tracking-wide text-muted">{plan.name}</p>
            <p className="mt-2 text-heading font-bold text-dark">{plan.price}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {plan.features.map((feature) => (
                <li key={feature} className="text-base text-muted">• {feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 w-full rounded-button bg-brand py-2 text-base font-semibold text-light transition-opacity hover:opacity-90"
            >
              Scegli
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="relative min-h-56 overflow-hidden rounded-card bg-muted/15">
        <div className="absolute left-1/4 top-0 h-full w-6 -skew-x-12 bg-muted/25" />
        <div className="absolute left-0 top-1/3 h-5 w-full bg-muted/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand shadow-md">
            <span className="h-3 w-3 rounded-full bg-light" />
          </span>
        </div>
        <span className="absolute bottom-3 left-3 rounded-button bg-light px-2 py-1 text-badge text-muted shadow">
          Mappa fittizia
        </span>
      </div>
      <form className="flex flex-col gap-3 rounded-card bg-light p-5 shadow-md">
        <h3 className="text-heading font-bold text-dark">Contattaci</h3>
        <input
          type="text"
          placeholder="Nome"
          className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
        />
        <textarea
          placeholder="Messaggio"
          rows={3}
          className="resize-none rounded-card border border-muted/30 bg-transparent px-3 py-2 text-base text-dark outline-none placeholder:text-muted focus:border-brand"
        />
        <button
          type="button"
          className="rounded-button bg-brand py-2 text-base font-semibold text-light transition-opacity hover:opacity-90"
        >
          Invia
        </button>
      </form>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "Il volo è sempre incluso nei pacchetti?", a: "Sì, tutti i pacchetti BonVoyage includono volo di andata e ritorno e bagaglio a mano." },
  { q: "Posso cancellare gratuitamente?", a: "Cancellazione gratuita fino a 30 giorni prima della partenza su tutte le destinazioni." },
  { q: "Offrite assicurazione di viaggio?", a: "L'assicurazione medico-bagaglio è inclusa nei pacchetti Explorer e Platinum." },
];

function FaqSection() {
  return (
    <section>
      <h3 className="text-heading font-bold text-dark">Domande frequenti</h3>
      <div className="mt-4 divide-y divide-muted/20 rounded-card bg-light px-5 shadow-md">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="cursor-pointer list-none text-base font-semibold text-dark">
              {item.q}
            </summary>
            <p className="mt-2 text-base text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const BLOCK_COMPONENTS: Record<BlockKey, { label: string; Component: ComponentType }> = {
  hero: { label: "Hero", Component: HeroSection },
  promo: { label: "Promo", Component: PromoSection },
  reviews: { label: "Recensioni", Component: ReviewsSection },
  destinations: { label: "Destinazioni", Component: DestinationsSection },
  pricing: { label: "Pacchetti", Component: PricingSection },
  contacts: { label: "Contatti", Component: ContactsSection },
  partners: { label: "Partner", Component: PartnerSection },
  faq: { label: "FAQ", Component: FaqSection },
};

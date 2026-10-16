import DestinationCard, {
  type DestinationCardProps,
} from "@/src/components/DestinationCard";
import SearchBar from "@/src/components/SearchBar";
import type { ReactNode } from "react";
import GeneratedSection from "@/src/components/GeneratedSection";
import {
  BLOCK_COMPONENTS,
  ReviewsSection,
  type BlockKey,
} from "./blocks";

export interface RegistryEntry {
  label: string;
  Component: React.ComponentType;
}

const DESTINATIONS: DestinationCardProps[] = [
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
    title: "Parigi, Francia",
    description: "4 Notti • Volo Incluso",
    price: "da 450€",
    badgeText: "-15%",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    imageAlt: "Tour Eiffel al tramonto a Parigi",
    bgVariant: "light",
    borderRadius: "card",
  },
  {
    title: "Kyoto, Giappone",
    description: "9 Notti • Volo Incluso",
    price: "da 1.890€",
    badgeText: "Ultimi posti",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    imageAlt: "Tempio tradizionale e pagoda a Kyoto",
    bgVariant: "light",
    borderRadius: "card",
  },
];

function HomeHero() {
  return (
    <section className="flex flex-col items-center bg-slate-50 px-6 pb-16 pt-20 text-center">
      <span className="rounded-button bg-success px-3 py-1 text-badge font-semibold text-light">
        Estate 2026 · Sconti fino al -30%
      </span>
      <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-dark">
        Il tuo prossimo viaggio inizia da qui
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        Voli, hotel ed esperienze curate dal nostro team. Cerca la tua
        destinazione e parti senza pensieri.
      </p>
      <div className="mt-8 flex w-full justify-center">
        <SearchBar />
      </div>
    </section>
  );
}

function HomeDestinations() {
  return (
    <section id="destinazioni" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16">
      <p className="text-badge font-semibold uppercase tracking-wide text-brand">
        Esplora
      </p>
      <h2 className="mt-1 text-heading font-bold text-dark">
        Destinazioni in evidenza
      </h2>
      <div id="offerte" className="mt-8 grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((destination) => (
          <DestinationCard
            key={destination.title}
            {...destination}
            href={`/book?destinazione=${encodeURIComponent(destination.title)}&prezzo=${encodeURIComponent(destination.price)}`}
          />
        ))}
      </div>
    </section>
  );
}

function HomeReviews() {
  return (
    <section id="recensioni" className="scroll-mt-20 bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <ReviewsSection />
      </div>
    </section>
  );
}

function Band({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>;
}

function wrapped(key: BlockKey): RegistryEntry {
  const { Component, label } = BLOCK_COMPONENTS[key];
  function WrappedBlock() {
    return (
      <Band>
        <Component />
      </Band>
    );
  }
  return { label, Component: WrappedBlock };
}

export const HOME_COMPONENTS: Record<string, RegistryEntry> = {
  ...BLOCK_COMPONENTS,
  pricing: wrapped("pricing"),
  promo: wrapped("promo"),
  contacts: wrapped("contacts"),
  faq: wrapped("faq"),
  hero: { label: "Hero + Ricerca", Component: HomeHero },
  destinations: { label: "Destinazioni", Component: HomeDestinations },
  reviews: { label: "Recensioni", Component: HomeReviews },
  generated: { label: "Sezione generata", Component: GeneratedSection },
};

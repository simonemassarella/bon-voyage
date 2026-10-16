// Auto-generato dal Page Builder BonVoyage — non modificare a mano.
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { HOME_COMPONENTS } from "@/src/components/page-builder/home-blocks";

export const metadata: Metadata = {
  title: "BonVoyage",
  description: "Voli, hotel ed esperienze curate dal nostro team.",
};

const BLOCKS = ["hero","destinations","reviews","partners","promo"] as const;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-light font-sans">
      <Navbar />
      <main className="flex-1">
        {BLOCKS.map((key: string) => {
          const { Component } = HOME_COMPONENTS[key];
          return <Component key={key} />;
        })}
      </main>
      <Footer />
    </div>
  );
}

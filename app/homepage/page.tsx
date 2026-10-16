// Auto-generato dal Page Builder BonVoyage — non modificare a mano.
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { BLOCK_COMPONENTS } from "@/src/components/page-builder/blocks";

export const metadata: Metadata = {
  title: "BonVoyage · homepage",
};

const BLOCKS = ["hero"] as const;

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-light font-sans">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16">
        {BLOCKS.map((key) => {
          const { Component } = BLOCK_COMPONENTS[key];
          return <Component key={key} />;
        })}
      </main>
      <Footer />
    </div>
  );
}

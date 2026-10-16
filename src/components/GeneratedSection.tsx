// Auto-generato dal Page Builder BonVoyage — non modificare a mano.
import {
  BLOCK_COMPONENTS,
  type BlockKey,
} from "@/src/components/page-builder/blocks";

const BLOCKS = [] as const;

export default function GeneratedSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      {BLOCKS.map((key: BlockKey) => {
        const { Component } = BLOCK_COMPONENTS[key];
        return <Component key={key} />;
      })}
    </section>
  );
}

import type { Metadata } from "next";
import PageBuilder from "@/src/components/PageBuilder";

export const metadata: Metadata = {
  title: "BonVoyage · Page Builder",
  description: "Generatore di sezioni basato sui token del Design System",
};

export default function PageBuilderPage() {
  return <PageBuilder />;
}

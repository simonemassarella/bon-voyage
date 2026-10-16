import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  BLOCK_COMPONENTS,
  type BlockKey,
} from "@/src/components/page-builder/blocks";
import { HOME_COMPONENTS } from "@/src/components/page-builder/home-blocks";

const VALID_BLOCKS = Object.keys(BLOCK_COMPONENTS) as BlockKey[];
const HOME_VALID_BLOCKS = Object.keys(HOME_COMPONENTS);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_SLUGS = new Set(["api", "book", "page-builder"]);
const BLOCKS_LIST_PATTERN = /const BLOCKS = (\[[^\]]*\]) as const;/;
const HOME_PAGE_FILE = path.join(process.cwd(), "app", "page.tsx");

function normalizeSlug(raw: string): string {
  return raw === "home" ? "" : raw;
}

function validBlocksFor(slug: string): string[] {
  return slug ? VALID_BLOCKS : HOME_VALID_BLOCKS;
}

function fileForSlug(slug: string): string {
  return slug
    ? path.join(process.cwd(), "app", slug, "page.tsx")
    : HOME_PAGE_FILE;
}

function sourceForSlug(slug: string, blocks: string[]): string {
  return slug ? buildPageSource(slug, blocks) : buildHomeSource(blocks);
}

function parseBlocks(source: string, valid: string[]): string[] | null {
  const match = source.match(BLOCKS_LIST_PATTERN);
  if (!match) return null;
  try {
    return (JSON.parse(match[1]) as string[]).filter((key) =>
      valid.includes(key),
    );
  } catch {
    return null;
  }
}

function buildHomeSource(blocks: string[]): string {
  return `// Auto-generato dal Page Builder BonVoyage — non modificare a mano.
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { HOME_COMPONENTS } from "@/src/components/page-builder/home-blocks";

export const metadata: Metadata = {
  title: "BonVoyage",
  description: "Voli, hotel ed esperienze curate dal nostro team.",
};

const BLOCKS = ${JSON.stringify(blocks)} as const;

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
`;
}

function buildPageSource(slug: string, blocks: string[]): string {
  const title = slug.replaceAll("-", " ");
  return `// Auto-generato dal Page Builder BonVoyage — non modificare a mano.
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import {
  BLOCK_COMPONENTS,
  type BlockKey,
} from "@/src/components/page-builder/blocks";

export const metadata: Metadata = {
  title: "BonVoyage · ${title}",
};

const BLOCKS = ${JSON.stringify(blocks)} as const;

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-light font-sans">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16">
        {BLOCKS.map((key: BlockKey) => {
          const { Component } = BLOCK_COMPONENTS[key];
          return <Component key={key} />;
        })}
      </main>
      <Footer />
    </div>
  );
}
`;
}

export async function GET(request: Request) {
  const raw =
    new URL(request.url).searchParams.get("slug")?.trim().toLowerCase() ?? "";
  const slug = normalizeSlug(raw);

  if (slug && !SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Slug non valido" }, { status: 400 });
  }

  try {
    const source = await readFile(fileForSlug(slug), "utf8");
    const componentsList = parseBlocks(source, validBlocksFor(slug));
    if (componentsList === null) {
      return NextResponse.json(
        { error: "La pagina non è stata generata dal Page Builder" },
        { status: 422 },
      );
    }
    return NextResponse.json({ ok: true, slug: slug || "/", componentsList });
  } catch {
    return NextResponse.json(
      { error: `Nessuna pagina trovata per '/${slug || ""}'` },
      { status: 404 },
    );
  }
}

export async function POST(request: Request) {
  let body: {
    pageSlug?: unknown;
    componentsList?: unknown;
    remove?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON non valido" }, { status: 400 });
  }

  const { pageSlug, componentsList, remove } = body;
  const rawSlug =
    typeof pageSlug === "string" ? pageSlug.trim().toLowerCase() : "";
  const slug = normalizeSlug(rawSlug);
  const valid = validBlocksFor(slug);

  if (slug && (!SLUG_PATTERN.test(slug) || slug.length > 50)) {
    return NextResponse.json(
      { error: "Slug non valido: usa solo lettere minuscole, numeri e '-'" },
      { status: 400 },
    );
  }
  if (RESERVED_SLUGS.has(slug)) {
    return NextResponse.json(
      { error: `Lo slug '${slug}' è riservato` },
      { status: 409 },
    );
  }

  if (typeof remove === "string") {
    if (!valid.includes(remove)) {
      return NextResponse.json(
        { error: `Blocco '${remove}' non valido`, validBlocks: valid },
        { status: 422 },
      );
    }
    try {
      const file = fileForSlug(slug);
      const current = parseBlocks(await readFile(file, "utf8"), valid);
      if (current === null) {
        return NextResponse.json(
          { error: "La pagina non è stata generata dal Page Builder" },
          { status: 422 },
        );
      }
      const next = current.filter((key) => key !== remove);
      await writeFile(file, sourceForSlug(slug, next), "utf8");
      return NextResponse.json({
        ok: true,
        url: slug ? `/${slug}` : "/",
        componentsList: next,
      });
    } catch {
      return NextResponse.json(
        { error: `Nessuna pagina trovata per '/${slug || ""}'` },
        { status: 404 },
      );
    }
  }

  if (
    !Array.isArray(componentsList) ||
    componentsList.length === 0 ||
    componentsList.length > 10 ||
    !componentsList.every(
      (key): key is string =>
        typeof key === "string" && valid.includes(key),
    )
  ) {
    return NextResponse.json(
      {
        error: "'componentsList' deve contenere solo blocchi validi",
        validBlocks: valid,
      },
      { status: 422 },
    );
  }
  const blocks = componentsList as string[];

  try {
    if (slug) {
      const dir = path.join(process.cwd(), "app", slug);
      await mkdir(dir, { recursive: true });
      await writeFile(
        path.join(dir, "page.tsx"),
        buildPageSource(slug, blocks),
        "utf8",
      );
      return NextResponse.json({ ok: true, url: `/${slug}` });
    }

    await writeFile(HOME_PAGE_FILE, buildHomeSource(blocks), "utf8");
    return NextResponse.json({ ok: true, url: "/" });
  } catch {
    return NextResponse.json(
      { error: "Errore durante la scrittura del file" },
      { status: 500 },
    );
  }
}

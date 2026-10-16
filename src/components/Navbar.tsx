import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-muted/10 bg-light/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-heading font-bold text-dark">
          BonVoyage
        </Link>
        <div className="hidden items-center gap-8 sm:flex">
          <Link href="/#destinazioni" className="text-base text-muted transition-colors hover:text-dark">
            Destinazioni
          </Link>
          <Link href="/#offerte" className="text-base text-muted transition-colors hover:text-dark">
            Offerte
          </Link>
          <Link href="/#recensioni" className="text-base text-muted transition-colors hover:text-dark">
            Recensioni
          </Link>
        </div>
        <Link
          href="/book"
          className="rounded-button bg-brand px-5 py-2 text-base font-semibold text-light transition-opacity hover:opacity-90"
        >
          Accedi
        </Link>
      </nav>
    </header>
  );
}

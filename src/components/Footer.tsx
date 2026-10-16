import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-dark px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-heading font-bold text-light">BonVoyage</p>
          <p className="mt-1 text-base text-muted">
            Viaggia meglio, vivi di più.
          </p>
        </div>
        <nav className="flex gap-6 text-base text-muted">
          <Link href="#" className="transition-colors hover:text-light">Privacy</Link>
          <Link href="#" className="transition-colors hover:text-light">Termini</Link>
          <Link href="#" className="transition-colors hover:text-light">Cookie</Link>
        </nav>
        <nav className="flex gap-4 text-base text-muted" aria-label="Social">
          <Link href="#" className="transition-colors hover:text-light">Instagram</Link>
          <Link href="#" className="transition-colors hover:text-light">X</Link>
          <Link href="#" className="transition-colors hover:text-light">Facebook</Link>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-light/10 pt-6 text-badge text-muted">
        © 2026 BonVoyage S.p.A. — Tutti i diritti riservati.
      </p>
    </footer>
  );
}

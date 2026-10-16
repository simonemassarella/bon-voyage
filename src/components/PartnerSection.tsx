import type { ReactNode } from "react";

interface PartnerSectionProps {
  title?: string;
}

function Icon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PARTNERS: { name: string; icon: ReactNode }[] = [
  {
    name: "Emirates",
    icon: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4z" />
      </>
    ),
  },
  {
    name: "Air France",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    name: "Hilton",
    icon: (
      <>
        <path d="M6 22V4h8v18" />
        <path d="M14 9h4v13" />
        <path d="M2 22h20" />
        <path d="M9 7h.01 M9 10h.01 M9 13h.01" />
      </>
    ),
  },
  {
    name: "Costa",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88z" />
      </>
    ),
  },
  {
    name: "Marriott",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
];

export default function PartnerSection({
  title = "I nostri partner di fiducia",
}: PartnerSectionProps) {
  return (
    <section className="w-full bg-light px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h3 className="text-center text-badge font-semibold uppercase tracking-wide text-muted">
          {title}
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PARTNERS.map((partner) => (
            <span
              key={partner.name}
              className="flex items-center gap-2 text-muted transition-colors hover:text-dark"
            >
              <Icon className="h-6 w-6">{partner.icon}</Icon>
              <span className="text-base font-semibold">{partner.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

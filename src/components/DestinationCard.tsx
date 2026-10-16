import Image from "next/image";
import Link from "next/link";
import {
  BG_VARIANTS,
  RADIUS_CLASSES,
  RADIUS_TOP_CLASSES,
  TEXT_COLOR_CLASSES,
  TEXT_ON_BG,
  type BrandColor,
  type CardRadius,
} from "@/src/types/design-system";

export interface DestinationCardProps {
  title: string;
  description: string;
  price: string;
  badgeText?: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel?: string;
  href?: string;
  bgVariant: BrandColor;
  borderRadius: CardRadius;
}

const CTA_CLASSES =
  "rounded-button bg-brand px-5 py-2 text-base font-semibold text-light transition-opacity hover:opacity-90";

export default function DestinationCard({
  title,
  description,
  price,
  badgeText,
  imageUrl,
  imageAlt,
  ctaLabel = "Scopri",
  href,
  bgVariant,
  borderRadius,
}: DestinationCardProps) {
  const onLightBg = bgVariant === "light";
  const titleClass = TEXT_COLOR_CLASSES[TEXT_ON_BG[bgVariant]];
  const detailClass = onLightBg ? "text-muted" : "text-light/70";

  return (
    <article
      className={`w-full max-w-sm overflow-hidden font-sans shadow-md ${BG_VARIANTS[bgVariant]} ${RADIUS_CLASSES[borderRadius]}`}
    >
      <div
        className={`relative h-52 w-full overflow-hidden ${RADIUS_TOP_CLASSES[borderRadius]}`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 384px) 100vw, 384px"
          className="object-cover"
          priority
        />
        {badgeText && (
          <span className="absolute left-3 top-3 rounded-button bg-success px-3 py-1 text-badge font-semibold text-light">
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-5">
        <h2 className={`text-heading font-bold ${titleClass}`}>{title}</h2>
        <p className={`text-base ${detailClass}`}>{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <p className={`text-heading font-bold ${titleClass}`}>{price}</p>
          {href ? (
            <Link href={href} className={CTA_CLASSES}>
              {ctaLabel}
            </Link>
          ) : (
            <button type="button" className={CTA_CLASSES}>
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

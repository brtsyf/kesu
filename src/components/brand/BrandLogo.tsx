import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/brand/kesu-logo.png";
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 555;

type BrandLogoProps = {
  className?: string;
  /** Visual width in CSS — height follows aspect */
  width?: number;
  priority?: boolean;
  /** Invert to white for dark backgrounds */
  inverted?: boolean;
  href?: string | null;
  label?: string;
};

export function BrandLogo({
  className,
  width = 120,
  priority = false,
  inverted = false,
  href = "/",
  label = "Kesu ana sayfa",
}: BrandLogoProps) {
  const height = Math.round((width * LOGO_HEIGHT) / LOGO_WIDTH);

  const image = (
    <Image
      src={LOGO_SRC}
      alt="Kesu"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn(
        "h-auto w-full object-contain",
        inverted ? "object-center brightness-0 invert" : "object-left",
      )}
      sizes={`${width}px`}
    />
  );

  const shell = (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ width, height }}
    >
      {image}
    </span>
  );

  if (href === null) {
    return (
      <span aria-label={label} className="inline-flex">
        {shell}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className="inline-flex shrink-0">
      {shell}
    </Link>
  );
}

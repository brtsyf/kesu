import { cn } from "@/lib/utils/cn";
import { resolveSocialPlatform } from "@/lib/social";
import type { SocialLink, SocialPlatform } from "@/lib/sanity/types";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="2.4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10.4V16.6M8 7.7v.2M11.4 16.6v-3.6c0-1 .6-1.6 1.5-1.6.9 0 1.5.6 1.5 1.6v3.6M16.2 11.4C17.3 11.4 18.5 12 18.5 14v2.6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
        <rect
          x="2.6"
          y="6.2"
          width="18.8"
          height="11.6"
          rx="3.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10.4 9.6v4.8L14.8 12 10.4 9.6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
      <path
        d="M14 6.2c.8 1.8 2.3 3 4.3 3.2V13c-1.5-.1-2.9-.6-4.3-1.5v5.2c0 3-2.4 4.8-5.2 4.8S3.5 19.7 3.5 16.8c0-3 2.5-4.9 5.4-4.9.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.2-.9-.2-1.4 0-2.4.9-2.4 2.2 0 1.3 1 2.2 2.4 2.2s2.4-.8 2.4-2.2V4.5H14v1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  variant?: "header" | "footer" | "page";
};

export function SocialLinks({
  links,
  className,
  variant = "header",
}: SocialLinksProps) {
  const items = links.filter(
    (link) => link.href && resolveSocialPlatform(link),
  );
  if (!items.length) return null;

  return (
    <nav
      aria-label="Sosyal medya"
      className={cn(
        "flex items-center",
        variant === "header" && "gap-0.5",
        variant === "footer" && "gap-4",
        variant === "page" && "flex-col items-start gap-3",
        className,
      )}
    >
      {items.map((link) => {
        const platform = resolveSocialPlatform(link);
        if (!platform) return null;
        const label = link.label || platform;
        return (
          <a
            key={`${platform}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "transition-colors duration-300",
              variant === "header" &&
                "inline-flex size-9 items-center justify-center text-[#1a1a1a]/45 hover:text-[#1a1a1a]",
              variant === "footer" &&
                "inline-flex size-9 items-center justify-center text-muted hover:text-foreground",
              variant === "page" &&
                "inline-flex items-center gap-2.5 text-[0.95rem] text-[#141414] hover:text-[#141414]/70",
            )}
          >
            <span
              className={cn(
                "shrink-0",
                variant === "page" ? "size-5" : "size-[1.25rem]",
                variant === "header" && "size-[1.35rem]",
              )}
            >
              <SocialIcon platform={platform} />
            </span>
            {variant === "page" ? <span>{label}</span> : null}
          </a>
        );
      })}
    </nav>
  );
}

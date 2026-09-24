import { cn } from "@/lib/utils/cn";
import { resolveSocialPlatform } from "@/lib/social";
import type { SocialLink, SocialPlatform } from "@/lib/sanity/types";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.33 2A3.47 3.47 0 0 0 4 7.47v9.06A3.47 3.47 0 0 0 7.47 20h9.06A3.47 3.47 0 0 0 20 16.53V7.47A3.47 3.47 0 0 0 16.53 4H7.47M17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
        />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.28v1.56h.05c.46-.87 1.58-1.79 3.25-1.79 3.48 0 4.12 2.29 4.12 5.26v6.42zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0"
        />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <path
          fill="currentColor"
          d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
      <path
        fill="currentColor"
        d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
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

import type { SocialLink, SocialPlatform } from "@/lib/sanity/types";

const PLATFORMS: SocialPlatform[] = [
  "instagram",
  "linkedin",
  "tiktok",
  "youtube",
];

const HOST: Record<SocialPlatform, RegExp> = {
  instagram: /instagram\.com/i,
  linkedin: /linkedin\.com/i,
  tiktok: /tiktok\.com/i,
  youtube: /youtube\.com|youtu\.be/i,
};

export function resolveSocialPlatform(
  link: Pick<SocialLink, "platform" | "label" | "href">,
): SocialPlatform | undefined {
  if (link.platform && PLATFORMS.includes(link.platform)) {
    return link.platform;
  }

  const haystack = `${link.label} ${link.href}`;
  return PLATFORMS.find(
    (platform) =>
      haystack.toLowerCase().includes(platform) || HOST[platform].test(link.href),
  );
}

export function socialLinksFromSettings(input?: {
  social?: {
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  socialLinks?: SocialLink[] | null;
}): SocialLink[] {
  const fromFields: SocialLink[] = [
    {
      platform: "instagram",
      label: "Instagram",
      href: input?.social?.instagram ?? "",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: input?.social?.linkedin ?? "",
    },
    {
      platform: "tiktok",
      label: "TikTok",
      href: input?.social?.tiktok ?? "",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: input?.social?.youtube ?? "",
    },
  ].filter((link) => Boolean(link.href));

  if (fromFields.length) return fromFields;
  return mergeSocialLinks([], input?.socialLinks);
}

export function mergeSocialLinks(
  seed: SocialLink[],
  cms?: SocialLink[] | null,
): SocialLink[] {
  const byPlatform = new Map<SocialPlatform, SocialLink>();

  for (const link of seed) {
    const platform = resolveSocialPlatform(link);
    if (!platform || !link.href) continue;
    byPlatform.set(platform, { ...link, platform });
  }

  for (const link of cms ?? []) {
    const platform = resolveSocialPlatform(link);
    if (!platform || !link.href) continue;
    byPlatform.set(platform, { ...link, platform });
  }

  return PLATFORMS.map((platform) => byPlatform.get(platform)).filter(
    (link): link is SocialLink => Boolean(link),
  );
}

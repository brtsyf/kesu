import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "./types";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function getImageUrl(
  image: SanityImage | undefined,
  width = 1200,
): string {
  if (!image) return "";
  if (image.url) return image.url;
  if (builder && image.asset) {
    return builder.image(image).width(width).auto("format").url();
  }
  return "";
}

export function getImageAlt(image: SanityImage | undefined, fallback = "") {
  return image?.alt?.trim() || fallback;
}

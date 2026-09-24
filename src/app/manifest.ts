import type { MetadataRoute } from "next";
import { SEO } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kesu",
    short_name: "Kesu",
    description: SEO.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf7",
    theme_color: "#fafaf7",
    lang: "tr",
    icons: [
      {
        src: "/brand/kesu-mark-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/kesu-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

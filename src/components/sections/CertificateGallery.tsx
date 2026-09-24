"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import type { CertificateItem } from "@/lib/sanity/types";

export function CertificateGallery({
  certificates,
}: {
  certificates: CertificateItem[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? certificates[active] : null;
  const currentSrc = current ? getImageUrl(current.image, 1800) : "";

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (!certificates.length) {
    return (
      <Reveal>
        <div className="rounded-[2rem] bg-white/70 px-8 py-16 text-center ring-1 ring-[#e8e4dc] md:px-12">
          <p className="text-[1.05rem] leading-relaxed text-[#6b6860]">
            Sertifika görselleri Sanity üzerinden eklendiğinde burada
            listelenecek.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((item, index) => {
          const src = getImageUrl(item.image, 1200);
          if (!src) return null;
          const alt = getImageAlt(item.image, item.title || "Kesu sertifikası");
          return (
            <Reveal key={`${src}-${index}`} delay={index * 0.04}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group w-full overflow-hidden rounded-[1.75rem] bg-white/70 text-left ring-1 ring-[#e8e4dc] transition-colors duration-400 hover:ring-[#141414]/20"
              >
                <div className="flex aspect-[4/5] items-center justify-center bg-[#f4f2ee] p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {item.title ? (
                  <p className="px-6 py-4 text-[0.95rem] font-medium tracking-[-0.02em] text-[#141414]">
                    {item.title}
                  </p>
                ) : null}
              </button>
            </Reveal>
          );
        })}
      </div>

      {current && currentSrc ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#141414]/72 px-5 py-10 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal
          aria-label={current.title || "Sertifika"}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="size-5" strokeWidth={1.6} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt={getImageAlt(current.image, current.title || "Kesu sertifikası")}
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

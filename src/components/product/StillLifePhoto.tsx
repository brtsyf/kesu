"use client";

import { useEffect, useRef, useState } from "react";

export function StillLifePhoto({
  src,
  alt,
  tint = "#f4f2ee",
}: {
  src?: string;
  alt: string;
  tint?: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [src]);

  return (
    <figure
      className="relative overflow-hidden rounded-[2.25rem] md:rounded-[2.75rem]"
      style={{ backgroundColor: tint }}
    >
      <div
        className="flex aspect-[4/5] w-full items-center justify-center"
        aria-hidden
      >
        {!ready ? (
          <p className="text-[0.82rem] tracking-[0.18em] text-[#b0aaa0] uppercase">
            Stüdyo
          </p>
        ) : null}
      </div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover object-[50%_40%] transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setReady(true)}
          onError={() => setReady(false)}
        />
      ) : null}
    </figure>
  );
}

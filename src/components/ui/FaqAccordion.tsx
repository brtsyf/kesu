"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { FaqItem } from "@/lib/sanity/types";

function FaqItemRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={id}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-base md:text-lg tracking-tight transition-colors hover:text-accent"
        >
          <span>{item.question}</span>
          <span
            aria-hidden
            className={cn(
              "text-muted transition-transform duration-500 ease-[var(--ease-premium)]",
              open && "rotate-45",
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={id}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 max-w-2xl text-muted text-[0.975rem] leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <FaqItemRow key={item.question} item={item} index={index} />
      ))}
    </div>
  );
}

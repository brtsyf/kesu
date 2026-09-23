"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { FaqItem } from "@/lib/sanity/types";

function FaqItemRow({
  item,
  index,
  tone = "default",
}: {
  item: FaqItem;
  index: number;
  tone?: "default" | "sage";
}) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;
  const sage = tone === "sage";

  return (
    <div
      className={cn(
        "border-b transition-colors",
        sage
          ? open
            ? "border-white/35"
            : "border-white/18"
          : open
            ? "border-accent/30"
            : "border-border",
      )}
    >
      <h3>
        <button
          type="button"
          id={id}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between gap-6 py-6 text-left text-base tracking-tight transition-colors md:text-lg",
            sage
              ? "text-[#f4f3ef] hover:text-white"
              : "hover:text-accent-deep",
          )}
        >
          <span>{item.question}</span>
          <span
            aria-hidden
            className={cn(
              "transition-transform duration-500 ease-[var(--ease-premium)]",
              sage
                ? open
                  ? "rotate-45 text-white"
                  : "text-[#f4f3ef]/70"
                : open
                  ? "rotate-45 text-accent-deep"
                  : "text-accent",
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
          <p
            className={cn(
              "max-w-2xl pb-6 text-[0.975rem] leading-relaxed",
              sage ? "text-[#f4f3ef]/75" : "text-muted",
            )}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({
  items,
  tone = "default",
}: {
  items: FaqItem[];
  tone?: "default" | "sage";
}) {
  return (
    <div>
      {items.map((item, index) => (
        <FaqItemRow
          key={item.question}
          item={item}
          index={index}
          tone={tone}
        />
      ))}
    </div>
  );
}

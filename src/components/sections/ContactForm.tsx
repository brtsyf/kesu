"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block">
        <span className="eyebrow mb-3 block">İsim</span>
        <input
          required
          name="name"
          className="w-full border-b border-border bg-transparent py-3 outline-none focus:border-foreground transition-colors"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-3 block">E-posta</span>
        <input
          required
          type="email"
          name="email"
          className="w-full border-b border-border bg-transparent py-3 outline-none focus:border-foreground transition-colors"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-3 block">Mesaj</span>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full border-b border-border bg-transparent py-3 outline-none focus:border-foreground transition-colors resize-none"
        />
      </label>
      {sent ? (
        <p className="text-sm text-accent" role="status">
          Mesajınız alındı. En kısa sürede dönüş yapacağız.
        </p>
      ) : (
        <Button type="submit">Gönder</Button>
      )}
    </form>
  );
}

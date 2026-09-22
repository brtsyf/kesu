# Kesu

Premium bakım / kozmetik markası için Next.js + Sanity CMS web sitesi.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Sanity CMS
- Framer Motion
- Lucide React

## Başlangıç

```bash
npm install
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## CMS

`.env.local` oluşturun:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SANITY_PROJECT_ID` boşsa site **seed data** ile çalışır. Project ID eklediğinizde içerik Sanity'den gelir.

## Rotalar

- `/` — Ana sayfa
- `/urunler` — Ürün listesi + filtre / arama
- `/urunler/[slug]` — Ürün detay
- `/hakkimizda` — Editorial about
- `/iletisim` — İletişim
- `/studio` — Sanity Studio

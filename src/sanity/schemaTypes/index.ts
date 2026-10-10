import { defineField, defineType } from "sanity";

export const seoFields = [
  defineField({
    name: "metaTitle",
    title: "SEO başlığı",
    type: "string",
  }),
  defineField({
    name: "metaDescription",
    title: "SEO açıklaması",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "ogImage",
    title: "Paylaşım görseli",
    type: "image",
    options: { hotspot: true },
  }),
];

function productCopyFields() {
  return [
    defineField({
      name: "tagline",
      title: "Kısa slogan",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa açıklama",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "benefits",
      title: "Faydalar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "usage",
      title: "Kullanım",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ingredients",
      title: "İçerikler",
      type: "array",
      of: [{ type: "string" }],
      description: "Boşsa Türkçe içerik kullanılır.",
    }),
    defineField({
      name: "eyebrow",
      title: "Üst satır",
      type: "string",
      description: "Ürün adının üstündeki kısa satır.",
    }),
    defineField({
      name: "lead",
      title: "Vurgu cümlesi",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Kısa giriş",
      type: "text",
      rows: 2,
    }),
  ];
}

function localeCopy(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: productCopyFields(),
  });
}

export const category = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 2,
    }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fieldsets: [
    {
      name: "detail",
      title: "Detay başlığı",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Ürün adı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa açıklama",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "thumbnail",
      title: "Kapak görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "images",
      title: "Ek görseller",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "ingredients",
      title: "İçerikler",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Faydalar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "usage",
      title: "Kullanım",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "volume",
      title: "Hacim",
      type: "string",
      description: "Örnek: 5 × 10 ml",
    }),
    defineField({
      name: "tagline",
      title: "Kısa slogan",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Üst satır",
      type: "string",
      description: "Ürün adının üstündeki kısa satır.",
      fieldset: "detail",
    }),
    defineField({
      name: "lead",
      title: "Vurgu cümlesi",
      type: "string",
      fieldset: "detail",
    }),
    defineField({
      name: "intro",
      title: "Kısa giriş",
      type: "text",
      rows: 2,
      fieldset: "detail",
    }),
    defineField({
      name: "translations",
      title: "Diğer diller",
      type: "object",
      description:
        "Yeni ürün eklerken İngilizce, Arapça ve Rusça metinleri buraya yazın. Şişe adlarını (Lifting, Eye, Hair…) çevirmeyin. Boş alan sitede Türkçe metne düşer.",
      options: { collapsible: true, collapsed: false },
      fields: [
        localeCopy("en", "İngilizce"),
        localeCopy("ar", "Arapça"),
        localeCopy("ru", "Rusça"),
      ],
    }),
    defineField({
      name: "cardTint",
      title: "Kart rengi",
      type: "string",
      description: "Örnek: #eef1ec",
    }),
    defineField({
      name: "featured",
      title: "Öne çıkan",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sıra",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: seoFields,
    }),
  ],
  orderings: [
    {
      title: "Sıra",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

export const socialMedia = defineType({
  name: "socialMedia",
  title: "Sosyal medya",
  type: "document",
  fields: [
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      description: "Örnek: https://www.instagram.com/kesu",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      description: "Örnek: https://www.linkedin.com/company/kesu",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",
      description: "Örnek: https://www.tiktok.com/@kesu",
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
      description: "Örnek: https://www.youtube.com/@kesu",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Sosyal medya hesapları" }),
  },
});

export const certificate = defineType({
  name: "certificate",
  title: "Sertifika",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sıra",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sıra",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Sertifika",
      media,
    }),
  },
});

export const schemaTypes = [
  product,
  category,
  certificate,
  socialMedia,
];

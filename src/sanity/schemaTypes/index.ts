import { defineField, defineType } from "sanity";

export const seoFields = [
  defineField({
    name: "metaTitle",
    title: "Meta Title",
    type: "string",
  }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "ogImage",
    title: "OG Image",
    type: "image",
    options: { hotspot: true },
  }),
];

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortDescription", type: "text", rows: 2 }),
    defineField({ name: "description", type: "text", rows: 6 }),
    defineField({ name: "price", type: "number", description: "Opsiyonel — vitrin sitesinde gösterilmez" }),
    defineField({ name: "comparePrice", type: "number" }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "images",
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
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "ingredients",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "usage", type: "text", rows: 3 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "seo",
      type: "object",
      fields: seoFields,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "content", type: "text", rows: 12 }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "logoText", type: "string" }),
    defineField({
      name: "navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "contact",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "string" }),
      ],
    }),
    defineField({ name: "footerContent", type: "text", rows: 3 }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "text", rows: 3 }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({
          name: "primaryCta",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "featuredEyebrow", type: "string" }),
    defineField({ name: "featuredTitle", type: "string" }),
    defineField({ name: "featuredDescription", type: "text" }),
    defineField({ name: "philosophyEyebrow", type: "string" }),
    defineField({ name: "philosophyTitle", type: "text" }),
    defineField({ name: "philosophyBody", type: "text" }),
    defineField({
      name: "philosophyImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "benefitsEyebrow", type: "string" }),
    defineField({ name: "benefitsTitle", type: "string" }),
    defineField({
      name: "benefits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "benefitImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "testimonial",
      type: "object",
      fields: [
        defineField({ name: "quote", type: "text" }),
        defineField({ name: "name", type: "string" }),
        defineField({ name: "product", type: "string" }),
      ],
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaTitle", type: "text" }),
    defineField({ name: "ctaDescription", type: "string" }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "string" }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "intro", type: "text" }),
    defineField({
      name: "storyBlocks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text" }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string" })],
            }),
            defineField({ name: "fullWidth", type: "boolean" }),
          ],
        },
      ],
    }),
    defineField({ name: "philosophyTitle", type: "string" }),
    defineField({ name: "philosophyBody", type: "text" }),
  ],
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "body", type: "text" }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const schemaTypes = [
  product,
  category,
  blogPost,
  page,
  homePage,
  aboutPage,
  siteSettings,
];

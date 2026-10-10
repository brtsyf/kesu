const productFields = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  images[]{..., "url": asset->url, alt},
  thumbnail{..., "url": asset->url, alt},
  category->{_id, title, "slug": slug.current, description},
  ingredients,
  benefits,
  usage,
  volume,
  tagline,
  eyebrow,
  lead,
  intro,
  translations {
    en { tagline, shortDescription, description, benefits, usage, ingredients, eyebrow, lead, intro },
    ar { tagline, shortDescription, description, benefits, usage, ingredients, eyebrow, lead, intro },
    ru { tagline, shortDescription, description, benefits, usage, ingredients, eyebrow, lead, intro }
  },
  cardTint,
  featured,
  order,
  seo
`;

export const productsQuery = `*[_type == "product"] | order(order asc, title asc) {${productFields}}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {${productFields}}`;

export const categoriesQuery = `*[_type == "category"] {
  _id,
  title,
  "slug": slug.current,
  description,
  "sortOrder": *[_type == "product" && references(^._id)] | order(order asc)[0].order
} | order(sortOrder asc, title asc)`;

export const socialMediaQuery = `*[_type == "socialMedia"][0] {
  instagram, linkedin, tiktok, youtube
}`;

export const certificatesQuery = `*[_type == "certificate"] | order(order asc, title asc) {
  title,
  image{..., "url": asset->url, alt}
}`;

export const legacyCertificatesQuery = `*[_type == "certificatesPage"][0] {
  certificates[]{
    title,
    image{..., "url": asset->url, alt}
  }
}`;

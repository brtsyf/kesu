export const productsQuery = `*[_type == "product"] | order(order asc, title asc) {
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
  cardTint,
  featured,
  order,
  seo
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
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
  cardTint,
  featured,
  order,
  seo
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id, title, "slug": slug.current, description
}`;

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

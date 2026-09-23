export const productsQuery = `*[_type == "product"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  price,
  comparePrice,
  images[]{..., "url": asset->url, alt},
  thumbnail{..., "url": asset->url, alt},
  category->{_id, title, "slug": slug.current, description},
  ingredients,
  benefits,
  usage,
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
  price,
  comparePrice,
  images[]{..., "url": asset->url, alt},
  thumbnail{..., "url": asset->url, alt},
  category->{_id, title, "slug": slug.current, description},
  ingredients,
  benefits,
  usage,
  featured,
  order,
  seo
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(order asc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  price,
  comparePrice,
  thumbnail{..., "url": asset->url, alt},
  category->{title, "slug": slug.current}
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id, title, "slug": slug.current, description
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName, tagline, logoText, navigation, socialLinks, contact, footerContent, seo
}`;

export const homePageQuery = `*[_type == "homePage"][0] {
  hero{
    eyebrow, headline, description,
    primaryCta, secondaryCta, caption, captionSub, captionHref,
    image{..., "url": asset->url, alt},
    bottle{..., "url": asset->url, alt}
  },
  featuredEyebrow, featuredTitle, featuredDescription,
  philosophyEyebrow, philosophyTitle, philosophyBody,
  philosophyImage{..., "url": asset->url, alt},
  benefitsEyebrow, benefitsTitle, benefits,
  benefitImage{..., "url": asset->url, alt},
  testimonial, faqs,
  ctaTitle, ctaDescription, ctaLabel, ctaHref
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  eyebrow, title, intro,
  storyBlocks[]{
    title, body, fullWidth,
    image{..., "url": asset->url, alt}
  },
  philosophyTitle, philosophyBody
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, content,
  coverImage{..., "url": asset->url, alt},
  category, publishedAt, author, seo
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, content,
  coverImage{..., "url": asset->url, alt},
  category, publishedAt, author, seo
}`;

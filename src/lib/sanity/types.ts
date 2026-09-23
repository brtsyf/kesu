export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
    url?: string;
  };
  alt?: string;
  url?: string;
};

export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price?: number;
  comparePrice?: number;
  images: SanityImage[];
  thumbnail: SanityImage;
  /** Cutout / soft-masked bottle layer */
  bottle?: SanityImage;
  /** Fixed liquid / splash backdrop */
  backdrop?: SanityImage;
  category?: Category;
  ingredients: string[];
  benefits: string[];
  usage: string;
  featured?: boolean;
  order?: number;
  volume?: string;
  tagline?: string;
  cardTint?: string;
  seo?: SeoFields;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: SanityImage;
  category?: string;
  publishedAt: string;
  author: string;
  seo?: SeoFields;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: SanityImage;
  bottle?: SanityImage;
  backdrop?: SanityImage;
  caption?: string;
  captionSub?: string;
  captionHref?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  product?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  logoText: string;
  navigation: NavItem[];
  socialLinks: { label: string; href: string }[];
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
  };
  footerContent: string;
  seo?: SeoFields;
};

export type HomePageContent = {
  hero: HeroContent;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredDescription: string;
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyBody: string;
  philosophyImage: SanityImage;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  benefitImage: SanityImage;
  testimonial: Testimonial;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AboutPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  storyBlocks: {
    title?: string;
    body: string;
    image?: SanityImage;
    fullWidth?: boolean;
  }[];
  philosophyTitle: string;
  philosophyBody: string;
};

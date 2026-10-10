export type NavLink = { label: string; href: string };

export type ProductDetailCopy = {
  eyebrow: string;
  lead: string;
  intro: string;
};

export type NeedCardCopy = {
  id: string;
  title: string;
  description: string;
  label: string;
  href: string;
};

export type Dictionary = {
  nav: NavLink[];
  footer: {
    blurb: string;
    privacy: string;
    terms: string;
    menu: string;
  };
  header: {
    logoHome: string;
    mainNav: string;
    search: string;
    openMenu: string;
    closeMenu: string;
    mobileNav: string;
    menu: string;
    social: string;
    tagline: string;
  };
  intro: {
    line: string;
    subline: string;
    continue: string;
    label: string;
  };
  cookies: {
    label: string;
    body: string;
    accept: string;
    details: string;
  };
  hero: {
    description: string;
    cta: string;
    portraitAlt: string;
  };
  home: {
    featuredTitle: string;
    featuredDescription: string;
    needsTitle: string;
    needsIntro: string;
    needs: NeedCardCopy[];
    testimonialQuote: string;
    testimonialName: string;
    testimonialRole: string;
    faqs: { question: string; answer: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    story: string;
    closing: string;
    missionTitle: string;
    mission: string;
    ctaTitle: string;
    ctaBody: string;
    contact: string;
    collection: string;
  };
  certificates: {
    eyebrow: string;
    title: string;
    intro: string;
    empty: string;
    close: string;
    dialog: string;
    imageAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    reach: string;
    infoTitle: string;
    infoBody: string;
    collectionLink: string;
    startTitle: string;
    startBody: string;
    address: string;
    whatsapp: string;
    whatsappCta: string;
    email: string;
    social: string;
    imageAlt: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    all: string;
    filter: string;
    searchLabel: string;
    searchPlaceholder: string;
    empty: string;
  };
  product: {
    discover: string;
    home: string;
    collection: string;
    crumb: string;
    professional: string;
    usage: string;
    usageTitle: string;
    ingredients: string;
    ingredientsTitle: string;
    studio: string;
    image: string;
    imageSoon: string;
    relatedTitle: string;
    relatedBody: string;
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
    ctaSecondary: string;
  };
  search: {
    label: string;
    placeholder: string;
    hint: string;
    loading: string;
    empty: string;
    close: string;
    esc: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
    products: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    productsTitle: string;
    productsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    certificatesTitle: string;
    certificatesDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
};

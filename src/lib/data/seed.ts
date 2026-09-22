import type {
  AboutPageContent,
  BlogPost,
  Category,
  HomePageContent,
  Product,
  SiteSettings,
} from "@/lib/sanity/types";

const img = (url: string, alt: string) => ({
  url,
  alt,
});

/** Catalog product photos (extracted from Kesu Katalog PDF) */
const placeholders = {
  lift: img("/images/products/six-lift.jpg", "Kesu Six Lift ampul"),
  liftSplash: img("/images/products/six-lift-splash.jpg", "Kesu Six Lift görsel"),
  aging: img("/images/products/anti-aging.jpg", "Kesu Anti-Aging ampul"),
  agingSplash: img(
    "/images/products/anti-aging-splash.jpg",
    "Kesu Anti-Aging görsel",
  ),
  white: img("/images/products/white-effect.jpg", "Kesu White Effect ampul"),
  whiteSplash: img(
    "/images/products/white-effect-splash.jpg",
    "Kesu White Effect görsel",
  ),
  eyes: img("/images/products/eyes.jpg", "Kesu Eyes ampul"),
  eyesSplash: img("/images/products/eyes-splash.jpg", "Kesu Eyes görsel"),
  hair: img("/images/products/hair.jpg", "Kesu Hair ampul"),
  hairSplash: img("/images/products/hair-splash.jpg", "Kesu Hair görsel"),
  editorial: {
    hero: img("/images/products/six-lift.jpg", "Kesu profesyonel bakım"),
    philosophy: img(
      "/images/products/anti-aging.jpg",
      "Klinik bakım atmosferi",
    ),
    benefit: img("/images/products/white-effect.jpg", "Cilt bakımı close-up"),
    about1: img("/images/products/eyes.jpg", "Profesyonel bakım atmosferi"),
    about2: img(
      "/images/products/hair.jpg",
      "Premium dermokozmetik atmosferi",
    ),
  },
};

export const siteSettings: SiteSettings = {
  siteName: "Kesu",
  tagline: "Profesyonel estetik için Kore teknolojisi.",
  logoText: "KESU",
  navigation: [
    { label: "Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "SSS", href: "/#sss" },
    { label: "İletişim", href: "/iletisim" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Web", href: "https://www.kesu.com.tr" },
  ],
  contact: {
    email: "info@kesu.com.tr",
    phone: "+90 212 000 00 00",
    whatsapp: "+90 532 000 00 00",
    address: "Nişantaşı, İstanbul",
  },
  footerContent:
    "Kesu; profesyonel estetik ve medikal uygulamalar için geliştirilmiş yenilikçi bir dermokozmetik markasıdır.",
  seo: {
    metaTitle: "Kesu — Profesyonel Dermokozmetik",
    metaDescription:
      "Lifting, anti-aging, whitening, eyes ve hair mezoterapi solüsyonları. Kore teknolojisiyle klinik sonuç odaklı formüller.",
  },
};

export const categories: Category[] = [
  {
    _id: "cat-lifting",
    title: "Lifting",
    slug: "lifting",
    description: "Sıkılaşma ve lifting odaklı solüsyonlar",
  },
  {
    _id: "cat-anti-aging",
    title: "Anti-Aging",
    slug: "anti-aging",
    description: "Kırışıklık ve yaşlanma karşıtı bakım",
  },
  {
    _id: "cat-whitening",
    title: "Whitening",
    slug: "whitening",
    description: "Leke ve ton eşitleme",
  },
  {
    _id: "cat-eyes",
    title: "Eyes",
    slug: "eyes",
    description: "Göz çevresi bakımı",
  },
  {
    _id: "cat-hair",
    title: "Hair",
    slug: "hair",
    description: "Saç ve saç derisi güçlendirme",
  },
];

export const products: Product[] = [
  {
    _id: "prod-six-lift",
    title: "Kesu Six Lift",
    slug: "kesu-six-lift",
    shortDescription:
      "Anında lifting ve sıkılaşma için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Lifting Mezoterapi Solüsyonu; sarkma ve elastikiyet kaybı, ince kırışıklıklar, donuk ve yorgun cilt ile cilt tonu eşitsizliklerine yönelik geliştirilmiştir. Somon DNA ile hücre yenileyici bakım sunar; kolajen üretimini destekler, cilt tonunu dengeler ve parlaklık kazandırır.",
    thumbnail: placeholders.lift,
    images: [placeholders.lift, placeholders.liftSplash],
    category: categories[0],
    ingredients: [
      "Aqua",
      "Hyaluronic Acid",
      "Glutathione",
      "Mannitol",
      "Niacinamide",
      "Arginine",
      "Tranexamic Acid",
      "Sodium Succinate",
      "Aspartic Acid",
      "Lysine",
      "Cysteine",
      "Glycine",
      "Oligopeptide-3",
      "L-Tryptophan",
      "Glutamic Acid",
      "Somon DNA",
    ],
    benefits: [
      "Anında lifting ve sıkılaşma sağlar",
      "Kolajen üretimini destekler",
      "Cilt tonunu dengeler, parlaklık verir",
      "Lekelerden arındırarak yaşlanmayı önlemeye yardımcı olur",
      "Somon DNA ile hücre yenileyici bakım",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Sarkma ve elastikiyet kaybı, ince kırışıklıklar, donuk/yorgun cilt ve ton eşitsizliklerinde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    featured: true,
    order: 1,
    seo: {
      metaTitle: "Kesu Six Lift | Lifting Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Anında lifting, sıkılaşma ve Somon DNA destekli hücre yenileyici bakım.",
    },
  },
  {
    _id: "prod-anti-aging",
    title: "Kesu Anti-Aging",
    slug: "kesu-anti-aging",
    shortDescription:
      "İnce çizgi ve kırışıklık görünümünü azaltan mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Anti-Aging Mezoterapi Solüsyonu; mimik çizgileri, statik kırışıklıklar, mat ve canlılığını yitirmiş cilt, yaşlanma kaynaklı elastikiyet kaybı ile göz çevresi kırışıklıkları ve cilt kuruluğuna yönelik formüle edilmiştir. Nem dengesini destekler, serbest radikallere karşı koruma sağlar ve yorgun cildi canlandırır.",
    thumbnail: placeholders.aging,
    images: [placeholders.aging, placeholders.agingSplash],
    category: categories[1],
    ingredients: [
      "Hyaluronic Acid",
      "Glutathione",
      "Ascorbic Acid",
      "Arginine",
      "Aqua",
      "Niacinamide",
      "Acetyl Hexapeptide-8",
      "Panthenol",
    ],
    benefits: [
      "İnce çizgi ve kırışıklıkların görünümünü azaltır",
      "Cildin nem dengesini düzenler",
      "Serbest radikallere karşı güçlü koruma sağlar",
      "Cilt tonunu dengeler, parlaklık sağlar",
      "Yorgun ve yaşlanmış cildi canlandırır",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Mimik/statik kırışıklıklar, mat cilt, elastikiyet kaybı ve göz çevresi kuruluğunda tercih edilir. Uygulama hekim veya yetkili uygulayıcı tarafından yapılır.",
    featured: true,
    order: 2,
    seo: {
      metaTitle: "Kesu Anti-Aging | Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Kırışıklık görünümünü azaltan, nem ve antioksidan destekli anti-aging solüsyon.",
    },
  },
  {
    _id: "prod-white-effect",
    title: "Kesu White Effect",
    slug: "kesu-white-effect",
    shortDescription:
      "Leke ve hiperpigmentasyon görünümünü azaltan whitening solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu White Effect Mezoterapi Solüsyonu; güneş lekeleri, melazma, akne sonrası lekeler ile donuk cilt görünümüne yönelik geliştirilmiştir. Cilt tonunu eşitler, ışıltı kazandırır, serbest radikallere karşı koruma sunar ve retinol ile hücre yenilenmesini destekler. Yüz, boyun, el üstü ve dekolte bölgelerinde kullanılabilir.",
    thumbnail: placeholders.white,
    images: [placeholders.white, placeholders.whiteSplash],
    category: categories[2],
    ingredients: [
      "Ascorbic Acid",
      "Succinic Acid",
      "Cyanocobalamin",
      "Aqua",
      "Hyaluronic Acid",
      "Riboflavin",
      "Retinol",
      "Niacinamide",
      "Mannitol",
      "Arbutin",
      "Rutin",
      "Thiamine",
      "Panthenol",
      "Tranexamic Acid",
    ],
    benefits: [
      "Cilt lekelerini ve hiperpigmentasyonu azaltmaya yardımcı olur",
      "Cilt tonunu eşitler",
      "Işıltılı ve parlak bir görünüm sağlar",
      "Serbest radikallere karşı koruma sunar",
      "Retinol ile hücre yenilenmesini destekler",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Solar lentigo, melazma, post-akne lekeleri ve donuk ciltte tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    featured: true,
    order: 3,
    seo: {
      metaTitle: "Kesu White Effect | Whitening Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Leke, ton eşitleme ve parlaklık odaklı whitening solüsyonu.",
    },
  },
  {
    _id: "prod-eyes",
    title: "Kesu Eyes",
    slug: "kesu-eyes",
    shortDescription:
      "Göz çevresi ince çizgi, koyu halka ve yorgunluk görünümü için. 5 ml × 5 ampul.",
    description:
      "Kesu Eyes Mezoterapi Solüsyonu; göz altı torbaları, morluklar, ince çizgiler ve göz çevresi ton eşitsizliklerine yönelik özel formüle edilmiştir. İnce çizgilerin görünümünü azaltmaya yardımcı olur, koyu halka ve yorgunluk görünümünü hafifletir, aydınlatır, nemlendirir ve sıkılaştırıcı bir etki sunar.",
    thumbnail: placeholders.eyes,
    images: [placeholders.eyes, placeholders.eyesSplash],
    category: categories[3],
    ingredients: [
      "Ascorbic Acid",
      "Aqua",
      "Hyaluronic Acid",
      "Niacinamide",
      "Riboflavin",
      "Thiamine",
      "Succinic Acid",
      "Cyanocobalamin",
      "Panthenol",
      "Mannitol",
      "L-Arginine",
      "Glutathione",
      "Acetyl Hexapeptide-8",
    ],
    benefits: [
      "Göz çevresindeki ince çizgi ve kırışıklık görünümünü azaltır",
      "Koyu halka ve yorgunluk görünümünü hafifletir",
      "Cilt tonunu aydınlatır ve eşitler",
      "Derinlemesine nemlendirir ve onarır",
      "Göz çevresine canlılık kazandırır",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında, göz çevresi protokollerinde kullanılır. Uygulama yalnızca yetkili profesyoneller tarafından yapılmalıdır.",
    featured: false,
    order: 4,
    seo: {
      metaTitle: "Kesu Eyes | Göz Çevresi Mezoterapi Solüsyonu",
      metaDescription:
        "5 ml × 5 ampul. Göz çevresi ince çizgi, koyu halka ve yorgunluk görünümü için özel solüsyon.",
    },
  },
  {
    _id: "prod-hair",
    title: "Kesu Hair",
    slug: "kesu-hair",
    shortDescription:
      "Saç dökülmesini azaltmaya ve kökleri beslemeye yardımcı solüsyon. 10 ml × 5 ampul.",
    description:
      "Kesu Hair Mezoterapi Solüsyonu; androgenetik alopesi, kadın tipi yaygın dökülme, mevsimsel dökülmeler, zayıf/ince teller ile stres veya gebelik sonrası dökülmeye yönelik geliştirilmiştir. Saç köklerini besler, yeni saç oluşumunu destekler, telleri kalınlaştırmaya yardımcı olur ve dolaşımı artırarak saç derisini canlandırır. Tüm saç tiplerine uygundur.",
    thumbnail: placeholders.hair,
    images: [placeholders.hair, placeholders.hairSplash],
    category: categories[4],
    ingredients: [
      "Aqua",
      "Hyaluronic Acid",
      "Niacinamide",
      "Pantothenic Acid",
      "Ascorbic Acid",
      "Cyanocobalamin",
      "Thiamine HCl",
      "Glutamic Acid",
      "Pyridoxine",
      "Biotin",
      "Glycine",
      "Zinc",
      "Tocopheryl Acetate",
    ],
    benefits: [
      "Saç dökülmesini azaltmaya yardımcı olur",
      "Saç köklerini besler ve canlandırır",
      "Yeni saç oluşumunu destekler",
      "Saç tellerini kalınlaştırmaya yardımcı olur",
      "Dolaşımı artırarak saç derisini canlandırır",
    ],
    usage:
      "Profesyonel saç mezoterapisi uygulamalarında kullanılır. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    featured: false,
    order: 5,
    seo: {
      metaTitle: "Kesu Hair | Saç Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Dökülme, kök besleme ve saç güçlendirme odaklı mezoterapi solüsyonu.",
    },
  },
];

export const homePage: HomePageContent = {
  hero: {
    eyebrow: "Profesyonel dermokozmetik",
    headline: "Klinik sonuç.\nKesin formül.",
    description:
      "Lifting, anti-aging, whitening, eyes ve hair için Kore teknolojisiyle geliştirilmiş mezoterapi solüsyonları.",
    primaryCta: { label: "Ürünleri Keşfet", href: "/urunler" },
    secondaryCta: { label: "Marka Hikayesi", href: "/hakkimizda" },
    image: placeholders.editorial.hero,
  },
  featuredEyebrow: "Öne çıkanlar",
  featuredTitle: "Klinik rutinin temel solüsyonları.",
  featuredDescription:
    "Her formül net bir endikasyon için tasarlandı. Profesyonel uygulamada güçlü, anlaşılır ve sonuç odaklı.",
  philosophyEyebrow: "Yaklaşım",
  philosophyTitle: "Uzmanlarca tercih edilen\nperformans.",
  philosophyBody:
    "Kesu ürünleri; doktorların ve kliniklerin beklentilerini karşılamak üzere, etkinliği kanıtlanmış Kore menşeli üretim süreçleriyle hazırlanır. Hedef nettir: uygulama sonuçlarını üst seviyeye taşımak.",
  philosophyImage: placeholders.editorial.philosophy,
  benefitsEyebrow: "Neden Kesu",
  benefitsTitle: "Bilim. Güven. Sonuç.",
  benefits: [
    {
      title: "Klinik endikasyon odaklı",
      description:
        "Lifting, anti-aging, leke, göz çevresi ve saç — her solüsyon spesifik bir ihtiyaca cevap verir.",
    },
    {
      title: "Kore teknolojisi",
      description:
        "Etkinliği ve güvenilirliği dünya çapında bilinen ileri teknoloji üretim süreçleri.",
    },
    {
      title: "Profesyonel güven",
      description:
        "Estetisyen ve hekimler tarafından yıllardır tercih edilen, stabil ve yüksek performanslı formüller.",
    },
  ],
  benefitImage: placeholders.editorial.benefit,
  testimonial: {
    quote:
      "Gerçek bakım, doğru formül ve doğru uygulama ile başlar.",
    name: "Kesu Klinik Ağı",
    product: "Profesyonel uygulamalar",
  },
  faqs: [
    {
      question: "Kesu ürünleri kimler için uygundur?",
      answer:
        "Kesu solüsyonları profesyonel estetik ve medikal uygulamalar için geliştirilmiştir. Uygulama, hekim veya yetkili uygulayıcı tarafından yapılmalıdır.",
    },
    {
      question: "Hangi ürün gruplarınız var?",
      answer:
        "Katalogda Six Lift, Anti-Aging, White Effect, Eyes ve Hair mezoterapi solüsyonları yer alır. Her biri farklı endikasyonlara yönelik formüle edilmiştir.",
    },
    {
      question: "Ürünler Kore menşeli midir?",
      answer:
        "Evet. Formüllerimiz, etkinliği ve güvenilirliği dünya çapında bilinen Kore menşeli ileri teknoloji üretim süreçleriyle hazırlanır.",
    },
    {
      question: "Bilgi veya iş birliği için nasıl ulaşabilirim?",
      answer:
        "İletişim sayfasındaki adres ve WhatsApp hattımız üzerinden bize ulaşabilirsiniz.",
    },
  ],
  ctaTitle: "Koleksiyonu\nkeşfedin.",
  ctaDescription: "Klinik sonuç için net formüller.",
  ctaLabel: "Ürünlere Git",
  ctaHref: "/urunler",
};

export const aboutPage: AboutPageContent = {
  eyebrow: "Hakkımızda",
  title: "Profesyonel estetik için\ngüvenilir bir marka.",
  intro:
    "Kesu, profesyonel estetik ve medikal uygulamalar için geliştirilmiş lifting, botoks, anti-aging, hair ve eye care ürünleri sunmak amacıyla kurulmuş; yıllardır sektörde başarıyla kullanılan ve uzmanlar tarafından güvenle tercih edilen yenilikçi bir dermokozmetik markasıdır.",
  storyBlocks: [
    {
      title: "Kore teknolojisi. Klinik sonuç.",
      body: "Uzun yıllara dayanan deneyimimiz ve profesyonellerden aldığımız güçlü geri bildirimler doğrultusunda geliştirdiğimiz tüm ürünlerimiz, etkinliği ve güvenilirliği dünya çapında kanıtlanmış Kore menşeli ileri teknoloji üretim süreçleriyle hazırlanır. Cilt gençleştirme, sıkılaşma, leke karşıtı bakım, saç güçlendirme ve göz çevresi problemlerine yönelik çözümlerimiz; doktorların ve kliniklerin beklentilerini karşılamanın ötesine geçerek uygulama sonuçlarını üst seviyeye taşır.",
      image: placeholders.editorial.about1,
    },
    {
      body: "Bilimsel yaklaşımımız, müşteri memnuniyetini esas alan hizmet anlayışımız ve sürekli gelişen ürün portföyümüz sayesinde Kesu; estetik dünyasında kalitesi ve sonuç odaklı yaklaşımıyla takdir edilen güçlü bir marka konumuna gelmiştir.",
      image: placeholders.editorial.about2,
      fullWidth: true,
    },
  ],
  philosophyTitle: "Misyonumuz",
  philosophyBody:
    "Yüksek performanslı, stabil ve güvenli formüller ile uygulayıcıların başarısını artırmak; profesyonel estetisyen ve doktorlar tarafından yıllardır bize duyulan güveni daha da güçlendirmek.",
};

/** Blog routes removed from nav; kept for CMS schema compatibility */
export const blogPosts: BlogPost[] = [];

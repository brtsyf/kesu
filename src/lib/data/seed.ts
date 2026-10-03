import type {
  AboutPageContent,
  Category,
  CertificatesPageContent,
  HomePageContent,
  Product,
  SiteSettings,
} from "@/lib/sanity/types";

const img = (url: string, alt: string) => ({
  url,
  alt,
});

/** Catalog product photos — layered bottle + fixed liquid backdrop */
const placeholders = {
  lift: img("/images/products/six-lift.jpg", "Kesu Lifting ampul"),
  liftBottle: img("/images/products/six-lift.png", "Kesu Lifting ampul"),
  liftStill: img(
    "/images/products/six-lift-loci.png",
    "Kesu Lifting stüdyo",
  ),
  liftBg: img("/images/products/six-lift-bg.webp", "Kesu Lifting arka plan"),
  aging: img("/images/products/anti-aging.png", "Kesu Anti-Aging ampul"),
  agingBottle: img(
    "/images/products/anti-aging.png",
    "Kesu Anti-Aging ampul",
  ),
  agingStill: img(
    "/images/products/anti-aging-loci.png",
    "Kesu Anti-Aging stüdyo",
  ),
  agingBg: img(
    "/images/products/anti-aging-bg.webp",
    "Kesu Anti-Aging arka plan",
  ),
  white: img("/images/products/white-effect.png", "Kesu White Effect ampul"),
  whiteBottle: img(
    "/images/products/white-effect.png",
    "Kesu White Effect ampul",
  ),
  whiteStill: img(
    "/images/products/white-effect-loci.png",
    "Kesu White Effect stüdyo",
  ),
  whiteBg: img(
    "/images/products/white-effect-bg.webp",
    "Kesu White Effect arka plan",
  ),
  eyes: img("/images/products/eyes.png", "Kesu Eye ampul"),
  eyesBottle: img("/images/products/eyes.png", "Kesu Eye ampul"),
  eyesStill: img("/images/products/eyes-loci.png", "Kesu Eye stüdyo"),
  eyesBg: img("/images/products/eyes-bg.webp", "Kesu Eye arka plan"),
  hair: img("/images/products/hair.png", "Kesu Hair ampul"),
  hairBottle: img("/images/products/hair.png", "Kesu Hair ampul"),
  hairStill: img("/images/products/hair-loci.png", "Kesu Hair stüdyo"),
  hairBg: img("/images/products/hair-bg.webp", "Kesu Hair arka plan"),
  acneraBottle: img("/images/products/acnera.png", "Kesu Acnera ampul"),
  acneraStill: img("/images/products/acnera-loci.png", "Kesu Acnera stüdyo"),
  biocaBottle: img("/images/products/bioca.png", "Kesu BioCA ampul"),
  biocaStill: img("/images/products/bioca-loci.png", "Kesu BioCA stüdyo"),
  genishineBottle: img("/images/products/genishine.png", "Kesu Genishine ampul"),
  genishineStill: img(
    "/images/products/genishine-loci.png",
    "Kesu Genishine stüdyo",
  ),
  salmonBottle: img("/images/products/salmon.png", "Kesu Salmon DNA ampul"),
  salmonStill: img("/images/products/salmon-loci.png", "Kesu Salmon DNA stüdyo"),
  editorial: {
    hero: img(
      "/images/editorial/hero-portrait.jpg",
      "Kesu — doğal ışıltılı cilt bakımı",
    ),
  },
};

export const siteSettings: SiteSettings = {
  siteName: "Kesu",
  tagline: "Kore güzellik yaklaşımından esinlenen profesyonel estetik.",
  logoText: "KESU",
  navigation: [
    { label: "Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Sertifikalarımız", href: "/sertifikalarimiz" },
    { label: "İletişim", href: "/iletisim" },
  ],
  socialLinks: [
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com",
    },
    {
      platform: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com",
    },
  ],
  contact: {
    email: "info@kesu.com.tr",
    phone: "+90 212 000 00 00",
    whatsapp: "+90 532 000 00 00",
    address:
      "Sümer Mah. Prof. Dr. Turan Güneş Cad.\nSahilpark B1 Blok No: 140/A\nZeytinburnu, İstanbul",
  },
  footerContent:
    "Kesu; profesyonel estetik ve medikal uygulamalar için geliştirilmiş yenilikçi bir dermokozmetik markasıdır.",
  seo: {
    metaTitle: "Kesu | Profesyonel Dermokozmetik Mezoterapi Solüsyonları",
    metaDescription:
      "Kesu mezoterapi solüsyonları: Lifting, Anti-Aging, White Effect, Eye, Hair, Acnera, BioCA, Genishine ve Salmon DNA. Kore güzellik yaklaşımından esinlenen profesyonel bakım.",
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
    title: "White Effect",
    slug: "whitening",
    description: "Leke ve ton eşitleme",
  },
  {
    _id: "cat-eyes",
    title: "Eye",
    slug: "eyes",
    description: "Göz çevresi bakımı",
  },
  {
    _id: "cat-hair",
    title: "Hair",
    slug: "hair",
    description: "Saç ve saç derisi güçlendirme",
  },
  {
    _id: "cat-acnera",
    title: "Acnera",
    slug: "acnera",
    description: "Akne, yağlanma ve gözenek görünümü",
  },
  {
    _id: "cat-bioca",
    title: "BioCA",
    slug: "bioca",
    description: "Yüz, boyun, sıkılık ve elastikiyet",
  },
  {
    _id: "cat-genishine",
    title: "Genishine",
    slug: "genishine",
    description: "Kol altı ve genital bölge dış cilt bakımı ve ton eşitliği",
  },
  {
    _id: "cat-salmon",
    title: "Salmon DNA",
    slug: "salmon",
    description: "Cilt yenileme, nem ve elastikiyet",
  },
];

export const products: Product[] = [
  {
    _id: "prod-six-lift",
    title: "Kesu Lifting",
    slug: "kesu-six-lift",
    shortDescription:
      "Anında lifting ve sıkılaşma için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Lifting Mezoterapi Solüsyonu; sarkma, elastikiyet kaybı, ince kırışıklıklar, donuk ve yorgun görünüm ile ton eşitsizliğine yönelik geliştirilmiştir.",
    thumbnail: placeholders.liftBottle,
    bottle: placeholders.liftBottle,
    images: [placeholders.liftBottle, placeholders.liftStill],
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
      "Tryptophan",
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
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 1,
    volume: "5 × 10 ml",
    tagline: "Sıkılık & elastikiyet",
    cardTint: "#eef1ec",
    seo: {
      metaTitle: "Kesu Lifting | Mezoterapi Solüsyonu",
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
      "Kesu Anti-Aging Mezoterapi Solüsyonu; mimik çizgileri, statik kırışıklıklar, matlık, canlılık kaybı, elastikiyet kaybı, göz çevresi kırışıklıkları ve kuruluya yönelik formüle edilmiştir.",
    thumbnail: placeholders.agingBottle,
    bottle: placeholders.agingBottle,
    images: [placeholders.agingBottle, placeholders.agingStill],
    category: categories[1],
    ingredients: [
      "Hyaluronic Acid",
      "Glutathione",
      "Niacinamide",
      "Ascorbic Acid",
      "Arginine",
      "Acetyl Hexapeptide-8",
      "Panthenol",
    ],
    benefits: [
      "İnce çizgi ve kırışıklıkların görünümünü azaltır",
      "Cildin nem dengesini düzenler",
      "Serbest radikallere karşı güçlü koruma sağlar",
      "Cilt tonunu dengeler, parlaklık verir",
      "Yorgun ve yaşlanmış cildi canlandırır",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 2,
    volume: "5 × 10 ml",
    tagline: "Nem & canlılık",
    cardTint: "#f6eeed",
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
      "Leke ve hiperpigmentasyon görünümünü azaltan White Effect solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu White Effect Mezoterapi Solüsyonu; güneş lekeleri, melazma, akne sonrası lekeler ve donuk görünüme yönelik geliştirilmiştir. Yüz, boyun, el üstü ve dekolte bölgelerinde kullanılabilir.",
    thumbnail: placeholders.whiteBottle,
    bottle: placeholders.whiteBottle,
    images: [placeholders.whiteBottle, placeholders.whiteStill],
    category: categories[2],
    ingredients: [
      "Hyaluronic Acid",
      "Riboflavin",
      "Retinol",
      "Niacinamide",
      "Mannitol",
      "Arbutin",
      "Rutin",
      "Thiamine HCl",
      "Ascorbic Acid",
      "Succinic Acid",
      "Cyanocobalamin",
      "Panthenol",
      "Tranexamic Acid",
    ],
    benefits: [
      "Cilt lekelerini ve hiperpigmentasyonu azaltmaya yardımcı olur",
      "Tonu eşitler",
      "Işıltılı bir görünüm sağlar",
      "Serbest radikallere karşı koruma sunar",
      "Retinol ile hücre yenilenmesini destekler",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 3,
    volume: "5 × 10 ml",
    tagline: "Ton eşitliği & aydınlık",
    cardTint: "#f5f2e8",
    seo: {
      metaTitle: "Kesu White Effect | Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Leke, ton eşitleme ve parlaklık odaklı White Effect solüsyonu.",
    },
  },
  {
    _id: "prod-eyes",
    title: "Kesu Eye",
    slug: "kesu-eyes",
    shortDescription:
      "Göz çevresi ince çizgi, koyu halka ve yorgunluk görünümü için. 5 ml × 5 ampul.",
    description:
      "Kesu Eye Mezoterapi Solüsyonu; göz altı torbaları, morluklar, ince çizgiler ve çevredeki ton eşitsizliğine yönelik özel formüle edilmiştir.",
    thumbnail: placeholders.eyesBottle,
    bottle: placeholders.eyesBottle,
    images: [placeholders.eyesBottle, placeholders.eyesStill],
    category: categories[3],
    ingredients: [
      "Aqua",
      "Hyaluronic Acid",
      "Vitamin K",
      "Niacinamide",
      "Riboflavin",
      "Thiamine",
      "Ascorbic Acid",
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
      "Koyu halka ve yorgunluğu hafifletir",
      "Tonu aydınlatır ve eşitler",
      "Derinlemesine nemlendirir ve onarır",
      "Bu bölgeye canlılık kazandırır",
    ],
    usage:
      "Yalnızca yetkili uygulayıcıların protokolünde kullanılır.",
    featured: true,
    order: 4,
    volume: "5 × 5 ml",
    tagline: "Göz çevresi canlandırma",
    cardTint: "#f1f0f5",
    seo: {
      metaTitle: "Kesu Eye | Göz Çevresi Mezoterapi Solüsyonu",
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
      "Kesu Hair Mezoterapi Solüsyonu; androgenetik alopesi, kadın tipi yaygın, mevsimsel, stres veya gebelik sonrası dökülme ile zayıf ve ince tellere yönelik geliştirilmiştir. Tüm saç tiplerine uygundur.",
    thumbnail: placeholders.hairBottle,
    bottle: placeholders.hairBottle,
    images: [placeholders.hairBottle, placeholders.hairStill],
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
      "Dökülmeyi azaltmaya yardımcı olur",
      "Kökleri besler",
      "Yeni saç oluşumuna katkıda bulunur",
      "Tellerin kalınlaşmasını destekler",
      "Dolaşımı artırarak deriyi canlandırır",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 5,
    volume: "5 × 10 ml",
    tagline: "Saç kökü bakımı",
    cardTint: "#f3eee8",
    seo: {
      metaTitle: "Kesu Hair | Saç Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Dökülme, kök besleme ve saç güçlendirme odaklı mezoterapi solüsyonu.",
    },
  },
  {
    _id: "prod-acnera",
    title: "Kesu Acnera",
    slug: "kesu-acnera",
    shortDescription:
      "Akne, yağlanmaya eğilimli cilt ve gözenek görünümü için mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu Acnera Mezoterapi Solüsyonu; akne ve aktif sivilce, yağlanma, gözenek ve sonrası oluşan sorunlara yönelik geliştirilmiştir.",
    thumbnail: placeholders.acneraBottle,
    bottle: placeholders.acneraBottle,
    images: [placeholders.acneraBottle, placeholders.acneraStill],
    category: categories[5],
    ingredients: [
      "Aqua",
      "Niacinamide",
      "Hyaluronic Acid",
      "Glutathione",
      "Tranexamic Acid",
      "Succinic Acid",
      "Limonene",
      "Pinene",
      "Borneol",
      "Alpha-Phellandrene",
      "Myrcene",
    ],
    benefits: [
      "Akne ve sivilce görünümünün azalmasına yardımcı olur.",
      "Sebum dengesini destekler.",
      "Gözeneklerin sıkılaşmasına yardımcı olur.",
      "Arınmış bir sonuç hedefler.",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 6,
    volume: "5 × 5 ml",
    tagline: "Akne & yağlanma",
    cardTint: "#e8f0ef",
    seo: {
      metaTitle: "Kesu Acnera | Mezoterapi Solüsyonu",
      metaDescription:
        "5 ml × 5 ampul. Akne, yağlanma ve gözenek görünümüne yönelik Kesu Acnera. Sebum dengesini destekler.",
    },
  },
  {
    _id: "prod-bioca",
    title: "Kesu BioCA",
    slug: "kesu-bioca",
    shortDescription:
      "Yüz ve boyun için sıkılık ve toparlanma odaklı mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu BioCA Mezoterapi Solüsyonu; yüz ve boyun, ince çizgi ve kırışıklık, elastikiyet kaybı ile sarkmaya yönelik geliştirilmiştir.",
    thumbnail: placeholders.biocaBottle,
    bottle: placeholders.biocaBottle,
    images: [placeholders.biocaBottle, placeholders.biocaStill],
    category: categories[6],
    ingredients: [
      "Aqua",
      "Hyaluronic Acid",
      "Nicotinamide Adenine Dinucleotide",
      "Succinic Acid",
      "Glutathione",
      "Arginine",
      "Calcium Hydroxyapatite",
    ],
    benefits: [
      "Daha sıkı bir cilt sunar.",
      "Yüz hatlarının toparlanmasına yardımcı olur.",
      "Elastikiyeti destekler.",
      "Daha pürüzsüz ve genç bir ifade sağlar.",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 7,
    volume: "5 × 5 ml",
    tagline: "Sıkılık & toparlanma",
    cardTint: "#f6f1e6",
    seo: {
      metaTitle: "Kesu BioCA | Mezoterapi Solüsyonu",
      metaDescription:
        "5 ml × 5 ampul. Yüz ve boyun, ince çizgi ve sarkma görünümüne yönelik Kesu BioCA. Cildin daha sıkı görünmesini destekler.",
    },
  },
  {
    _id: "prod-genishine",
    title: "Kesu Genishine",
    slug: "kesu-genishine",
    shortDescription:
      "Kol altı ve genital bölge dış cilt bakımı ile renk eşitliği için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Genishine Mezoterapi Solüsyonu; kol altı ve genital bölgenin dış cildi, renk farkı ve koyu görünüm için geliştirilmiştir.",
    thumbnail: placeholders.genishineBottle,
    bottle: placeholders.genishineBottle,
    images: [placeholders.genishineBottle, placeholders.genishineStill],
    category: categories[7],
    ingredients: [
      "Aqua",
      "Hyaluronic Acid",
      "Glutathione",
      "Ascorbic Acid",
      "Sodium Succinate",
      "Arbutin",
      "Tranexamic Acid",
      "Acetyl Cysteine",
      "Glucosamine Sulfate",
    ],
    benefits: [
      "Cilt tonunu eşitler.",
      "Daha aydınlık ve canlı bir ifade sağlar.",
      "Koyu bölgelerin hafiflemesine yardımcı olur.",
      "Nemli ve bakımlı kalmasını destekler.",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 8,
    volume: "5 × 10 ml",
    tagline: "Renk eşitliği & aydınlık",
    cardTint: "#f5efed",
    seo: {
      metaTitle: "Kesu Genishine | Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Kol altı ve genital bölge dış cilt bakımı ile renk eşitliğine yönelik Kesu Genishine. Cilt tonunun daha eşit görünmesini destekler.",
    },
  },
  {
    _id: "prod-salmon",
    title: "Kesu Salmon DNA",
    slug: "kesu-salmon",
    shortDescription:
      "Cilt yenileme, nem ve elastikiyet için mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu Salmon DNA Mezoterapi Solüsyonu; yenileme, elastikiyet kaybı, ince çizgi ve kırışıklık ile kuruluk ve nem kaybına yönelik geliştirilmiştir.",
    thumbnail: placeholders.salmonBottle,
    bottle: placeholders.salmonBottle,
    images: [placeholders.salmonBottle, placeholders.salmonStill],
    category: categories[8],
    ingredients: ["Aqua", "Salmon DNA", "Hyaluronic Acid"],
    benefits: [
      "Nem dengesini destekler.",
      "Canlılık ve ışıltı kazandırır.",
      "Elastikiyetin korunmasına yardımcı olur.",
      "Yenilenmeyi destekler.",
    ],
    usage:
      "Protokolü hekim veya yetkili uygulayıcı belirler.",
    featured: true,
    order: 9,
    volume: "5 × 5 ml",
    tagline: "Yenileme & nem",
    cardTint: "#f6eee6",
    seo: {
      metaTitle: "Kesu Salmon DNA | Mezoterapi Solüsyonu",
      metaDescription:
        "5 ml × 5 ampul. Cilt yenileme, nem ve elastikiyet odaklı Kesu Salmon DNA. Cildin nem dengesini destekler.",
    },
  },
];

export const homePage: HomePageContent = {
  hero: {
    eyebrow: "Profesyonel dermokozmetik",
    headline: "Inspired by\nKorean\nBeauty.",
    description:
      "Cildinize, ihtiyaçlarınıza ve doğal ifadenize odaklanan bir dünya.",
    primaryCta: { label: "Ürünleri Keşfet", href: "/urunler" },
    image: placeholders.editorial.hero,
  },
  featuredEyebrow: "Öne çıkanlar",
  featuredTitle: "Farklı ihtiyaçlar.\nAynı özen.",
  featuredDescription:
    "Nemden sıkılığa, leke görünümünden ışıltıya — her formül net bir endikasyona odaklanır.",
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
        "Kesu solüsyonları profesyonel estetik ve medikal kullanım için geliştirilmiştir. Uygulama, hekim veya yetkili uygulayıcı tarafından yapılmalıdır.",
    },
    {
      question: "Hangi ürün gruplarınız var?",
      answer:
        "Katalogda Lifting, Anti-Aging, White Effect, Eye, Hair, Acnera, BioCA, Genishine ve Salmon DNA mezoterapi solüsyonları yer alır.",
    },
    {
      question: "Bilgi veya iş birliği için nasıl ulaşabilirim?",
      answer:
        "İletişim sayfasındaki adres ve WhatsApp hattımız üzerinden bize ulaşabilirsiniz.",
    },
  ],
};

export const aboutPage: AboutPageContent = {
  eyebrow: "Hakkımızda",
  title: "Profesyonel estetik için\ngüvenilir bir marka.",
  intro:
    "Yıllardır sektörde başarıyla kullanılır ve uzmanlar tarafından güvenle tercih edilir. Medikal uygulamalara yönelik ürünler sunar.",
  storyBlocks: [
    {
      body: "Uzun yıllara dayanan deneyimimiz ve profesyonellerden aldığımız güçlü geri bildirimler doğrultusunda geliştirdiğimiz tüm ürünlerimiz, etkinliği ve güvenilirliği dünya çapında kanıtlanmış Kore menşeli ileri teknoloji üretim süreçleriyle hazırlanır. Cilt gençleştirme, sıkılaşma, leke karşıtı bakım, saç güçlendirme ve göz çevresi problemlerine yönelik çözümlerimiz; doktorların ve kliniklerin beklentilerini karşılamanın ötesine geçerek uygulama sonuçlarını üst seviyeye taşır.",
    },
    {
      body: "Bilimsel yaklaşımımız, müşteri memnuniyetini esas alan hizmet anlayışımız ve sürekli gelişen ürün portföyümüz sayesinde Kesu, estetik dünyasında kalitesi ve sonuçlarıyla takdir edilen bir marka konumuna gelmiştir.",
    },
  ],
  philosophyTitle: "Misyonumuz",
  philosophyBody:
    "Yüksek performanslı, stabil ve güvenli formüller ile uygulayıcıların başarısını artırmak, estetisyen ve doktorların yıllardır duyduğu güveni daha da güçlendirmektir.",
};

export const certificatesPage: CertificatesPageContent = {
  eyebrow: "Sertifikalarımız",
  title: "Güven, belgelenir.",
  intro:
    "Kalite, üretim ve klinik uygunluk standartlarını karşılayan belgelerle desteklenir. Görselleri buradan inceleyebilirsiniz.",
  certificates: [],
};

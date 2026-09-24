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
  lift: img("/images/products/six-lift.jpg", "Kesu Six Lift ampul"),
  liftBottle: img("/images/products/six-lift.png", "Kesu Six Lift ampul"),
  liftStill: img(
    "/images/products/six-lift-loci.png",
    "Kesu Six Lift stüdyo",
  ),
  liftBg: img("/images/products/six-lift-bg.webp", "Kesu Six Lift arka plan"),
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
  eyes: img("/images/products/eyes.png", "Kesu Eyes ampul"),
  eyesBottle: img("/images/products/eyes.png", "Kesu Eyes ampul"),
  eyesStill: img("/images/products/eyes-loci.png", "Kesu Eyes stüdyo"),
  eyesBg: img("/images/products/eyes-bg.webp", "Kesu Eyes arka plan"),
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
      "Kesu mezoterapi solüsyonları: Six Lift, Anti-Aging, White Effect, Eyes, Hair, Acnera, BioCA, Genishine ve Salmon DNA. Kore güzellik yaklaşımından esinlenen profesyonel bakım.",
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
    description: "Genital bölge dış cilt bakımı ve ton eşitliği",
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
    title: "Kesu Six Lift",
    slug: "kesu-six-lift",
    shortDescription:
      "Anında lifting ve sıkılaşma için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Lifting Mezoterapi Solüsyonu; sarkma ve elastikiyet kaybı, ince kırışıklıklar, donuk ve yorgun cilt ile cilt tonu eşitsizliklerine yönelik geliştirilmiştir. Somon DNA ile hücre yenileyici bakım sunar; kolajen üretimini destekler, cilt tonunu dengeler ve parlaklık kazandırır.",
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
    volume: "5 × 10 ml",
    tagline: "Sıkılık & elastikiyet",
    cardTint: "#eef1ec",
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
    thumbnail: placeholders.agingBottle,
    bottle: placeholders.agingBottle,
    images: [placeholders.agingBottle, placeholders.agingStill],
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
      "Leke ve hiperpigmentasyon görünümünü azaltan whitening solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu White Effect Mezoterapi Solüsyonu; güneş lekeleri, melazma, akne sonrası lekeler ile donuk cilt görünümüne yönelik geliştirilmiştir. Cilt tonunu eşitler, ışıltı kazandırır, serbest radikallere karşı koruma sunar ve retinol ile hücre yenilenmesini destekler. Yüz, boyun, el üstü ve dekolte bölgelerinde kullanılabilir.",
    thumbnail: placeholders.whiteBottle,
    bottle: placeholders.whiteBottle,
    images: [placeholders.whiteBottle, placeholders.whiteStill],
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
    volume: "5 × 10 ml",
    tagline: "Ton eşitliği & aydınlık",
    cardTint: "#f5f2e8",
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
    thumbnail: placeholders.eyesBottle,
    bottle: placeholders.eyesBottle,
    images: [placeholders.eyesBottle, placeholders.eyesStill],
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
    featured: true,
    order: 4,
    volume: "5 × 5 ml",
    tagline: "Göz çevresi canlandırma",
    cardTint: "#f1f0f5",
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
      "Saç dökülmesini azaltmaya yardımcı olur",
      "Saç köklerini besler ve canlandırır",
      "Yeni saç oluşumunu destekler",
      "Saç tellerini kalınlaştırmaya yardımcı olur",
      "Dolaşımı artırarak saç derisini canlandırır",
    ],
    usage:
      "Profesyonel saç mezoterapisi uygulamalarında kullanılır. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
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
      "Kesu Acnera Mezoterapi Solüsyonu; akne ve aktif sivilce, yağlanmaya eğilimli cilt, gözenek görünümü ve sivilce sonrası oluşan cilt problemlerine yönelik geliştirilmiştir. Akne ve sivilce görünümünün azalmasına yardımcı olur, cildin sebum dengesini destekler, gözeneklerin daha sıkı görünmesine yardımcı olur ve cildin daha temiz ve dengeli görünmesini destekler.",
    thumbnail: placeholders.acneraBottle,
    bottle: placeholders.acneraBottle,
    images: [placeholders.acneraBottle, placeholders.acneraStill],
    category: categories[5],
    ingredients: [],
    benefits: [
      "Akne ve sivilce görünümünün azalmasına yardımcı olur.",
      "Cildin sebum dengesini destekler.",
      "Gözeneklerin daha sıkı görünmesine yardımcı olur.",
      "Cildin daha temiz ve dengeli görünmesini destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Akne ve aktif sivilce, yağlanmaya eğilimli cilt, gözenek görünümü ve sivilce sonrası oluşan cilt problemlerinde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
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
      "Kesu BioCA Mezoterapi Solüsyonu; yüz ve boyun bölgesi, ince çizgi ve kırışıklık görünümü, elastikiyet kaybı ve cilt sarkması görünümüne yönelik geliştirilmiştir. Cildin daha sıkı görünmesini destekler, yüz hatlarının daha toparlanmış görünmesine yardımcı olur, cilt elastikiyetini destekler ve daha pürüzsüz ve genç bir görünüm sağlar.",
    thumbnail: placeholders.biocaBottle,
    bottle: placeholders.biocaBottle,
    images: [placeholders.biocaBottle, placeholders.biocaStill],
    category: categories[6],
    ingredients: [],
    benefits: [
      "Cildin daha sıkı görünmesini destekler.",
      "Yüz hatlarının daha toparlanmış görünmesine yardımcı olur.",
      "Cilt elastikiyetini destekler.",
      "Daha pürüzsüz ve genç bir görünüm sağlar.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Yüz ve boyun bölgesi, ince çizgi ve kırışıklık görünümü, elastikiyet kaybı ve cilt sarkması görünümünde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
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
      "Genital bölge dış cilt bakımı ve renk eşitliği için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Genishine Mezoterapi Solüsyonu; genital bölge dış cilt bakımı, bölgesel renk eşitsizlikleri, koyu görünüm bulunan bölgeler ve cilt tonu eşitsizliklerine yönelik geliştirilmiştir. Cilt tonunun daha eşit görünmesini destekler, daha aydınlık ve canlı bir görünüm sağlar, koyu görünümün azalmasına yardımcı olur ve cildin nemli ve bakımlı görünümünü destekler.",
    thumbnail: placeholders.genishineBottle,
    bottle: placeholders.genishineBottle,
    images: [placeholders.genishineBottle, placeholders.genishineStill],
    category: categories[7],
    ingredients: [],
    benefits: [
      "Cilt tonunun daha eşit görünmesini destekler.",
      "Daha aydınlık ve canlı bir görünüm sağlar.",
      "Koyu görünümün azalmasına yardımcı olur.",
      "Cildin nemli ve bakımlı görünümünü destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Genital bölge dış cilt bakımı, bölgesel renk eşitsizlikleri, koyu görünüm bulunan bölgeler ve cilt tonu eşitsizliklerinde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    featured: true,
    order: 8,
    volume: "5 × 10 ml",
    tagline: "Renk eşitliği & aydınlık",
    cardTint: "#f5efed",
    seo: {
      metaTitle: "Kesu Genishine | Mezoterapi Solüsyonu",
      metaDescription:
        "10 ml × 5 ampul. Genital bölge dış cilt bakımı ve renk eşitliğine yönelik Kesu Genishine. Cilt tonunun daha eşit görünmesini destekler.",
    },
  },
  {
    _id: "prod-salmon",
    title: "Kesu Salmon DNA",
    slug: "kesu-salmon",
    shortDescription:
      "Cilt yenileme, nem ve elastikiyet için mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu Salmon DNA Mezoterapi Solüsyonu; cilt yenileme ve bakım, elastikiyet kaybı, ince çizgi ve kırışıklık görünümü ile kuruluk ve nem kaybına yönelik geliştirilmiştir. Cildin nem dengesini destekler, daha canlı ve ışıltılı bir görünüm sağlar, cilt elastikiyetinin korunmasına yardımcı olur ve cilt yenilenmesini destekler.",
    thumbnail: placeholders.salmonBottle,
    bottle: placeholders.salmonBottle,
    images: [placeholders.salmonBottle, placeholders.salmonStill],
    category: categories[8],
    ingredients: [],
    benefits: [
      "Cildin nem dengesini destekler.",
      "Daha canlı ve ışıltılı bir görünüm sağlar.",
      "Cilt elastikiyetinin korunmasına yardımcı olur.",
      "Cilt yenilenmesini destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Cilt yenileme ve bakım, elastikiyet kaybı, ince çizgi ve kırışıklık görünümü ile kuruluk ve nem kaybında tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
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
      "Kore güzellik yaklaşımından ilham alan profesyonel bakım. Cildinize, ihtiyaçlarınıza ve doğal ifadenize odaklanan bir dünya.",
    primaryCta: { label: "Ürünleri Keşfet", href: "/urunler" },
    image: placeholders.editorial.hero,
    bottle: img("/images/products/six-lift-bottle.png", "Kesu Six Lift ampul"),
    caption: "Lifting",
    captionSub: "Sıkılık, Elastikiyet, Canlılık",
    captionHref: "/urunler/kesu-six-lift",
  },
  featuredEyebrow: "Öne çıkanlar",
  featuredTitle: "Farklı ihtiyaçlar.\nAynı özen.",
  featuredDescription:
    "Her cildin ihtiyacı farklı. Nemden sıkılığa, leke görünümünden ışıltıya — her formül net bir endikasyona odaklanır.",
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
        "Katalogda Six Lift, Anti-Aging, White Effect, Eyes, Hair, Acnera, BioCA, Genishine ve Salmon DNA mezoterapi solüsyonları yer alır.",
    },
    {
      question: "Kesu’nun Kore ile ilişkisi nedir?",
      answer:
        "Ürünler Kore menşeli değildir. Formüllerimiz, Kore güzellik yaklaşımından esinlenerek profesyonel estetik uygulamaları için geliştirilir.",
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
    "Kesu, profesyonel estetik ve medikal uygulamalar için geliştirilmiş lifting, botoks, anti-aging, hair ve eye care ürünleri sunmak amacıyla kurulmuş, yıllardır sektörde başarıyla kullanılan ve uzmanlar tarafından güvenle tercih edilen yenilikçi bir dermokozmetik markasıdır.",
  storyBlocks: [
    {
      body: "Uzun yıllara dayanan deneyimimiz ve profesyonellerden aldığımız güçlü geri bildirimler doğrultusunda geliştirdiğimiz tüm ürünlerimiz, etkinliği ve güvenilirliği dünya çapında kanıtlanmış Kore menşeli ileri teknoloji üretim süreçleriyle hazırlanır. Cilt gençleştirme, sıkılaşma, leke karşıtı bakım, saç güçlendirme ve göz çevresi problemlerine yönelik çözümlerimiz; doktorların ve kliniklerin beklentilerini karşılamanın ötesine geçerek uygulama sonuçlarını üst seviyeye taşır.",
    },
    {
      body: "Bilimsel yaklaşımımız, müşteri memnuniyetini esas alan hizmet anlayışımız ve sürekli gelişen ürün portföyümüz sayesinde Kesu, estetik dünyasında kalitesi ve sonuç odaklı yaklaşımıyla takdir edilen güçlü bir marka konumuna gelmiştir.",
    },
  ],
  philosophyTitle: "Misyonumuz",
  philosophyBody:
    "Kesu olarak misyonumuz; yüksek performanslı, stabil ve güvenli formüller ile uygulayıcıların başarısını artırmak, profesyonel estetisyen ve doktorlar tarafından yıllardır bize duyulan güveni daha da güçlendirmektir.",
};

export const certificatesPage: CertificatesPageContent = {
  eyebrow: "Sertifikalarımız",
  title: "Güven, belgelenir.",
  intro:
    "Kesu ürünleri; kalite, üretim ve klinik uygunluk standartlarını karşılayan belgelerle desteklenir. Sertifika görsellerini buradan inceleyebilirsiniz.",
  certificates: [],
};

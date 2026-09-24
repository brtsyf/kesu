import { createReadStream, existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { createClient } from "next-sanity";

const root = resolve(import.meta.dirname, "..");

const CATEGORIES = [
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

const PRODUCTS = [
  {
    _id: "prod-six-lift",
    title: "Kesu Six Lift",
    slug: "kesu-six-lift",
    categoryId: "cat-lifting",
    thumbnail: "public/images/products/six-lift.png",
    extras: ["public/images/products/six-lift-loci.png"],
    shortDescription:
      "Anında lifting ve sıkılaşma için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Lifting Mezoterapi Solüsyonu; sarkma ve elastikiyet kaybı, ince kırışıklıklar, donuk ve yorgun cilt ile cilt tonu eşitsizliklerine yönelik geliştirilmiştir. Somon DNA ile hücre yenileyici bakım sunar; kolajen üretimini destekler, cilt tonunu dengeler ve parlaklık kazandırır.",
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
    volume: "5 × 10 ml",
    tagline: "Sıkılık & elastikiyet",
    cardTint: "#eef1ec",
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
    categoryId: "cat-anti-aging",
    thumbnail: "public/images/products/anti-aging.png",
    extras: ["public/images/products/anti-aging-loci.png"],
    shortDescription:
      "İnce çizgi ve kırışıklık görünümünü azaltan mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Anti-Aging Mezoterapi Solüsyonu; mimik çizgileri, statik kırışıklıklar, mat ve canlılığını yitirmiş cilt, yaşlanma kaynaklı elastikiyet kaybı ile göz çevresi kırışıklıkları ve cilt kuruluğuna yönelik formüle edilmiştir. Nem dengesini destekler, serbest radikallere karşı koruma sağlar ve yorgun cildi canlandırır.",
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
    volume: "5 × 10 ml",
    tagline: "Nem & canlılık",
    cardTint: "#f6eeed",
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
    categoryId: "cat-whitening",
    thumbnail: "public/images/products/white-effect.png",
    extras: ["public/images/products/white-effect-loci.png"],
    shortDescription:
      "Leke ve hiperpigmentasyon görünümünü azaltan whitening solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu White Effect Mezoterapi Solüsyonu; güneş lekeleri, melazma, akne sonrası lekeler ile donuk cilt görünümüne yönelik geliştirilmiştir. Cilt tonunu eşitler, ışıltı kazandırır, serbest radikallere karşı koruma sunar ve retinol ile hücre yenilenmesini destekler. Yüz, boyun, el üstü ve dekolte bölgelerinde kullanılabilir.",
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
    volume: "5 × 10 ml",
    tagline: "Ton eşitliği & aydınlık",
    cardTint: "#f5f2e8",
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
    categoryId: "cat-eyes",
    thumbnail: "public/images/products/eyes.png",
    extras: ["public/images/products/eyes-loci.png"],
    shortDescription:
      "Göz çevresi ince çizgi, koyu halka ve yorgunluk görünümü için. 5 ml × 5 ampul.",
    description:
      "Kesu Eyes Mezoterapi Solüsyonu; göz altı torbaları, morluklar, ince çizgiler ve göz çevresi ton eşitsizliklerine yönelik özel formüle edilmiştir. İnce çizgilerin görünümünü azaltmaya yardımcı olur, koyu halka ve yorgunluk görünümünü hafifletir, aydınlatır, nemlendirir ve sıkılaştırıcı bir etki sunar.",
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
    volume: "5 × 5 ml",
    tagline: "Göz çevresi canlandırma",
    cardTint: "#f1f0f5",
    featured: true,
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
    categoryId: "cat-hair",
    thumbnail: "public/images/products/hair.png",
    extras: ["public/images/products/hair-loci.png"],
    shortDescription:
      "Saç dökülmesini azaltmaya ve kökleri beslemeye yardımcı solüsyon. 10 ml × 5 ampul.",
    description:
      "Kesu Hair Mezoterapi Solüsyonu; androgenetik alopesi, kadın tipi yaygın dökülme, mevsimsel dökülmeler, zayıf/ince teller ile stres veya gebelik sonrası dökülmeye yönelik geliştirilmiştir. Saç köklerini besler, yeni saç oluşumunu destekler, telleri kalınlaştırmaya yardımcı olur ve dolaşımı artırarak saç derisini canlandırır. Tüm saç tiplerine uygundur.",
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
    volume: "5 × 10 ml",
    tagline: "Saç kökü bakımı",
    cardTint: "#f3eee8",
    featured: true,
    order: 5,
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
    categoryId: "cat-acnera",
    thumbnail: "public/images/products/acnera.png",
    extras: ["public/images/products/acnera-loci.png"],
    shortDescription:
      "Akne, yağlanmaya eğilimli cilt ve gözenek görünümü için mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu Acnera Mezoterapi Solüsyonu; akne ve aktif sivilce, yağlanmaya eğilimli cilt, gözenek görünümü ve sivilce sonrası oluşan cilt problemlerine yönelik geliştirilmiştir. Akne ve sivilce görünümünün azalmasına yardımcı olur, cildin sebum dengesini destekler, gözeneklerin daha sıkı görünmesine yardımcı olur ve cildin daha temiz ve dengeli görünmesini destekler.",
    ingredients: [],
    benefits: [
      "Akne ve sivilce görünümünün azalmasına yardımcı olur.",
      "Cildin sebum dengesini destekler.",
      "Gözeneklerin daha sıkı görünmesine yardımcı olur.",
      "Cildin daha temiz ve dengeli görünmesini destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Akne ve aktif sivilce, yağlanmaya eğilimli cilt, gözenek görünümü ve sivilce sonrası oluşan cilt problemlerinde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    volume: "5 × 5 ml",
    tagline: "Akne & yağlanma",
    cardTint: "#e8f0ef",
    featured: true,
    order: 6,
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
    categoryId: "cat-bioca",
    thumbnail: "public/images/products/bioca.png",
    extras: ["public/images/products/bioca-loci.png"],
    shortDescription:
      "Yüz ve boyun için sıkılık ve toparlanma odaklı mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu BioCA Mezoterapi Solüsyonu; yüz ve boyun bölgesi, ince çizgi ve kırışıklık görünümü, elastikiyet kaybı ve cilt sarkması görünümüne yönelik geliştirilmiştir. Cildin daha sıkı görünmesini destekler, yüz hatlarının daha toparlanmış görünmesine yardımcı olur, cilt elastikiyetini destekler ve daha pürüzsüz ve genç bir görünüm sağlar.",
    ingredients: [],
    benefits: [
      "Cildin daha sıkı görünmesini destekler.",
      "Yüz hatlarının daha toparlanmış görünmesine yardımcı olur.",
      "Cilt elastikiyetini destekler.",
      "Daha pürüzsüz ve genç bir görünüm sağlar.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Yüz ve boyun bölgesi, ince çizgi ve kırışıklık görünümü, elastikiyet kaybı ve cilt sarkması görünümünde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    volume: "5 × 5 ml",
    tagline: "Sıkılık & toparlanma",
    cardTint: "#f6f1e6",
    featured: true,
    order: 7,
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
    categoryId: "cat-genishine",
    thumbnail: "public/images/products/genishine.png",
    extras: ["public/images/products/genishine-loci.png"],
    shortDescription:
      "Genital bölge dış cilt bakımı ve renk eşitliği için mezoterapi solüsyonu. 10 ml × 5 ampul.",
    description:
      "Kesu Genishine Mezoterapi Solüsyonu; genital bölge dış cilt bakımı, bölgesel renk eşitsizlikleri, koyu görünüm bulunan bölgeler ve cilt tonu eşitsizliklerine yönelik geliştirilmiştir. Cilt tonunun daha eşit görünmesini destekler, daha aydınlık ve canlı bir görünüm sağlar, koyu görünümün azalmasına yardımcı olur ve cildin nemli ve bakımlı görünümünü destekler.",
    ingredients: [],
    benefits: [
      "Cilt tonunun daha eşit görünmesini destekler.",
      "Daha aydınlık ve canlı bir görünüm sağlar.",
      "Koyu görünümün azalmasına yardımcı olur.",
      "Cildin nemli ve bakımlı görünümünü destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Genital bölge dış cilt bakımı, bölgesel renk eşitsizlikleri, koyu görünüm bulunan bölgeler ve cilt tonu eşitsizliklerinde tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    volume: "5 × 10 ml",
    tagline: "Renk eşitliği & aydınlık",
    cardTint: "#f5efed",
    featured: true,
    order: 8,
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
    categoryId: "cat-salmon",
    thumbnail: "public/images/products/salmon.png",
    extras: ["public/images/products/salmon-loci.png"],
    shortDescription:
      "Cilt yenileme, nem ve elastikiyet için mezoterapi solüsyonu. 5 ml × 5 ampul.",
    description:
      "Kesu Salmon DNA Mezoterapi Solüsyonu; cilt yenileme ve bakım, elastikiyet kaybı, ince çizgi ve kırışıklık görünümü ile kuruluk ve nem kaybına yönelik geliştirilmiştir. Cildin nem dengesini destekler, daha canlı ve ışıltılı bir görünüm sağlar, cilt elastikiyetinin korunmasına yardımcı olur ve cilt yenilenmesini destekler.",
    ingredients: [],
    benefits: [
      "Cildin nem dengesini destekler.",
      "Daha canlı ve ışıltılı bir görünüm sağlar.",
      "Cilt elastikiyetinin korunmasına yardımcı olur.",
      "Cilt yenilenmesini destekler.",
    ],
    usage:
      "Profesyonel mezoterapi uygulamalarında kullanılır. Cilt yenileme ve bakım, elastikiyet kaybı, ince çizgi ve kırışıklık görünümü ile kuruluk ve nem kaybında tercih edilir. Uygulama protokolü hekim veya yetkili uygulayıcı tarafından belirlenir.",
    volume: "5 × 5 ml",
    tagline: "Yenileme & nem",
    cardTint: "#f6eee6",
    featured: true,
    order: 9,
    seo: {
      metaTitle: "Kesu Salmon DNA | Mezoterapi Solüsyonu",
      metaDescription:
        "5 ml × 5 ampul. Cilt yenileme, nem ve elastikiyet odaklı Kesu Salmon DNA. Cildin nem dengesini destekler.",
    },
  },
];

const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !token) {
  throw new Error("Sanity project id veya yazma tokenı yok.");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

const imageCache = new Map();

async function uploadImage(relPath, alt) {
  const cached = imageCache.get(relPath);
  if (cached) return { ...cached, alt };
  const filePath = resolve(root, relPath);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
  });
  const image = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
  imageCache.set(relPath, image);
  return { ...image, alt };
}

async function seed() {
  for (const category of CATEGORIES) {
    await client.createOrReplace({
      _id: category._id,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
    });
    console.log(`kategori: ${category.title}`);
  }

  for (const product of PRODUCTS) {
    const thumbnail = await uploadImage(product.thumbnail, product.title);
    const extras = [];
    for (const extra of product.extras) {
      if (!existsSync(resolve(root, extra))) continue;
      extras.push(await uploadImage(extra, `${product.title} stüdyo`));
    }

    await client.createOrReplace({
      _id: product._id,
      _type: "product",
      title: product.title,
      slug: { _type: "slug", current: product.slug },
      shortDescription: product.shortDescription,
      description: product.description,
      thumbnail,
      images: extras.map((image, index) => ({
        ...image,
        _key: `img-${index + 1}`,
      })),
      category: { _type: "reference", _ref: product.categoryId },
      ingredients: product.ingredients,
      benefits: product.benefits,
      usage: product.usage,
      volume: product.volume,
      tagline: product.tagline,
      cardTint: product.cardTint,
      featured: product.featured,
      order: product.order,
      seo: product.seo,
    });
    console.log(`ürün: ${product.title}`);
  }
}

await seed();
console.log("tamam");

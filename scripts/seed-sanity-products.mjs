import { createReadStream } from "node:fs";
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
];

const PRODUCTS = [
  {
    _id: "prod-six-lift",
    title: "Kesu Six Lift",
    slug: "kesu-six-lift",
    categoryId: "cat-lifting",
    thumbnail: "public/images/products/six-lift.png",
    extras: ["public/images/products/six-lift-bottle-loci.png"],
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
    extras: [],
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
    extras: [],
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
    extras: [],
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
    extras: [],
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

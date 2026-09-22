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

export const siteSettings: SiteSettings = {
  siteName: "Kesu",
  tagline: "Bilimsel bakım. Sessiz lüks.",
  logoText: "KESU",
  navigation: [
    { label: "Ürünler", href: "/urunler" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "SSS", href: "/#sss" },
    { label: "İletişim", href: "/iletisim" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
  contact: {
    email: "hello@kesu.studio",
    phone: "+90 212 000 00 00",
    whatsapp: "+90 532 000 00 00",
    address: "Nişantaşı, İstanbul",
  },
  footerContent:
    "Kesu, cildin ritmine saygı duyan minimal formüller geliştirir. Az ürün, net sonuç.",
  seo: {
    metaTitle: "Kesu — Premium Bakım",
    metaDescription:
      "Modern bakım rutini için minimal, bilimsel ve premium cilt bakım ürünleri.",
  },
};

export const categories: Category[] = [
  {
    _id: "cat-serum",
    title: "Serum",
    slug: "serum",
    description: "Yoğun bakım formülleri",
  },
  {
    _id: "cat-cleanser",
    title: "Temizleyici",
    slug: "temizleyici",
    description: "Nazik günlük temizlik",
  },
  {
    _id: "cat-moisturizer",
    title: "Nemlendirici",
    slug: "nemlendirici",
    description: "Dengeleyici nem bariyeri",
  },
  {
    _id: "cat-treatment",
    title: "Tedavi",
    slug: "tedavi",
    description: "Hedefli çözümler",
  },
];

export const products: Product[] = [
  {
    _id: "prod-1",
    title: "Daily Renewal Serum",
    slug: "daily-renewal-serum",
    shortDescription: "Dengeli ve taze bir cilt için günlük bakım.",
    description:
      "Daily Renewal Serum, cildin doğal yenilenme döngüsünü desteklemek için tasarlandı. Hafif dokusu hızla emilir; bariyer dostu içerikler gün boyu ferah bir denge hissi bırakır.",
    thumbnail: img("https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=80", "Daily Renewal Serum şişesi"),
    images: [
      img("https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=80", "Daily Renewal Serum ürün görseli"),
      img("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80", "Serum doku detayı"),
      img("https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80", "Serum uygulama görseli"),
    ],
    category: categories[0],
    ingredients: [
      "Niacinamide %5",
      "Hyaluronic Acid",
      "Panthenol",
      "Centella Asiatica",
    ],
    benefits: [
      "Cilt bariyerini güçlendirir",
      "Görünür dengelenme sağlar",
      "Hafif ve yapışkan olmayan doku",
    ],
    usage:
      "Temizlik sonrası sabah ve akşam 2-3 damla uygulayın. Nemlendiricinizin altına kullanın.",
    featured: true,
    order: 1,
    seo: {
      metaTitle: "Daily Renewal Serum | Kesu",
      metaDescription:
        "Advanced daily care for a balanced and refreshed skin. Niacinamide ve hyaluronic acid formülü.",
    },
  },
  {
    _id: "prod-2",
    title: "Calm Barrier Cream",
    slug: "calm-barrier-cream",
    shortDescription: "Hassas ciltler için yatıştırıcı nem bariyeri.",
    description:
      "Calm Barrier Cream, cildi sakinleştirirken nemi uzun süre tutar. Ceramide kompleksı ile desteklenen formül, günlük stres ve çevresel etkilere karşı koruyucu bir katman oluşturur.",
    thumbnail: img("https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80", "Calm Barrier Cream"),
    images: [
      img("https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80", "Calm Barrier Cream ürün"),
      img("https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1600&q=80", "Krem dokusu"),
      img("https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=1600&q=80", "Nemlendirici detay"),
    ],
    category: categories[2],
    ingredients: ["Ceramide NP", "Squalane", "Allantoin", "Shea Butter"],
    benefits: [
      "Uzun süreli nem",
      "Kızarıklık görünümünü azaltır",
      "Zengin ama boğmayan doku",
    ],
    usage:
      "Serum sonrası cilde masaj yaparak uygulayın. Sabah ve akşam kullanıma uygundur.",
    featured: true,
    order: 2,
  },
  {
    _id: "prod-3",
    title: "Gentle Amino Cleanser",
    slug: "gentle-amino-cleanser",
    shortDescription: "Amino asit bazlı, dengeli günlük temizlik.",
    description:
      "Gentle Amino Cleanser, cildin doğal yağ dengesini bozmadan arındırır. Düşük pH formülü ferah bir temizlik hissi bırakır.",
    thumbnail: img("https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80", "Gentle Amino Cleanser"),
    images: [
      img("https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80", "Temizleyici ürün"),
      img("https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1600&q=80", "Temizlik rutini"),
    ],
    category: categories[1],
    ingredients: ["Amino Acid Surfactants", "Glycerin", "Green Tea Extract"],
    benefits: ["Nazik temizlik", "Bariyer dostu", "Sabah-akşam kullanım"],
    usage:
      "Islak cilde az miktarda alın, köpürtün ve durulayın. Göz çevresinden kaçının.",
    featured: true,
    order: 3,
  },
  {
    _id: "prod-4",
    title: "Clarity Essence",
    slug: "clarity-essence",
    shortDescription: "Aydınlık görünüm için hafif essence.",
    description:
      "Clarity Essence, cilde berrak ve dinlenmiş bir görünüm kazandırmak için formüle edildi. Katmanlanabilir yapısıyla serum öncesi kullanılır.",
    thumbnail: img("https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1600&q=80", "Clarity Essence"),
    images: [
      img("https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1600&q=80", "Clarity Essence şişe"),
      img("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=80", "Essence dokusu"),
    ],
    category: categories[0],
    ingredients: ["Tranexamic Acid", "Licorice Root", "Betaine"],
    benefits: ["Daha eşit ton görünümü", "Hafif essence dokusu", "Katmanlanabilir"],
    usage: "Temizlik sonrası pamuk veya ellerle cilde uygulayın.",
    featured: false,
    order: 4,
  },
  {
    _id: "prod-5",
    title: "Night Recovery Oil",
    slug: "night-recovery-oil",
    shortDescription: "Gece onarımı için hafif bakım yağı.",
    description:
      "Night Recovery Oil, gece boyunca cildi besler. Hızlı emilen bitkisel yağlar ile yumuşak bir bitiş bırakır.",
    thumbnail: img("https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1600&q=80", "Night Recovery Oil"),
    images: [
      img("https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1600&q=80", "Gece yağı ürün"),
      img("https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=1600&q=80", "Gece bakımı"),
    ],
    category: categories[3],
    ingredients: ["Squalane", "Rosehip Oil", "Vitamin E", "Jojoba"],
    benefits: ["Gece onarımı", "İpeksi his", "Kuru alanları besler"],
    usage: "Akşam rutininin son adımında 3-4 damla uygulayın.",
    featured: false,
    order: 5,
  },
  {
    _id: "prod-6",
    title: "Soft Focus Mist",
    slug: "soft-focus-mist",
    shortDescription: "Gün içi tazelik için mineral sis.",
    description:
      "Soft Focus Mist, gün içinde cildi ferahlatır ve makyaj üzerine de kullanılabilir. Mineral dengesi ile yumuşak bir bitiş verir.",
    thumbnail: img("https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1600&q=80", "Soft Focus Mist"),
    images: [
      img("https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1600&q=80", "Mist ürün görseli"),
      img("https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1600&q=80", "Sis detayı"),
    ],
    category: categories[3],
    ingredients: ["Thermal Water", "Aloe Vera", "Glycerin"],
    benefits: ["Anında ferahlık", "Makyaj üzeri kullanım", "Taşınabilir format"],
    usage: "Gözleri kapatarak 20 cm mesafeden 2-3 püskürtme yapın.",
    featured: false,
    order: 6,
  },
];

export const homePage: HomePageContent = {
  hero: {
    eyebrow: "Yeni koleksiyon",
    headline: "Bakımın\nyeni nesil hali.",
    description:
      "Az adımlı, yüksek etkili formüller. Cildin ihtiyacını dinleyen, premium ve minimal bir rutin.",
    primaryCta: { label: "Ürünleri Keşfet", href: "/urunler" },
    secondaryCta: { label: "Marka Hikayesi", href: "/hakkimizda" },
    image: img("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80", "Kesu bakım ürünü close-up"),
  },
  featuredEyebrow: "Öne çıkanlar",
  featuredTitle: "Rutininizin temel parçaları.",
  featuredDescription:
    "Her ürün tek başına güçlü; birlikte sade ve tutarlı bir bakım dili kurar.",
  philosophyEyebrow: "Felsefe",
  philosophyTitle: "Daha az ürün.\nDaha net sonuç.",
  philosophyBody:
    "Kesu, cilt bakımını bir performans gösterisine dönüştürmez. Formülleri sade tutar, içerikleri anlaşılır seçer ve her adımı bilinçli bırakır. Lüks; gürültüde değil, dokunuşta hissedilir.",
  philosophyImage: img(
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
    "Sakin cilt bakımı atmosferi",
  ),
  benefitsEyebrow: "Yaklaşım",
  benefitsTitle: "Bilimsel sadelik.",
  benefits: [
    {
      title: "Bariyer odaklı",
      description:
        "Formüller, cildin koruyucu katmanını zayıflatmadan beslemeyi hedefler.",
    },
    {
      title: "Şeffaf içerik",
      description:
        "Her ürünün ne işe yaradığını net anlatırız. Gereksiz karmaşa yok.",
    },
    {
      title: "Günlük konfor",
      description:
        "Hafif dokular, hızlı emilim ve gün boyu taşıması kolay bir his.",
    },
  ],
  benefitImage: img("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80", "Cilt bakımı close-up"),
  testimonial: {
    quote: "Gerçek bakım, cildin ihtiyacını dinlemekle başlar.",
    name: "Elif A.",
    product: "Daily Renewal Serum",
  },
  faqs: [
    {
      question: "Kesu ürünleri hangi cilt tipleri için uygun?",
      answer:
        "Formüllerimiz çoğunlukla hassas ve karma ciltler düşünülerek geliştirildi. Ürün sayfalarındaki kullanım önerilerini takip etmenizi öneririz.",
    },
    {
      question: "Rutinime nasıl başlamalıyım?",
      answer:
        "Temizleyici, serum ve nemlendirici ile sade bir üçlü rutine başlayın. İhtiyaca göre essence veya gece yağı ekleyebilirsiniz.",
    },
    {
      question: "İçerikler test edilmiş midir?",
      answer:
        "Kullandığımız aktifler dermatolojik literatürde bilinen, dengeli konsantrasyonlarda seçilir. Hayvanlar üzerinde test yapılmaz.",
    },
    {
      question: "Ürünler hakkında nasıl bilgi alabilirim?",
      answer:
        "Bu site ürünleri tanıtmak için tasarlandı. Detaylı bilgi, örnek veya iş birliği için iletişim sayfasından bize ulaşabilirsiniz.",
    },
  ],
  ctaTitle: "Bakım rutininizi\nyeniden keşfedin.",
  ctaDescription: "Sade bir koleksiyon. Net bir yön.",
  ctaLabel: "Koleksiyona Git",
  ctaHref: "/urunler",
};

export const aboutPage: AboutPageContent = {
  eyebrow: "Hakkımızda",
  title: "Sakin bir bakım dili.",
  intro:
    "Kesu, cilt bakımını abartısız bir zarafetle yeniden düşünmek için kuruldu. Amacımız daha fazla ürün satmak değil; daha doğru ürünlerle daha az gürültü yaratmak.",
  storyBlocks: [
    {
      body: "Her formül, cildin doğal dengesine saygı duyan bir yaklaşımla geliştirilir. Aktifler seçilirken yalnızca etki değil, dokunuş ve günlük kullanım konforu da ölçülür.",
      image: img(
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1600&q=80",
        "Doğal ışıkta model portresi",
      ),
    },
    {
      title: "Laboratuvardan rafta",
      body: "Araştırma, formülasyon ve ambalaj aynı dilde konuşur: temiz tipografi, yumuşak nötrler ve ürünü merkeze alan görsel anlatım.",
    },
    {
      body: "Kesu’nun dijital deneyimi de aynı titizlikle tasarlandı — boşluk, tipografi ve fotoğraf, markanın asıl araçlarıdır.",
      image: img("https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=80", "Premium bakım atmosferi"),
      fullWidth: true,
    },
  ],
  philosophyTitle: "Az ama öz.",
  philosophyBody:
    "Bir ürün rafta yer almadan önce üç soruyu geçer: Gerçekten gerekli mi? Günlük hayatta konforlu mu? Anlatımı net mi? Evet değilse, koleksiyona girmez.",
};

export const blogPosts: BlogPost[] = [
  {
    _id: "blog-1",
    title: "Üç adımlı sabah rutini",
    slug: "uc-adimli-sabah-rutini",
    excerpt:
      "Temizlik, serum ve nem — sabah bakımını sade tutmanın nedeni ve nasıl uygulanacağı.",
    content:
      "Sabah rutini karmaşık olmak zorunda değil. Cildi nazikçe temizleyin, ihtiyaca uygun bir serum uygulayın ve nem bariyerini destekleyin. Bu üç adım, çoğu cilt için yeterli bir temel oluşturur.\n\nKesu’da her ürün bu sade akış için tasarlandı. Daha fazla adım eklemek çoğu zaman daha iyi sonuç demek değildir; tutarlılık daha değerlidir.",
    coverImage: img("https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80", "Sabah bakım rutini"),
    category: "Rutin",
    publishedAt: "2026-03-12",
    author: "Kesu Editör",
  },
  {
    _id: "blog-2",
    title: "Niacinamide neden herkese göre?",
    slug: "niacinamide-neden-herkese-gore",
    excerpt:
      "Görünür denge, bariyer desteği ve hafif doku — niacinamide’in günlük bakımdaki yeri.",
    content:
      "Niacinamide, bakım dünyasında hem popüler hem de iyi belgelenmiş bir aktif. Dengeli konsantrasyonlarda kullanıldığında cildin görünümünü yumuşatabilir ve bariyer fonksiyonunu destekleyebilir.\n\nDaily Renewal Serum formülümüzde %5 niacinamide, hyaluronic acid ve panthenol ile birlikte çalışır.",
    coverImage: img("https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=80", "Serum içerik görseli"),
    category: "İçerikler",
    publishedAt: "2026-02-20",
    author: "Kesu Lab",
  },
  {
    _id: "blog-3",
    title: "Kışın bariyer bakımı",
    slug: "kisin-bariyer-bakimi",
    excerpt:
      "Soğuk hava ve kapalı ortamlar cildi zorlar. Nem ve lipid dengesini korumanın yolları.",
    content:
      "Kış aylarında cilt daha fazla nem kaybedebilir. Temizlikte aşırı köpükten kaçının, serum sonrası iyi bir nemlendirici kullanın ve gece ihtiyaca göre yağ bazlı bir adım ekleyin.",
    coverImage: img("https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=80", "Kış bakım atmosferi"),
    category: "Mevsim",
    publishedAt: "2026-01-08",
    author: "Kesu Editör",
  },
];

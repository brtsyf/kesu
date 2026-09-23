import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";

type NeedLink = {
  label: string;
  href: string;
};

type NeedCard = {
  title: string;
  description: string;
  tint: string;
  links: NeedLink[];
};

const NEEDS: NeedCard[] = [
  {
    title: "Nem & canlılık",
    description: "Kuruluk ve donukluğa karşı, daha taze bir görünüm için.",
    tint: "#f6eeed",
    links: [{ label: "Anti-Aging", href: "/urunler/kesu-anti-aging" }],
  },
  {
    title: "Sıkılık & elastikiyet",
    description: "Daha toparlanmış ve dengeli bir cilt görünümünü destekler.",
    tint: "#eef1ec",
    links: [{ label: "Lifting", href: "/urunler/kesu-six-lift" }],
  },
  {
    title: "Ton eşitliği & aydınlık",
    description: "Cilt tonu eşitsizliği ve donukluk için aydınlık bakım.",
    tint: "#f5f2e8",
    links: [{ label: "White Effect", href: "/urunler/kesu-white-effect" }],
  },
  {
    title: "Denge & arınmış görünüm",
    description: "Yoğunlaşmış ve lekeli görünümü daha ferah bir hale getirir.",
    tint: "#f3efe8",
    links: [{ label: "White Effect", href: "/urunler/kesu-white-effect" }],
  },
  {
    title: "Göz çevresine özen",
    description: "Nem, ince çizgi ve koyu halka görünümü için hassas bakım.",
    tint: "#f1f0f5",
    links: [{ label: "Eyes", href: "/urunler/kesu-eyes" }],
  },
  {
    title: "Saç & saç derisi",
    description: "Daha güçlü ve dolgun görünen saç için bütüncül yaklaşım.",
    tint: "#f3eee8",
    links: [{ label: "Hair", href: "/urunler/kesu-hair" }],
  },
];

export function NeedsSection() {
  return (
    <section className="bg-[#fafaf7] pb-24 md:pb-32">
      <Container>
        <Reveal>
          <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end">
            <h2 className="heading-section text-balance lg:col-span-7">
              <span className="block">Bakımın tek bir</span>
              <span className="block">tanımı yok.</span>
            </h2>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-[#7a776e] lg:col-span-5 lg:justify-self-end">
              Her cildin, her saçın ve her uygulamanın ihtiyacı farklıdır.
              Endikasyona göre net formüller.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEEDS.map((need, index) => (
            <Reveal key={need.title} delay={index * 0.04}>
              <article
                className="flex h-full min-h-[13.5rem] flex-col justify-between rounded-[1.35rem] px-7 py-7 md:min-h-[15rem] md:px-8 md:py-8"
                style={{ backgroundColor: need.tint }}
              >
                <div>
                  <h3 className="text-[1.2rem] font-medium tracking-[-0.03em] text-[#141414]">
                    {need.title}
                  </h3>
                  <p className="mt-2 max-w-[18rem] text-[0.9rem] leading-relaxed text-[#7a776e]">
                    {need.description}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {need.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-[0.88rem] text-[#141414] transition-colors duration-400 hover:text-[#141414]/70"
                    >
                      <span className="border-b border-[#141414]/25 pb-px">
                        {link.label}
                      </span>
                      <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
                    </Link>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

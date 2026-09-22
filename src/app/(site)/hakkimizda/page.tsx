import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getAboutPage } from "@/lib/sanity/fetch";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: "Hakkımızda | Kesu",
  description: "Kesu marka hikayesi ve bakım felsefesi.",
  path: "/hakkimizda",
});

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <article className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <Reveal>
          <p className="eyebrow mb-5">{page.eyebrow}</p>
          <h1 className="heading-section text-balance max-w-4xl mb-8">
            {page.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-20 md:mb-28">
            {page.intro}
          </p>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {page.storyBlocks.map((block, index) => {
            const src = block.image ? getImageUrl(block.image, 1600) : "";
            return (
              <Reveal key={`${block.title ?? "block"}-${index}`}>
                <div
                  className={cn(
                    "grid gap-10",
                    block.fullWidth
                      ? "grid-cols-1"
                      : "lg:grid-cols-12 lg:gap-16 items-center",
                  )}
                >
                  {src ? (
                    <div
                      className={cn(
                        "relative overflow-hidden bg-surface",
                        block.fullWidth
                          ? "aspect-[21/9] md:aspect-[2.4/1]"
                          : "lg:col-span-7 aspect-[4/5] md:aspect-[5/4]",
                        !block.fullWidth && index % 2 === 1 && "lg:order-2",
                      )}
                    >
                      <Image
                        src={src}
                        alt={getImageAlt(block.image, block.title ?? "Kesu")}
                        fill
                        sizes={
                          block.fullWidth
                            ? "100vw"
                            : "(max-width: 1024px) 100vw, 55vw"
                        }
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div
                    className={cn(
                      block.fullWidth
                        ? "max-w-2xl"
                        : "lg:col-span-5",
                      !block.fullWidth && index % 2 === 1 && "lg:order-1",
                    )}
                  >
                    {block.title ? (
                      <h2 className="heading-display mb-5">{block.title}</h2>
                    ) : null}
                    <p className="text-muted leading-relaxed text-lg">
                      {block.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-24 md:mt-32 pt-16 border-t border-border max-w-3xl">
          <h2 className="heading-display mb-6">{page.philosophyTitle}</h2>
          <p className="text-muted text-lg leading-relaxed">
            {page.philosophyBody}
          </p>
        </Reveal>
      </Container>
    </article>
  );
}

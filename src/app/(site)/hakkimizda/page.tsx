import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { getAboutPage } from "@/lib/sanity/fetch";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: "Hakkımızda | Kesu",
  description:
    "Kesu; profesyonel estetik ve medikal uygulamalar için Kore teknolojisiyle geliştirilmiş yenilikçi bir dermokozmetik markasıdır.",
  path: "/hakkimizda",
});

export default async function AboutPage() {
  const page = await getAboutPage();
  const titleLines = page.title.split("\n");

  return (
    <article className="pt-[calc(var(--header-height)+4rem)] pb-24 md:pb-32">
      <Container>
        <Reveal className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <p className="eyebrow mb-5">{page.eyebrow}</p>
          <h1 className="heading-section text-balance mb-10">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed text-pretty">
            {page.intro}
          </p>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {page.storyBlocks.map((block, index) => {
            const src = block.image ? getImageUrl(block.image, 1600) : "";
            const textOnly = !src;

            return (
              <Reveal key={`${block.title ?? "block"}-${index}`}>
                {textOnly ? (
                  <div className="max-w-3xl mx-auto text-center">
                    {block.title ? (
                      <h2 className="heading-display mb-6">{block.title}</h2>
                    ) : null}
                    <p className="text-muted leading-relaxed text-lg md:text-xl text-pretty">
                      {block.body}
                    </p>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "grid gap-10",
                      block.fullWidth
                        ? "grid-cols-1"
                        : "lg:grid-cols-12 lg:gap-16 items-center",
                    )}
                  >
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
                    <div
                      className={cn(
                        block.fullWidth
                          ? "max-w-3xl mx-auto text-center pt-2"
                          : "lg:col-span-5",
                        !block.fullWidth && index % 2 === 1 && "lg:order-1",
                      )}
                    >
                      {block.title ? (
                        <h2 className="heading-display mb-5">{block.title}</h2>
                      ) : null}
                      <p className="text-muted leading-relaxed text-lg text-pretty">
                        {block.body}
                      </p>
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-24 md:mt-32 pt-16 border-t border-border max-w-3xl mx-auto text-center">
          <h2 className="heading-display mb-6">{page.philosophyTitle}</h2>
          <p className="text-muted text-lg md:text-xl leading-relaxed text-pretty">
            {page.philosophyBody}
          </p>
        </Reveal>
      </Container>
    </article>
  );
}

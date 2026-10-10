import { Container } from "@/components/ui/Container";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { isLocale, type LocaleRoute } from "@/lib/i18n/config";
import { getCookiePolicy } from "@/lib/i18n/cookie-policy";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getCookiePolicy(lang);
  return buildMetadata({
    title: copy.title,
    description: copy.intro,
    path: "/cerez-politikasi",
    locale: lang,
  });
}

export default async function CookiePolicyPage({ params }: LocaleRoute) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = getCookiePolicy(lang);
  const settings = await getSiteSettings();
  const { address, email, phone, whatsapp } = settings.contact;
  const identity = [
    [copy.identity.name, settings.siteName],
    [copy.identity.address, address],
    [copy.identity.email, email],
    [copy.identity.phone, phone],
    [copy.identity.whatsapp, whatsapp],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()));

  return (
    <section className="bg-[#fafaf7] pt-[calc(var(--header-height)+3.5rem)] pb-24 md:pb-32">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5">{copy.eyebrow}</p>
          <h1 className="heading-section mb-6 text-balance">{copy.title}</h1>
          <p className="text-[1.02rem] leading-[1.8] text-[#6b6860]">{copy.intro}</p>
          <p className="mt-4 text-[0.85rem] text-muted">{copy.updated}</p>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.identity.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.identity.body}
            </p>
            <dl className="mt-6 border border-border">
              {identity.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="text-[0.78rem] tracking-[0.08em] text-muted uppercase">
                    {label}
                  </dt>
                  <dd className="text-[0.98rem] whitespace-pre-line text-[#141414]">
                    {label === copy.identity.email ? (
                      <a href={`mailto:${value}`} className="underline underline-offset-4">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.types.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.types.intro}
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {copy.types.items.map((item) => (
                <li key={item.title}>
                  <h3 className="text-[1rem] text-[#141414]">{item.title}</h3>
                  <p className="mt-1 text-[1.02rem] leading-[1.8] text-[#6b6860]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.inventory.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.inventory.intro}
            </p>
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="w-full min-w-[44rem] text-left text-[0.92rem]">
                <thead className="bg-[#f4f3ef] text-[0.75rem] tracking-[0.08em] text-muted uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">{copy.inventory.columns.name}</th>
                    <th className="px-4 py-3 font-medium">{copy.inventory.columns.provider}</th>
                    <th className="px-4 py-3 font-medium">{copy.inventory.columns.type}</th>
                    <th className="px-4 py-3 font-medium">{copy.inventory.columns.purpose}</th>
                    <th className="px-4 py-3 font-medium">{copy.inventory.columns.duration}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.inventory.rows.map((row) => (
                    <tr key={row.name} className="border-t border-border align-top">
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-[#141414]">{row.name}</td>
                      <td className="px-4 py-3 text-[#6b6860]">{row.provider}</td>
                      <td className="px-4 py-3 text-[#6b6860]">{row.type}</td>
                      <td className="px-4 py-3 leading-relaxed text-[#6b6860]">{row.purpose}</td>
                      <td className="px-4 py-3 text-[#6b6860]">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[0.95rem] leading-[1.7] text-[#6b6860]">
              {copy.inventory.note}
            </p>
            <h3 className="mt-8 text-[1rem] text-[#141414]">{copy.inventory.sessionTitle}</h3>
            <p className="mt-2 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.inventory.sessionBody}
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.legal.title}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {copy.legal.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[1.02rem] leading-[1.8] text-[#6b6860]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.transfers.title}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {copy.transfers.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[1.02rem] leading-[1.8] text-[#6b6860]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.35rem] tracking-[-0.02em] text-[#141414]">
              {copy.rights.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.rights.intro}
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-2 ps-5 text-[1.02rem] leading-[1.7] text-[#6b6860]">
              {copy.rights.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.rights.apply}
            </p>
            {email ? (
              <p className="mt-3">
                <a
                  href={`mailto:${email}`}
                  className="text-[1rem] text-[#141414] underline underline-offset-4"
                >
                  {email}
                </a>
              </p>
            ) : null}
            <h3 className="mt-8 text-[1rem] text-[#141414]">{copy.rights.browserTitle}</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {copy.rights.browsers.map((browser) => (
                <li key={browser.name}>
                  <p className="text-[1rem] text-[#141414]">{browser.name}</p>
                  <p className="mt-1 text-[1.02rem] leading-[1.8] text-[#6b6860]">
                    {browser.steps}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-[#6b6860]">
              {copy.rights.blockNote}
            </p>
          </section>
        </article>
      </Container>
    </section>
  );
}

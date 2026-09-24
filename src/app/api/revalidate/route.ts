import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function fromStudio(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    const ref = new URL(referer);
    const here = new URL(request.url);
    return ref.origin === here.origin && ref.pathname.startsWith("/studio");
  } catch {
    return false;
  }
}

function authorized(request: Request) {
  if (fromStudio(request)) return true;

  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

function refreshSite() {
  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/urunler", "layout");
  revalidatePath("/urunler", "page");
  revalidatePath("/urunler/[slug]", "page");
  revalidatePath("/sertifikalarimiz", "page");
  revalidatePath("/hakkimizda", "page");
  revalidatePath("/iletisim", "page");
  revalidatePath("/sitemap.xml");
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }

  refreshSite();
  return NextResponse.json({ ok: true, now: Date.now() });
}

export async function GET(request: Request) {
  return POST(request);
}

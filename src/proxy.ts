import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isLocale,
  localeCookie,
  preferredLocale,
} from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (isLocale(segment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-kesu-locale", segment);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(localeCookie, segment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const fromCookie = request.cookies.get(localeCookie)?.value;
  const locale = isLocale(fromCookie)
    ? fromCookie
    : preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|studio|_next/static|_next/image|.*\\..*).*)"],
};

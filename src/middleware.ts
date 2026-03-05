import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionCookieName, isAdminSessionValid } from "@/lib/auth";

const ADMIN_SESSION_COOKIE = getAdminSessionCookieName();

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/admin");
}

function isLoginPage(pathname: string): boolean {
  return pathname === "/admin" || pathname === "/admin/";
}

function isReservedSlug(segment: string): boolean {
  const reserved = [
    "admin",
    "api",
    "_next",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
  ];
  return reserved.includes(segment.toLowerCase());
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (isAdminRoute(pathname)) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (isLoginPage(pathname)) {
      if (sessionCookie && isAdminSessionValid(sessionCookie)) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    if (!sessionCookie || !isAdminSessionValid(sessionCookie)) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (firstSegment && isReservedSlug(firstSegment)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/:clientSlug*"],
};

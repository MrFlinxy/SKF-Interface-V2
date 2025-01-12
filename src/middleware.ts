import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    raw: false,
    secret: environment.SECRET_KEY,
  });

  const { pathname } = request.nextUrl;

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "/auth/register/success"
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    if (!token?.user?.data?.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/member")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};

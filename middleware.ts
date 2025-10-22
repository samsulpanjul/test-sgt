import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/products"];

const guestRoutes = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // PROTECTED ROUTE
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // GUEST ROUTE
  if (guestRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const redirectTo =
        req.nextUrl.searchParams.get("redirect") || "/products";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/auth/:path*"],
};

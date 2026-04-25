import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/creator", "/admin", "/pages/new"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("promohub_token")?.value ??
    (request.headers.get("authorization")?.startsWith("Bearer ")
      ? request.headers.get("authorization")?.slice(7)
      : null);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/creator/:path*", "/admin/:path*", "/pages/new", "/pages/:path*/edit"]
};

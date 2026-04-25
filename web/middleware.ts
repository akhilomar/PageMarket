import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRequestToken, verifyToken } from "./lib/auth";

const protectedPaths = ["/dashboard", "/creator", "/admin", "/pages/new"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = getRequestToken(request);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/creator/:path*", "/admin/:path*", "/pages/new", "/pages/:path*/edit"]
};


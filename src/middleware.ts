import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("next-auth.session-token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const isProtectedPath =
    path.startsWith("/dashboard")

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/signin", 
    "/signup", 
    "/dashboard",
    "/dashboard/:path*"
  ],
};

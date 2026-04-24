import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { doctorOnlyRoutes, patientOnlyRoutes } from "@/lib/roles";

const protectedPrefixes = ["/dashboard", "/patients", "/appointments", "/reports", "/settings", "/portal"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAuthenticated = Boolean(token?.sub);
  const pathname = request.nextUrl.pathname;

  if (matchesRoute(pathname, protectedPrefixes) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!token?.role) {
    return NextResponse.next();
  }

  if (matchesRoute(pathname, doctorOnlyRoutes) && token.role !== "DOCTOR") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (matchesRoute(pathname, patientOnlyRoutes) && token.role !== "PATIENT") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/login") {
    const destination = token.role === "DOCTOR" ? "/dashboard" : "/portal";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

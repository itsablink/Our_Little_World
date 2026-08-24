import { NextResponse } from "next/server";
import { SESSION_COOKIE, GATE_COOKIE, expectedSessionValue, expectedGateValue } from "@/lib/session";

const GATED_SECTIONS = ["/home", "/quiz", "/diary", "/letters", "/photos"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const gate = request.cookies.get(GATE_COOKIE)?.value;

  const hasSession = session === expectedSessionValue();
  const hasGate = gate === expectedGateValue();
  const isGatedSection = GATED_SECTIONS.some((section) => pathname.startsWith(section));

  if (pathname === "/login" && hasSession && hasGate) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (pathname.startsWith("/challenge") && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGatedSection && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGatedSection && hasSession && !hasGate) {
    return NextResponse.redirect(new URL("/challenge", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/challenge/:path*", "/home/:path*", "/quiz/:path*", "/diary/:path*", "/letters/:path*", "/photos/:path*"]
};

import { NextResponse } from "next/server";
import { SESSION_COOKIE, GATE_COOKIE, expectedSessionValue, expectedGateValue } from "@/lib/session";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const gate = request.cookies.get(GATE_COOKIE)?.value;

  const hasSession = session === expectedSessionValue();
  const hasGate = gate === expectedGateValue();

  if (pathname === "/login") {
    if (hasSession && hasGate) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    if (hasSession && !hasGate) {
      return NextResponse.redirect(new URL("/challenge", request.url));
    }
    return NextResponse.next();
  }

  // Any protected route requires valid session
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/challenge") && hasSession && hasGate) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!hasGate && !pathname.startsWith("/challenge")) {
    return NextResponse.redirect(new URL("/challenge", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

import { NextResponse } from "next/server";
import { GATE_COOKIE, SESSION_COOKIE, cookieOptions, expectedGateValue, expectedSessionValue } from "@/lib/session";

export async function POST(request) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (session !== expectedSessionValue()) {
    return NextResponse.json({ ok: false, message: "Session expired. Please log in again." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE, expectedGateValue(), cookieOptions);
  return res;
}

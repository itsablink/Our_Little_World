import { NextResponse } from "next/server";
import { SESSION_COOKIE, GATE_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  res.cookies.delete(GATE_COOKIE);
  return res;
}

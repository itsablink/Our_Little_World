import { NextResponse } from "next/server";
import { SESSION_COOKIE, cookieOptions, expectedSessionValue } from "@/lib/session";

export async function POST(request) {
  const { id, password } = await request.json();

  const validId = process.env.LOGIN_ID;
  const validPassword = process.env.LOGIN_PASSWORD;

  if (!validId || !validPassword) {
    return NextResponse.json(
      { ok: false, message: "Server isn't configured yet — missing LOGIN_ID / LOGIN_PASSWORD." },
      { status: 500 }
    );
  }

  if (id === validId && password === validPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, expectedSessionValue(), cookieOptions);
    return res;
  }

  return NextResponse.json({ ok: false, message: "That's not it. Try again." }, { status: 401 });
}

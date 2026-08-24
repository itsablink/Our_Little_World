import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Screenshot upload endpoint deprecated — Message Memories are text-based." },
    { status: 410 }
  );
}

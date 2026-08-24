import { NextResponse } from "next/server";
import {
  getMessagesFromDb,
  saveMessageToDb,
  deleteMessageFromDb
} from "@/lib/db/messageService";

export async function GET() {
  try {
    const memories = await getMessagesFromDb();
    return NextResponse.json({ ok: true, memories });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to load messages" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !Array.isArray(body.screenshots) || body.screenshots.length === 0) {
      return NextResponse.json({ ok: false, error: "Title and screenshots are required" }, { status: 400 });
    }
    const memory = await saveMessageToDb(body);
    return NextResponse.json({ ok: true, memory });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to save memory" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing memory ID" }, { status: 400 });
    }
    await deleteMessageFromDb(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete memory" }, { status: 500 });
  }
}

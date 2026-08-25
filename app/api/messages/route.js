import { NextResponse } from "next/server";
import {
  getMessagesFromDb,
  saveMessageToDb,
  updateMessageInDb,
  deleteMessageFromDb
} from "@/lib/db/messageService";

export async function GET() {
  try {
    const memories = await getMessagesFromDb();
    return NextResponse.json({ ok: true, memories });
  } catch (error) {
    console.error("[API /api/messages GET Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to load messages from database" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.message) {
      return NextResponse.json({ ok: false, error: "Title and message content are required" }, { status: 400 });
    }
    const memory = await saveMessageToDb(body);
    return NextResponse.json({ ok: true, memory });
  } catch (error) {
    console.error("[API /api/messages POST Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to save message to database" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...patch } = await request.json();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing memory ID" }, { status: 400 });
    }
    const updated = await updateMessageInDb(id, patch);
    return NextResponse.json({ ok: true, memory: updated });
  } catch (error) {
    console.error("[API /api/messages PUT Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to update message in database" },
      { status: 500 }
    );
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
    console.error("[API /api/messages DELETE Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to delete message from database" },
      { status: 500 }
    );
  }
}

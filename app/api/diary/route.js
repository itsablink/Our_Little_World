import { NextResponse } from "next/server";
import {
  getDiaryEntriesFromDb,
  saveDiaryEntryToDb,
  updateDiaryEntryInDb,
  deleteDiaryEntryFromDb
} from "@/lib/db/diaryService";

export async function GET() {
  try {
    const entries = await getDiaryEntriesFromDb();
    return NextResponse.json({ ok: true, entries });
  } catch (error) {
    console.error("[API /api/diary GET Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to load diary entries from database" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.date || !body.heading || !body.body) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    const entry = await saveDiaryEntryToDb(body);
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    console.error("[API /api/diary POST Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to save diary entry to database" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...patch } = await request.json();
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing entry ID" }, { status: 400 });
    }
    const updated = await updateDiaryEntryInDb(id, patch);
    return NextResponse.json({ ok: true, entry: updated });
  } catch (error) {
    console.error("[API /api/diary PUT Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to update diary entry in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing entry ID" }, { status: 400 });
    }
    await deleteDiaryEntryFromDb(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[API /api/diary DELETE Error]", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to delete diary entry from database" },
      { status: 500 }
    );
  }
}

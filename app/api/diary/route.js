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
    return NextResponse.json({ ok: false, error: "Failed to load entries" }, { status: 500 });
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
    return NextResponse.json({ ok: false, error: "Failed to save entry" }, { status: 500 });
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
    return NextResponse.json({ ok: false, error: "Failed to update entry" }, { status: 500 });
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
    return NextResponse.json({ ok: false, error: "Failed to delete entry" }, { status: 500 });
  }
}

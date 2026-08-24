import { NextResponse } from "next/server";

/**
 * Handles screenshot uploads for Message Memories.
 *
 * In production with Vercel Blob (BLOB_READ_WRITE_TOKEN configured), this endpoint
 * uploads binary image files directly to persistent object storage and returns
 * the public asset URL.
 *
 * In local development (without token), it returns base64 image data URLs so local
 * development works without external dependencies.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });
    }

    // Check if Vercel Blob read/write token is present in production
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`messages/${Date.now()}-${file.name}`, file, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN
        });
        return NextResponse.json({ ok: true, url: blob.url });
      } catch (err) {
        console.error("[Vercel Blob Upload Error]:", err);
      }
    }

    // Local development fallback — convert file to base64 data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({ ok: true, url: dataUrl });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}

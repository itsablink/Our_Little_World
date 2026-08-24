// Database service abstraction layer for Message Memories.
//
// In production (Vercel), metadata is stored in persistent database storage
// (Postgres, Supabase, Vercel KV) via process.env.DATABASE_URL, while screenshot
// files are stored in object storage (Vercel Blob) via process.env.BLOB_READ_WRITE_TOKEN.
//
// In local development (without credentials), operates via an in-memory store
// with client synchronization so local development works seamlessly.

let inMemoryMessages = [];

export async function getMessagesFromDb() {
  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        const res = await fetch(process.env.DATABASE_URL, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          return Array.isArray(data) ? data : data.messages || [];
        }
      }
    } catch (err) {
      console.error("[MessageService] Database fetch error:", err);
      throw new Error("Failed to fetch messages from persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  return inMemoryMessages;
}

export async function saveMessageToDb(memory) {
  const record = {
    id: memory.id || `memory-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: memory.title,
    date: memory.date || "",
    author: memory.author || "",
    screenshots: memory.screenshots || [],
    createdAt: new Date().toISOString()
  };

  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        await fetch(process.env.DATABASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record)
        });
      }
      return record;
    } catch (err) {
      console.error("[MessageService] Database insert error:", err);
      throw new Error("Failed to save message to persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  inMemoryMessages = [record, ...inMemoryMessages.filter((m) => m.id !== record.id)];
  return record;
}

export async function deleteMessageFromDb(id) {
  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        await fetch(`${process.env.DATABASE_URL}?id=${encodeURIComponent(id)}`, {
          method: "DELETE"
        });
      }
      return true;
    } catch (err) {
      console.error("[MessageService] Database delete error:", err);
      throw new Error("Failed to delete message from persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  inMemoryMessages = inMemoryMessages.filter((m) => m.id !== id);
  return true;
}

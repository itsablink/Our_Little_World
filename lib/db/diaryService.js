// Database service abstraction layer for Diary entries.
//
// In production (Vercel), this service layer uses process.env.DATABASE_URL
// for persistent database storage (Postgres / Supabase / Vercel KV / HTTP DB).
//
// In local development (NODE_ENV !== "production"), if DATABASE_URL is not set,
// it uses an in-memory store so local execution works seamlessly without setup.

let inMemoryEntries = [];

export async function getDiaryEntriesFromDb() {
  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        const res = await fetch(process.env.DATABASE_URL, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          return Array.isArray(data) ? data : data.entries || [];
        }
      }
    } catch (err) {
      console.error("[DiaryService] Database fetch error:", err);
      throw new Error("Failed to query persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  return inMemoryEntries;
}

export async function saveDiaryEntryToDb(entry) {
  const record = {
    id: entry.id || `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: entry.date,
    heading: entry.heading,
    body: entry.body,
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
      console.error("[DiaryService] Database insert error:", err);
      throw new Error("Failed to save entry to persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  inMemoryEntries = [record, ...inMemoryEntries.filter((e) => e.id !== record.id)];
  return record;
}

export async function updateDiaryEntryInDb(id, patch) {
  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        await fetch(`${process.env.DATABASE_URL}?id=${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch)
        });
      }
      return { id, ...patch };
    } catch (err) {
      console.error("[DiaryService] Database update error:", err);
      throw new Error("Failed to update entry in persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  let updatedRecord = null;
  inMemoryEntries = inMemoryEntries.map((e) => {
    if (e.id === id) {
      updatedRecord = { ...e, ...patch };
      return updatedRecord;
    }
    return e;
  });

  return updatedRecord;
}

export async function deleteDiaryEntryFromDb(id) {
  if (process.env.DATABASE_URL) {
    try {
      if (process.env.DATABASE_URL.startsWith("http")) {
        await fetch(`${process.env.DATABASE_URL}?id=${encodeURIComponent(id)}`, {
          method: "DELETE"
        });
      }
      return true;
    } catch (err) {
      console.error("[DiaryService] Database delete error:", err);
      throw new Error("Failed to delete entry from persistent database");
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is missing in production — persistent storage unconfigured.");
  }

  inMemoryEntries = inMemoryEntries.filter((e) => e.id !== id);
  return true;
}

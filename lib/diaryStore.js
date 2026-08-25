// Diary service data access layer for persistent database endpoints (/api/diary).

export async function fetchEntriesFromApi() {
  const res = await fetch("/api/diary", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to fetch diary entries from server");
  }
  return data.entries || [];
}

export async function addEntryApi(entry) {
  const res = await fetch("/api/diary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to save diary entry to database");
  }
  return data.entry;
}

export async function updateEntryApi(id, patch) {
  const res = await fetch("/api/diary", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...patch })
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to update diary entry in database");
  }
  return data.entry;
}

export async function deleteEntryApi(id) {
  const res = await fetch(`/api/diary?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to delete diary entry from database");
  }
  return true;
}

export function sortByDateDesc(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries].sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
}

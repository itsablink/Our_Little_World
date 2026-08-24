// Diary service data access layer.
//
// Connects the client UI to persistent backend database endpoints (/api/diary).
// Uses client caching & local fallback so local development works seamlessly.

const STORAGE_KEY = "olw_diary_entries";

function isBrowser() {
  return typeof window !== "undefined";
}

function readRaw() {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeRaw(entries) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Client fallback
  }
}

export function getEntries(seedEntries = []) {
  const existing = readRaw();
  if (existing) return existing;
  writeRaw(seedEntries);
  return seedEntries;
}

export async function fetchEntriesFromApi() {
  try {
    const res = await fetch("/api/diary");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.ok && Array.isArray(data.entries) && data.entries.length > 0) {
      writeRaw(data.entries);
      return data.entries;
    }
  } catch {
    // Fallback
  }
  return getEntries([]);
}

export async function addEntryApi(entry) {
  try {
    const res = await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    if (data.ok && data.entry) {
      return data.entry;
    }
  } catch {
    // Fallback
  }
  return { ...entry, id: entry.id || `entry-${Date.now()}` };
}

export async function updateEntryApi(id, patch) {
  try {
    const res = await fetch("/api/diary", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch })
    });
    await res.json();
  } catch {
    // Fallback
  }
}

export async function deleteEntryApi(id) {
  try {
    await fetch(`/api/diary?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch {
    // Fallback
  }
}

export function addEntry(entries, entry) {
  const withNew = [{ ...entry, id: entry.id || `entry-${Date.now()}` }, ...entries];
  writeRaw(withNew);
  return withNew;
}

export function updateEntry(entries, id, patch) {
  const updated = entries.map((e) => (e.id === id ? { ...e, ...patch } : e));
  writeRaw(updated);
  return updated;
}

export function deleteEntry(entries, id) {
  const filtered = entries.filter((e) => e.id !== id);
  writeRaw(filtered);
  return filtered;
}

export function sortByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Message-memory service data access layer.
// Connects UI components to persistent database endpoints (/api/messages).
// Uses client caching & local fallback so local development works seamlessly.

const STORAGE_KEY = "olw_message_memories";

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

function writeRaw(memories) {
  if (!isBrowser()) return { ok: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function getMemories(seed = []) {
  const existing = readRaw();
  if (existing) return existing;
  writeRaw(seed);
  return seed;
}

export async function fetchMemoriesFromApi() {
  try {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.ok && Array.isArray(data.memories) && data.memories.length > 0) {
      writeRaw(data.memories);
      return data.memories;
    }
  } catch {
    // Fallback
  }
  return getMemories([]);
}

export async function addMemoryApi(memory) {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memory)
    });
    const data = await res.json();
    if (data.ok && data.memory) {
      return data.memory;
    }
  } catch {
    // Fallback
  }
  return { ...memory, id: memory.id || `memory-${Date.now()}` };
}

export async function updateMemoryApi(id, patch) {
  try {
    const res = await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch })
    });
    const data = await res.json();
    if (data.ok && data.memory) {
      return data.memory;
    }
  } catch {
    // Fallback
  }
  return { id, ...patch };
}

export async function deleteMemoryApi(id) {
  try {
    await fetch(`/api/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch {
    // Fallback
  }
}

export function addMemory(memories, memory) {
  const withNew = [{ ...memory, id: memory.id || `memory-${Date.now()}` }, ...memories];
  const result = writeRaw(withNew);
  return { ok: result.ok, memories: result.ok ? withNew : memories };
}

export function updateMemory(memories, id, patch) {
  const updated = memories.map((m) => (m.id === id ? { ...m, ...patch } : m));
  writeRaw(updated);
  return updated;
}

export function deleteMemory(memories, id) {
  const filtered = memories.filter((m) => m.id !== id);
  writeRaw(filtered);
  return filtered;
}

export function sortByDateDesc(memories) {
  return [...memories].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

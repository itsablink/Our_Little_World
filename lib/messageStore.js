// Message-memory service data access layer for persistent database endpoints (/api/messages).

export async function fetchMemoriesFromApi() {
  const res = await fetch("/api/messages", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to fetch messages from server");
  }
  return data.memories || [];
}

export async function addMemoryApi(memory) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memory)
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to save message to database");
  }
  return data.memory;
}

export async function updateMemoryApi(id, patch) {
  const res = await fetch("/api/messages", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...patch })
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to update message in database");
  }
  return data.memory;
}

export async function deleteMemoryApi(id) {
  const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Failed to delete message from database");
  }
  return true;
}

export function sortByDateDesc(memories) {
  if (!Array.isArray(memories)) return [];
  return [...memories].sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
}

// Database service abstraction layer for text-based Message Memories using Neon PostgreSQL.

import { getDbClient, ensureTablesExist } from "../db.js";

export async function getMessagesFromDb() {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  const rows = await sql`
    SELECT id, title, date, author, message, note, created_at AS "createdAt"
    FROM messages
    ORDER BY created_at DESC;
  `;
  return rows || [];
}

export async function saveMessageToDb(memory) {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  const record = {
    id: memory.id || `memory-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: memory.title,
    date: memory.date || "",
    author: memory.author || "",
    message: memory.message || "",
    note: memory.note || "",
    createdAt: new Date().toISOString()
  };

  await sql`
    INSERT INTO messages (id, title, date, author, message, note, created_at)
    VALUES (${record.id}, ${record.title}, ${record.date}, ${record.author}, ${record.message}, ${record.note}, ${record.createdAt});
  `;
  return record;
}

export async function updateMessageInDb(id, patch) {
  const sql = getDbClient();
  await ensureTablesExist(sql);

  const rows = await sql`
    SELECT id, title, date, author, message, note, created_at FROM messages WHERE id = ${id};
  `;
  if (!rows || rows.length === 0) {
    throw new Error(`Message memory with id ${id} not found`);
  }
  const existing = rows[0];
  const updatedTitle = patch.title !== undefined ? patch.title : existing.title;
  const updatedDate = patch.date !== undefined ? patch.date : existing.date;
  const updatedAuthor = patch.author !== undefined ? patch.author : existing.author;
  const updatedMessage = patch.message !== undefined ? patch.message : existing.message;
  const updatedNote = patch.note !== undefined ? patch.note : existing.note;

  await sql`
    UPDATE messages
    SET title = ${updatedTitle}, date = ${updatedDate}, author = ${updatedAuthor}, message = ${updatedMessage}, note = ${updatedNote}
    WHERE id = ${id};
  `;

  return {
    id,
    title: updatedTitle,
    date: updatedDate,
    author: updatedAuthor,
    message: updatedMessage,
    note: updatedNote,
    createdAt: existing.created_at
  };
}

export async function deleteMessageFromDb(id) {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  await sql`
    DELETE FROM messages WHERE id = ${id};
  `;
  return true;
}

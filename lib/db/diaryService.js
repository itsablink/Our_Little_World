// Database service abstraction layer for Diary entries using Neon PostgreSQL.

import { getDbClient, ensureTablesExist } from "../db.js";

export async function getDiaryEntriesFromDb() {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  const rows = await sql`
    SELECT id, date, heading, body, created_at AS "createdAt"
    FROM diary_entries
    ORDER BY date DESC, created_at DESC;
  `;
  return rows || [];
}

export async function saveDiaryEntryToDb(entry) {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  const record = {
    id: entry.id || `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: entry.date,
    heading: entry.heading,
    body: entry.body,
    createdAt: new Date().toISOString()
  };

  await sql`
    INSERT INTO diary_entries (id, date, heading, body, created_at)
    VALUES (${record.id}, ${record.date}, ${record.heading}, ${record.body}, ${record.createdAt});
  `;
  return record;
}

export async function updateDiaryEntryInDb(id, patch) {
  const sql = getDbClient();
  await ensureTablesExist(sql);

  const rows = await sql`
    SELECT id, date, heading, body, created_at FROM diary_entries WHERE id = ${id};
  `;
  if (!rows || rows.length === 0) {
    throw new Error(`Diary entry with id ${id} not found`);
  }
  const existing = rows[0];
  const updatedDate = patch.date !== undefined ? patch.date : existing.date;
  const updatedHeading = patch.heading !== undefined ? patch.heading : existing.heading;
  const updatedBody = patch.body !== undefined ? patch.body : existing.body;

  await sql`
    UPDATE diary_entries
    SET date = ${updatedDate}, heading = ${updatedHeading}, body = ${updatedBody}
    WHERE id = ${id};
  `;

  return {
    id,
    date: updatedDate,
    heading: updatedHeading,
    body: updatedBody,
    createdAt: existing.created_at
  };
}

export async function deleteDiaryEntryFromDb(id) {
  const sql = getDbClient();
  await ensureTablesExist(sql);
  await sql`
    DELETE FROM diary_entries WHERE id = ${id};
  `;
  return true;
}

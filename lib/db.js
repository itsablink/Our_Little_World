import { neon } from "@neondatabase/serverless";

export function getDbConnectionString() {
  const url =
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL_POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL;
  return url ? url.trim() : "";
}

export function getDbClient() {
  const connString = getDbConnectionString();
  if (!connString) {
    throw new Error(
      "Neon PostgreSQL database connection string is missing or unconfigured. " +
      "Checked DATABASE_URL_UNPOOLED, DATABASE_URL_POSTGRES_PRISMA_URL, POSTGRES_URL, and DATABASE_URL."
    );
  }
  return neon(connString);
}

let tableInitPromise = null;

export async function ensureTablesExist(sql) {
  if (!tableInitPromise) {
    tableInitPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS diary_entries (
          id TEXT PRIMARY KEY,
          date TEXT NOT NULL,
          heading TEXT NOT NULL,
          body TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          date TEXT DEFAULT '',
          author TEXT DEFAULT '',
          message TEXT NOT NULL,
          note TEXT DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
      `;
    })().catch((err) => {
      tableInitPromise = null;
      throw err;
    });
  }
  return tableInitPromise;
}

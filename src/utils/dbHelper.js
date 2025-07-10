import initSqlJs from "sql.js";
import { get, set } from "idb-keyval";

let SQL = null;
let db = null;

const DB_KEY = "dictionary.sqlite";

export async function initDb() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`,
    });
  }

  let dbFile = await get(DB_KEY);

  if (!dbFile) {
    const response = await fetch("/dictionary.db");
    const buffer = await response.arrayBuffer();
    dbFile = new Uint8Array(buffer);
    await set(DB_KEY, dbFile);
  }

  db = new SQL.Database(dbFile);
  return db;
}

export function getDb() {
  return db;
}

export async function saveDb() {
  if (!db) return;
  const data = db.export();
  await set(DB_KEY, data);
}

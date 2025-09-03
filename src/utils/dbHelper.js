import initSqlJs from "sql.js";
import { get, set, del } from "idb-keyval";

let SQL = null;
const DB_KEY = "dictionary.sqlite";

export async function initDb(forceReload = false) {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`,
    });
  }

  try {
    // Force clear the cached database if requested
    if (forceReload) {
      await del(DB_KEY);
    }

    // Try to get the database from IndexedDB
    let dbFile = await get(DB_KEY);

    // If no database in IndexedDB or force reload, get from server
    if (!dbFile || forceReload) {
      console.log('Loading database from server...');
      const response = await fetch("/dictionary.db");
      const buffer = await response.arrayBuffer();
      dbFile = new Uint8Array(buffer);
      await set(DB_KEY, dbFile);
      console.log('Database loaded and saved to IndexedDB');
    }

    // Create new database instance
    const db = new SQL.Database(dbFile);
    
    // Verify database is working
    const stmt = db.prepare("SELECT COUNT(*) as count FROM words");
    stmt.step();
    const count = stmt.getAsObject().count;
    stmt.free();
    console.log('Database loaded with', count, 'words');

    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    // If there's an error, clear the cached database and try again
    await del(DB_KEY);
    throw error;
  }
}

export async function saveDb(db) {
  if (!db) return false;
  
  try {
    // Export the database
    const data = db.export();
    
    // Save to IndexedDB
    await set(DB_KEY, data);
    
    // Verify the save
    const savedData = await get(DB_KEY);
    if (!savedData) {
      throw new Error('Database save verification failed');
    }
    
    console.log('Database saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    throw error;
  }
}

// Function to reset the database to its original state
export async function resetDb() {
  try {
    await del(DB_KEY);
    return await initDb(true);
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
}

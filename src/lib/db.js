import { openDB } from 'idb'

const DB_NAME = 'knights-golf'
const DB_VERSION = 2

let _db = null

export async function getDB() {
  if (_db) return _db
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const stores = [
        'seasons', 'players', 'teams', 'team_players',
        'weeks', 'matchups', 'scores', 'handicaps',
        'dues', 'free_rounds', 'settings'
      ]
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: 'id' })
        }
      }
    }
  })
  return _db
}

// ─── Generic CRUD ────────────────────────────────────────────────────────────

export async function getAll(storeName) {
  const db = await getDB()
  return db.getAll(storeName)
}

export async function getOne(storeName, id) {
  const db = await getDB()
  return db.get(storeName, id)
}

export async function putOne(storeName, record) {
  const db = await getDB()
  return db.put(storeName, record)
}

export async function putMany(storeName, records) {
  const db = await getDB()
  const tx = db.transaction(storeName, 'readwrite')
  await Promise.all(records.map(r => tx.store.put(r)))
  await tx.done
}

export async function deleteOne(storeName, id) {
  const db = await getDB()
  return db.delete(storeName, id)
}

export async function clearStore(storeName) {
  const db = await getDB()
  return db.clear(storeName)
}

// ─── Settings (PIN, first-run flag) ──────────────────────────────────────────

export async function getSetting(key) {
  const db = await getDB()
  const row = await db.get('settings', key)
  return row?.value ?? null
}

export async function setSetting(key, value) {
  const db = await getDB()
  return db.put('settings', { id: key, value })
}

// ─── ID generator ────────────────────────────────────────────────────────────

export function newId() {
  return crypto.randomUUID()
}

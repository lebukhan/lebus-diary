// অফলাইন স্টোরেজ — IndexedDB (idb র‍্যাপার)
import { openDB } from "idb";

const NAME = "lebus-diary";
const VERSION = 1;

function getDB() {
  if (typeof window === "undefined") return null;
  return openDB(NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("diaries")) db.createObjectStore("diaries", { keyPath: "id" });
      if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta");
    },
  });
}

export async function allDiaries() {
  const db = await getDB();
  if (!db) return [];
  const list = await db.getAll("diaries");
  return list.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}
export async function putDiary(diary) {
  const db = await getDB();
  if (db) await db.put("diaries", diary);
}
export async function removeDiary(id) {
  const db = await getDB();
  if (db) await db.delete("diaries", id);
}
export async function getMeta(key, fallback = null) {
  const db = await getDB();
  if (!db) return fallback;
  const v = await db.get("meta", key);
  return v === undefined ? fallback : v;
}
export async function setMeta(key, value) {
  const db = await getDB();
  if (db) await db.put("meta", value, key);
}

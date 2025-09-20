/* === FILE: src/db.js === */
// Minimal IndexedDB helper (no external libs). Exposes: getAllNotes, addNote, updateNote, deleteNote, getNote
const DB_NAME = 'offline-notes-db';
const DB_VERSION = 1;
const STORE_NAME = 'notes';


function openDB() {
return new Promise((resolve, reject) => {
const req = indexedDB.open(DB_NAME, DB_VERSION);
req.onupgradeneeded = (e) => {
const db = e.target.result;
if (!db.objectStoreNames.contains(STORE_NAME)) {
const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
store.createIndex('createdAt', 'createdAt', { unique: false });
}
};
req.onsuccess = (e) => resolve(e.target.result);
req.onerror = (e) => reject(e.target.error);
});
}


export async function getAllNotes() {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE_NAME, 'readonly');
const store = tx.objectStore(STORE_NAME);
const req = store.getAll();
req.onsuccess = () => resolve(req.result.sort((a, b) => b.updatedAt - a.updatedAt));
req.onerror = () => reject(req.error);
});
}


export async function addNote(note) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE_NAME, 'readwrite');
const store = tx.objectStore(STORE_NAME);
const now = Date.now();
const toStore = {
title: note.title || 'Untitled',
content: note.content || '',
createdAt: now,
updatedAt: now
};
const req = store.add(toStore);
req.onsuccess = (e) => {
toStore.id = e.target.result;
tx.oncomplete = () => resolve(toStore);
};
req.onerror = (e) => reject(e.target.error);
});
}


export async function updateNote(note) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const toStore = { ...note, updatedAt: Date.now() };
    const req = store.put(toStore);
    req.onsuccess = () => {
    tx.oncomplete = () => resolve(toStore);
    };
    req.onerror = (e) => reject(e.target.error);
    });
    }
    
    
    export async function deleteNote(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => {
    tx.oncomplete = () => resolve(true);
    };
    req.onerror = (e) => reject(e.target.error);
    });
    }
    
    
    export async function getNote(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
    });
    }
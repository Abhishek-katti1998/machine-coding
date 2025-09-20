const CACHE_NAME = "offline-cache-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/src/App.jsx"
];

// Install: cache files
self.addEventListener("install", event => {
  console.log("SW installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: cleanup old caches
self.addEventListener("activate", event => {
  console.log("SW activating...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

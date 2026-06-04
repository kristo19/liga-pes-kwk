const CACHE_NAME = 'ligapes-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Proses Install Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ambil data dari Cache atau Internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
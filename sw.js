const CACHE_NAME = 'ligapes-cache-v5'; // Saya naikkan ke v5 agar langsung trigger update
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Proses Install Cache
self.addEventListener('install', event => {
  self.skipWaiting(); // MEMAKSA update langsung terpasang detik itu juga
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses Activate: BERSIHKAN CACHE LAMA
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika nama cache tidak sama dengan versi terbaru (v5), maka hapus dari HP
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Langsung ambil alih kontrol halaman tanpa nunggu refresh
    })
  );
});

// Ambil data dari Cache atau Internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache terbaru jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
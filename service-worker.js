var dataCacheName = 'tradergame';
var cacheName = 'tradergame';
var filesToCache = [
  //'/',
  './tradergame/index.html',
  './tradergame/manifest.json',
  './tradergame/index.js',
  './tradergame/style.css',
  './tradergame/service-worker.js',
  //'./scripts',
  // './scripts/vendor/pace.min.js',
  // './styles/vendor/pace-theme-minimal.css',
  // //'./styles'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
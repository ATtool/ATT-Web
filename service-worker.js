/* =========================================================
   Adventist Tamil Tool (ATT) - Service Worker Engine
   Motto: “Abide in Christ, and be kept by His power.” – DA 324
   Enables Full Offline Functionality & App Installation
   ========================================================= */

const CACHE_NAME = 'att-pwa-cache-v1';

// Static files & data assets to pre-cache immediately on install
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/songs.js',
  './data/zionSongs.js',
  './data/thirumaraiSongs.js',
  './assets/favicon.png',
  './assets/icon.png',
  './assets/fonts/Tamil003.ttf',
  './assets/fonts/Tamil008.ttf'
];

// 1. Install Event - Pre-cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean up old outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Cache-First strategy with network fallback
self.addEventListener('fetch', (event) => {
  // Always fetch live Manna updates freshly if online, fallback to cache if offline
  if (event.request.url.includes('gist.githubusercontent.com')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Default: Cache-First for instant loading of app assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache newly requested local assets
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

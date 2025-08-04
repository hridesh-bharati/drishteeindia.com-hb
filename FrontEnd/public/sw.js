const CACHE_NAME = "drishtee-cache-v4"; // Updated Cache version
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/icon/favicon.ico",
  "/images/icon/icon-192.png",
  "/images/icon/icon-512.png",
  "/images/icon/apple-touch-icon.png",
  "/css/utilities.css",
  "/images/logo.png",
  "/images/icon/icon-192.png",
  "/images/icon/icon-512.png"
];

// Install event: Cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching static assets...");
      return Promise.all(
        STATIC_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            cache.put(url, response.clone());
            console.log(`[Service Worker] Cached: ${url}`);
          } catch (error) {
            console.error(`[Service Worker] Error caching ${url}: ${error}`);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate event: Clear old caches and claim clients immediately
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: Cache-first for static files, Network-first for dynamic content
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Ignore non-GET requests
  if (request.method !== "GET") return;

  // Cache-first for static assets like images, JS, CSS
  if (STATIC_ASSETS.some((url) => request.url.includes(new URL(url, location.origin).pathname))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          console.log("[Service Worker] Returning from cache:", request.url);
          return cached;
        }
        return fetch(request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone()); // Cache the response dynamically
            console.log("[Service Worker] Caching new request:", request.url);
            return response;
          });
        });
      })
    );
    return;
  }

  // Network-first strategy for API requests (fallback to cache if offline)
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone()); // Cache API responses dynamically
            console.log("[Service Worker] Caching API response:", request.url);
            return response;
          });
        })
        .catch(() => {
          console.log("[Service Worker] API request failed, returning cached response");
          return caches.match(request); // Fallback to cache when offline
        })
    );
    return;
  }

  // Cache-first for other assets (HTML, JS, CSS, etc.)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        console.log("[Service Worker] Returning from cache:", request.url);
        return cached;
      }
      return fetch(request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, response.clone());
          console.log("[Service Worker] Caching new request:", request.url);
          return response;
        });
      }).catch(() => {
        // Fallback to index.html for SPAs
        console.log("[Service Worker] No network, returning index.html for SPA fallback");
        return caches.match("/index.html");
      });
    })
  );
});

// Push Notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: '/images/icon/icon-192.png',
    badge: '/images/icon/icon-512.png',
  };
  event.waitUntil(
    self.registration.showNotification('Drishtee Update', options)
  );
});

// Background Sync (Optional for API/Content Sync)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-api') {
    event.waitUntil(
      fetch('/api/sync') // Example API sync request
        .then((response) => response.json())
        .then((data) => {
          console.log('Sync completed:', data);
        })
        .catch((error) => {
          console.error('Sync failed:', error);
        })
    );
  }
});

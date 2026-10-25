// Service Worker for DukeOps PWA
const CACHE_NAME = "dukeops-v2.1.0";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./services.html",
  "./hardware.html",
  "./contact.html",
  "./manifest.json",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./assets/images/logo.jpg",
  "./assets/images/hero-editorial.jpg",
  "./assets/images/favicon.svg",
  "./assets/images/favicon.ico"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML navigation so content updates appear immediately
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResp) => {
          const copy = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return networkResp;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Stale-while-revalidate for local CSS, JS, and images
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            const copy = networkResp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResp;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});

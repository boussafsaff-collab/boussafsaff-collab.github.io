/* PWA bridge: keep old GitHub installs in-scope (no cross-origin redirect). */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim().then(function () {
    return caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) { return caches.delete(k); }));
    });
  }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(function () {
    return caches.match('index.html').then(function (h) {
      return h || new Response('افتح baoussalatkostaz.com', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    });
  }));
});

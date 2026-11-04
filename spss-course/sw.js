/* PWA bridge: GitHub Pages installs → baoussalatkostaz.com. Do not cache the course. */
var LIVE = 'https://baoussalatkostaz.com';
var PREFIX = '/spss-course';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim().then(function () {
    return caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) { return caches.delete(k); }));
    });
  }));
});
function toLive(u) {
  try {
    var url = new URL(u);
    var path = url.pathname;
    if (path.indexOf(PREFIX) === 0) path = path.slice(PREFIX.length) || '/';
    if (!path) path = '/';
    return LIVE + path + url.search + url.hash;
  } catch (x) {
    return LIVE + '/';
  }
}
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(Response.redirect(toLive(e.request.url), 302));
});

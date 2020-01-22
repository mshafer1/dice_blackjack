// Add list of files to cache here.
const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/styles.css',
  'img/icon_560.png',
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

// activate new version immediately
self.skipWaiting();

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
  });
const CACHE_NAME = 'radpedia-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/Calculators/liverspleenlength.html',
  '/Calculators/leglength.html',
  '/Calculators/FORCalculator.html',
  '/icon.png',
  '/apple-touch-icon.png',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

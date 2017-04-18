// Revisión 001
// Para actualizar las funcionalidades del Service Worker, hay que actualizar
// este archivo. Puede ser un cambio en un comentario.

// El service worker tendrá validéz y control en la ruta en la cual es insertada
// en la página. Es decir, si se encuentra en /app/, va a tener control sobre
// los recursos servidors en /app/*, pero no en /cms/*.

// Se le asigna un scope para diferenciar multiples web workers.
const SCOPE = 'vulcanbambi';

// Se definen archivos a guardar en cache.
const filesToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/css/app.css',
  '/app.js',
  '/fonts/roboto-latin.woff2',
  '/sounds/ambience.mp3',
  '/img/icons/icon-256x256.png',
  '/img/vulcanbambi.png',
  '/img/fruit.png'
];

// Cuando el worker se vaya a instalar. O cuando se trate de actualizar.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SCOPE).then(cache => {
      return cache.
        addAll(filesToCache).
        then(() => self.skipWaiting());
    })
  );
});

// Cuando el worker ha sido activado.
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Cuando se realiza un request a un recurso. Básicamente es un proxy
// para peticiones, imágenes, scripts, styles, AJAX...
self.addEventListener('fetch', event => {

  // Podemos sobreescribir cómo responder a una petición realizada.
  // En este caso, verificamos si lo que queremos pedir ya se encuentra en cache,
  // enviarlo si se encuentra, en caso contrario continuar con la petición normal.
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

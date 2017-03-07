// Revisión 007
// Para actualizar las funcionalidades del Service Worker, hay que actualizar
// este archivo. Puede ser un cambio en un comentario.

// El service worker tendrá validéz y control en la ruta en la cual es insertada
// en la página. Es decir, si se encuentra en /app/, va a tener control sobre
// los recursos servidors en /app/*, pero no en /cms/*.

// Se le asigna un scope para diferenciar multiples web workers.
const SCOPE = 'vulcanbambi';

// Se definen archivos a guardar en cache.
const filesToCache = [

  // HTML
  '/',
  '/index.html',

  // CSS
  '/css/foundation.min.css',
  '/css/app.css',

  // JS
  '/js/app.js',

  // IMAGES
  '/favicon.ico',
  '/img/icons/icon-256x256.png',
  '/img/photos/junca.jpg',
  '/img/photos/sergio.jpeg',
  '/img/photos/ivan.jpg',
  '/img/photos/jose.jpg',
  '/img/photos/romel.jpg'
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

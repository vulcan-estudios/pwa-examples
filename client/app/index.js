import $ from 'jquery';
import render from './render';

window.$ = window.jQuery = $;

render();

// Registrar el Service Worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.
      register('/ws.js').
      then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).
      catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

import $ from 'jquery';
import render from './render';

window.$ = window.jQuery = $;

render();

/*const howler = require('howler');
const blenderSound = new howler.Howl({
  src: ['/sounds/blender.mp3']
});
$('body').on('click', function () {
  blenderSound.stop().play();
});*/

/*
// Registrar el Service Worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.
      register('/sw.js').
      then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).
      catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
*/

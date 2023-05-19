/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/assets/precache-manifest.9c7331a0d24abe2e876ec3c44448ca26.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\/(images|assets|admin-assets)\//, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/\/api\//, workbox.strategies.networkOnly(), 'GET');
workbox.routing.registerRoute(/\/ajax\/payment_form_settings/, workbox.strategies.networkOnly(), 'GET');
workbox.routing.registerRoute(/\//, workbox.strategies.networkFirst({ "networkTimeoutSeconds":10, plugins: [] }), 'GET');

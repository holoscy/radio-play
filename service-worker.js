importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/7.0.0/workbox-sw.min.js');

const version = 'v0.5';

if (workbox) {
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: `images-cache-${version}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 6000,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'script',
        new workbox.strategies.CacheFirst({
            cacheName: `js-cache-${version}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 20,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'style',
        new workbox.strategies.CacheFirst({
            cacheName: `css-cache-${version}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 10,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                })
            ]
        })
    );

} else {
    console.log('Workbox failed to load');
}
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => !cacheName.endsWith(version))
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

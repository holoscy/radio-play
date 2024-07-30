importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.min.js');

const versions = {
    images: 'v0.52',
    js: 'v0.53',
    css: 'v0.52'
};

if (workbox) {
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: `images-cache-${versions.images}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 6000,
                    maxAgeSeconds: 180 * 24 * 60 * 60,
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
            cacheName: `js-cache-${versions.js}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 20,
                    maxAgeSeconds: 180 * 24 * 60 * 60,
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
            cacheName: `css-cache-${versions.css}`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 10,
                    maxAgeSeconds: 180 * 24 * 60 * 60,
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
                cacheNames.filter(cacheName => {
                    return !Object.values(versions).some(version => cacheName.endsWith(version));
                }).map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

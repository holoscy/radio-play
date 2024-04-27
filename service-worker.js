importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/7.0.0/workbox-sw.min.js');

if (workbox) {
    console.log('Workbox is loaded');

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: 'images-cache',
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
            cacheName: 'js-cache',
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

} else {
    console.log('Workbox failed to load');
}

//new workbox.strategies.NetworkFirst()

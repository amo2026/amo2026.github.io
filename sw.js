const CACHE_NAME = 'fc3d-cache-v1';
const urlsToCache = [
    '/',
    '/fc3d.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// 安装 Service Worker，并缓存文件
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// 拦截网络请求，优先使用缓存
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 清理旧版本缓存（当 Service Worker 更新时）
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

const CACHE = 'yeshua-ministries-v1'

const PRECACHE = ['/', '/blog/', '/support-this-ministry/', '/offline/']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  // Skip cross-origin requests (Zeffy, PayPal, GTM, etc.)
  if (url.origin !== self.location.origin) return

  // Images: cache-first, populate on miss
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((res) => {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(event.request, clone))
            return res
          })
      )
    )
    return
  }

  // Page navigations: network-first, fall back to cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE).then((c) => c.put(event.request, clone))
          return res
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match('/offline/'))
        )
    )
    return
  }

  // JS / CSS / fonts: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(event.request).then((cached) => {
        const fetched = fetch(event.request).then((res) => {
          cache.put(event.request, res.clone())
          return res
        })
        return cached || fetched
      })
    )
  )
})

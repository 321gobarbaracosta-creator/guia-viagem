// 3,2,1 GO! — Service Worker
// Produção: o Vite injeta em [] a lista real dos arquivos
// gerados no build. Em desenvolvimento, usamos um conjunto mínimo seguro.

const CACHE_NAME = "321go-guia-v2";
const RUNTIME_CACHE = "321go-runtime-v2";
const PRECACHE_ASSETS = [];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch(() => undefined)
        )
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![CACHE_NAME, RUNTIME_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

async function cacheRuntimeResponse(request, response) {
  if (!response || (response.type !== "opaque" && response.status !== 200)) {
    return response;
  }
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isImage = request.destination === "image";
  const isSameOrigin = url.origin === self.location.origin;

  // Imagens externas (ex.: Unsplash) também podem ser guardadas no cache
  // runtime. O cache é alimentado enquanto o usuário está online.
  if (isImage) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request, { mode: isSameOrigin ? "same-origin" : "no-cors" })
          .then((response) => cacheRuntimeResponse(request, response))
          .catch(() => caches.match(request))
          .then((response) => response || Response.error());
      })
    );
    return;
  }

  // Recursos estáticos do próprio app: cache-first.
  if (
    isSameOrigin &&
    ["style", "script", "font"].includes(request.destination)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) =>
          cacheRuntimeResponse(request, response)
        );
      })
    );
    return;
  }

  // Navegação: online primeiro para receber atualizações; offline usa o
  // documento já armazenado e, por último, o index.html do app.
  if (isSameOrigin && request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => cacheRuntimeResponse(request, response))
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match("/index.html");
        })
    );
  }
});

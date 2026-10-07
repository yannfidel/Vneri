/* ============ VNERi — service worker ============
   - Faz o site abrir mesmo sem internet depois da primeira visita.
   - Arquivos do próprio site: busca na rede primeiro (assim as atualizações
     chegam logo) e usa o cache só se estiver offline.
   - Fontes do Google: usa o cache e atualiza em segundo plano.
   Para forçar a atualização do cache em todos os celulares, mude o número em CACHE.
*/
const CACHE = 'vneri-v1';
const CORE = [
  './',
  'index.html',
  'calculadora.html',
  'style.css',
  'app.js',
  'script.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.all(CORE.map((url) => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Arquivos do próprio site: rede primeiro, cache como reserva
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req.url, { cache: 'no-cache' })
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match('calculadora.html'))
        )
    );
    return;
  }

  // Fontes do Google: cache primeiro, atualiza em segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(req).then((hit) => {
          const net = fetch(req)
            .then((res) => { cache.put(req, res.clone()); return res; })
            .catch(() => hit);
          return hit || net;
        })
      )
    );
  }
});

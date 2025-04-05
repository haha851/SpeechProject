// Speech Writer Premium Service Worker
const CACHE_NAME = 'speech-writer-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/fonts/Aeonik.otf',
  '/audio/background-music.mp3',
  '/audio/subtle-scroll.mp3',
  '/audio/subtle-click.mp3',
  '/audio/subtle-hover.mp3'
];

// Install event - Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For page navigations, always go to network first then cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the new page on-the-fly
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For static assets, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Cache assets on-the-fly
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // For image requests, return a fallback image
            if (event.request.destination === 'image') {
              return caches.match('/images/offline-image.png');
            }
            // For font requests, try to return any cached font
            if (event.request.destination === 'font') {
              return caches.match('/fonts/Aeonik.otf');
            }
            return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Helper function to sync stored form data
async function syncForms() {
  try {
    const db = await openDatabase();
    const forms = await db.getAll('offline-forms');
    
    await Promise.all(forms.map(async (form) => {
      try {
        const response = await fetch(form.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data),
        });
        
        if (response.ok) {
          await db.delete('offline-forms', form.id);
        }
      } catch (error) {
        console.error('Sync failed for form:', form.id, error);
      }
    }));
  } catch (error) {
    console.error('Error syncing forms:', error);
  }
}

// IndexedDB for offline data storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('speech-writer-offline', 1);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('offline-forms', { keyPath: 'id', autoIncrement: true });
    };
    
    request.onsuccess = event => resolve({
      getAll: (storeName) => {
        return new Promise((resolve, reject) => {
          const transaction = event.target.result.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.getAll();
          
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      },
      delete: (storeName, id) => {
        return new Promise((resolve, reject) => {
          const transaction = event.target.result.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.delete(id);
          
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    });
    
    request.onerror = event => reject(event.target.error);
  });
}

// Add offline detection
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'OFFLINE_STATUS_REQUEST') {
    const status = navigator.onLine ? 'online' : 'offline';
    event.source.postMessage({
      type: 'OFFLINE_STATUS_RESPONSE',
      status
    });
  }
});
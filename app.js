// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  // Register the service worker
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/pwa/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Add the web app manifest to the document head
const manifest = document.createElement('link');
manifest.rel = 'manifest';
manifest.href = '/pwa/manifest.json';
document.head.appendChild(manifest);

// Listen for changes in display mode (standalone vs browser)
if ('matchMedia' in window) {
  const mediaQuery = window.matchMedia('(display-mode: standalone)');
  mediaQuery.addEventListener('change', function(event) {
    if (event.matches) {
      console.log('Web app is in standalone mode');
    } else {
      console.log('Web app is not in standalone mode');
    }
  });
}

// Listen for the appinstalled event to detect installation
window.addEventListener('appinstalled', function(event) {
  console.log('Web app installed');
});

// Detect if the web app is launched from the home screen
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Web app launched from home screen');
}

// Set the manifest metadata for the web app
const manifestData = {
  "name": "My Web App",
  "short_name": "My App",
  "start_url": "/",
  "icons": [
    {
      "src": "/pwa/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/pwa/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "display": "standalone"
};

// Create the manifest file URL and add it to the document head
const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
const manifestURL = URL.createObjectURL(manifestBlob);
const manifestTag = document.createElement('link');
manifestTag.rel = 'manifest';
manifestTag.href = manifestURL;
document.head.appendChild(manifestTag);

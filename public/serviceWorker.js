const staticPlates = "plates-site-v1"
const assets = [
  "/",
  "/index.html"
  // "/static"
]

const pnPushNotification=async (event) => {
  // console.log('push event: ');
  // console.log(event);
    var strTitle = 'Notification';
    var strText = 'empty Notification received!';
    if (event.data) {
        pushPayload = event.data.json();
    }
  var promise = self.registration.showNotification(pushPayload.title, {...pushPayload});
  // self.registration.showNotification(strTitle, {body:strText});
  // window.alert(promise);
  event.waitUntil(promise);
}

async  function pnNotificationClick(event) {
  console.log('notificationclick event: ' + event);
  if (event.notification.data && event.notification.data.url) {
      const promise = clients.openWindow(event.notification.data.url);
      event.waitUntil(promise);
  }
}

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPlates).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })

// and listen to incomming push notifications
self.addEventListener('push', pnPushNotification);
// ... and listen to the click
self.addEventListener('notificationclick', pnNotificationClick);
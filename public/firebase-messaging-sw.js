importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js") 
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js") 

let firebaseConfig = {
    messagingSenderId: "99571061006"
  }
  
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title")
    })
  return promiseChain;
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
      clients.openWindow(event.action);
  }
  event.notification.close();
}); 
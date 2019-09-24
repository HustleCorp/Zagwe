import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/functions'
import ReactGA from 'react-ga'

import config from 'src/config'
try {
  let firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId
  }
  
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log('=========Firebase firestore initializer==============')
  console.log(error)
  console.log('====================================')
}

let messaging: any

if (firebase.messaging.isSupported()) {
   messaging = firebase.messaging()

   messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
     "BPADxHpbOsZ1DeLBOftkIuWQR0wS_j-oaMKdBGE1IwBoePtaYm44xcYfEZX-kVyYiuBYECW5fO-ZSVp3Kfg86Z4"
  )
      // register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
              updateViaCache: 'none'
          })
          messaging.useServiceWorker(registration)
          messaging.onMessage((payload: any) => {
            const title = 'You have a new notification'
            const options = {
                body: payload.notification.body,
                icon: payload.notification.icon,
                actions: [
                    {
                        action: '/',
                        title: 'You have a new Notification'
                    }
                ]
                
            }
            registration.showNotification(title, options)        
        })
          
      })
    }

}

export {
   messaging
}

// - Storage reference
export let storageRef = firebase.storage().ref()

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()
db.enablePersistence({experimentalTabSynchronization:true})
  .catch((err: any) => {
      if (err.code === 'failed-precondition') {
          console.log('could not enable persistence')
      } else if (err.code === 'unimplemented') {
           console.log('browser does not support offline persistence')
      }
  })

export {
  db
}
// - Database authorize
export let firebaseAuth = firebase.auth

// export let firebaseRef = firebase.database().ref()

// - Firebase default
export default firebase

const trackingId = "UA-144370201-1"
ReactGA.initialize(trackingId)

export { ReactGA }

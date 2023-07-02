import { Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import { Firestore, getFirestore } from 'firebase/firestore'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
const analytics: Promise<Analytics> = isSupported().then(yes => yes ? getAnalytics(app) : null)
const db: Firestore = getFirestore(app)

export {
    app, 
    analytics,
    db
}

import { initializeApp } from 'firebase/app';

async function getFirebaseClient() {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATA_BASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const firebase = initializeApp(config);

  return firebase;
}

let cached = null;

export function fb() {
  if (cached || process.server) return cached;

  cached = getFirebaseClient();
  return cached;
}

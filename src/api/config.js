/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

async function getFirebaseClient() {
  const config = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATA_BASE_URL,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  };

  const firebase = initializeApp(config);
  //start analytics
  getAnalytics(firebase);

  return firebase;
}

let cached = null;

export function fb() {
  if (cached) return cached;

  cached = getFirebaseClient();
  return cached;
}

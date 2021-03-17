async function getFirebaseClient() {
  const { default: firebase } = await import('firebase/app');

  //make all the imports need
  await Promise.all([
    import('firebase/auth'),
    import('firebase/database'),
    import('firebase/analytics'),
  ]);

  const config = {
    apiKey: 'AIzaSyCBMG-mc2JthHgNPS-g4l_OXUtYe1QwhZc',
    authDomain: 'managementsystem-f4618.firebaseapp.com',
    databaseURL:
      'https://managementsystem-f4618-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'managementsystem-f4618',
    storageBucket: 'managementsystem-f4618.appspot.com',
    messagingSenderId: '940315265462',
    appId: '1:940315265462:web:98c87148bbe97ab260d917',
    measurementId: 'G-VZ197GXMCR',
  };

  firebase.initializeApp(config);

  return firebase;
}

let cached = null;

export function fb() {
  if (cached || process.server) return cached;

  cached = getFirebaseClient();
  return cached;
}

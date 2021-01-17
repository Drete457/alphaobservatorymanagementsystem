import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyAEoqqESKfj_RmCz89w5mzcnmFJ9RngoEM',
  authDomain: 'teste-registroalpha.firebaseapp.com',
  databaseURL: 'https://teste-registroalpha-default-rtdb.firebaseio.com',
  projectId: 'teste-registroalpha',
  storageBucket: 'teste-registroalpha.appspot.com',
  messagingSenderId: '1022868169751',
  appId: '1:1022868169751:web:071c9ce2cb49a9382ea852',
  measurementId: 'G-8QSJM1F975',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

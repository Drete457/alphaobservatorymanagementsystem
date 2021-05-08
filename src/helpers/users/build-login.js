import { fb } from 'api';

const buildLogin = async (setUser) => {
  const firebase = await fb();
  firebase.auth().onAuthStateChanged((result) => {
    const userInfo = {
      name: result.displayName,
      email: result.email,
      photo: result.photoURL,
      last: result.metadata.lastSignInTime,
      create: result.metadata.creationTime,
      uid: result.uid,
    };
    setUser(userInfo);
  });
};

export default buildLogin;

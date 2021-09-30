import { getAuth, onAuthStateChanged } from 'firebase/auth';

const buildLogin = async (setUser) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (result) => {
    if (result?.displayName) {
      const userInfo = {
        name: result.displayName,
        email: result.email,
        photo: result.photoURL,
        last: result.metadata.lastSignInTime,
        create: result.metadata.creationTime,
        uid: result.uid,
      };
      setUser(userInfo);
    }
  });
};

export default buildLogin;

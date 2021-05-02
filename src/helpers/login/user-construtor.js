const userConstrutor = (googleUser) => {
  return {
    name: googleUser.displayName,
    email: googleUser.email,
    photo: googleUser.photoURL,
    last: googleUser.metadata.lastSignInTime,
    create: googleUser.metadata.creationTime,
    uid: googleUser.uid,
  };
};

export default userConstrutor;

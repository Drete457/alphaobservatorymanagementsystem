const userConstrutor = (googleUser) => {
  return {
    name: googleUser.displayName,
    email: googleUser.email,
    photo: googleUser.photoURL,
    last: googleUser.metadata.lastSignInTime,
    create: googleUser.metadata.creationTime,
  };
};

export default userConstrutor;

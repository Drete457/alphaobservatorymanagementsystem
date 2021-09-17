import deviceOrientation from './device-orientation';

const screenOrientation = (verification, setRotation) => {
  //verify if  the user is using mobile device
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    const result = deviceOrientation() === 'portrait';

    if (verification) {
      setRotation(result);
    }

    return false;
  }

  return true;
};

export default screenOrientation;

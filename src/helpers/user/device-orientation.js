const deviceOrientation = () => {
  return !window.screen.orientation.angle ? 'portrait' : 'landscape';
};

export default deviceOrientation;

const hashCode = (s) => {
  const code = s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return code;
};

export default hashCode;

const getSelectionText = () => {
  let selectedText = '';
  if (window.getSelection) {
    // all modern browsers and IE9+
    selectedText = window.getSelection().toString();
  }
  return selectedText;
};

export default getSelectionText;

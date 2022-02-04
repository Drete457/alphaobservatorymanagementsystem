import { useState, useCallback, useEffect } from 'react';
import contentMenuHandler from 'helpers/content-menu';

const useCopy = () => {
  const [value, setValue] = useState('');

  const handleClick = useCallback(() => {
    const text = contentMenuHandler.getSelectionText();

    if (text.length > 0) {
      // check there's some text selected
      setValue(text); // logs whatever textual content the user has selected on the page
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleClick);

    return () => {
      document.addEventListener('mouseup', handleClick);
    };
  });

  return { value };
};

export default useCopy;

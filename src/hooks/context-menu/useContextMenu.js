import { useState, useCallback, useEffect } from 'react';

const useContextMenu = () => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);

  //verify if  the user is using mobile device
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();

      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setShowMenu(true);
    },
    [setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    const result =
      /android/i.test(userAgent) ||
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);

    if (!result) {
      document.addEventListener('click', handleClick);
      document.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (!result) {
        document.addEventListener('click', handleClick);
        document.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [handleContextMenu, handleClick, userAgent]);

  return { xPos, yPos, showMenu };
};

export default useContextMenu;

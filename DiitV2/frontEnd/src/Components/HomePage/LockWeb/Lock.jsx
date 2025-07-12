import React, { useEffect } from 'react';

const Lock = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && ['u', 'i', 's'].includes(event.key.toLowerCase())) ||
        (event.ctrlKey && event.shiftKey && ['i', 'j'].includes(event.key.toLowerCase())) ||
        event.key === 'F12'
      ) {
        event.preventDefault();
      }
    };

    const disableRightClick = (event) => event.preventDefault();
    const disableSelect = (event) => event.preventDefault();
    const disableDrag = (event) => event.preventDefault();

    const detectDevTools = () => {
      const threshold = 160;
      const start = new Date();
      debugger;
      const end = new Date();
      if (end - start > threshold) {
        window.location.href = 'about:blank';
      }
    };
    const interval = setInterval(detectDevTools, 1000);

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableSelect);
    document.addEventListener('copy', disableSelect);
    document.addEventListener('cut', disableSelect);
    document.addEventListener('paste', disableSelect);
    document.addEventListener('dragstart', disableDrag);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableSelect);
      document.removeEventListener('copy', disableSelect);
      document.removeEventListener('cut', disableSelect);
      document.removeEventListener('paste', disableSelect);
      document.removeEventListener('dragstart', disableDrag);
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default Lock;

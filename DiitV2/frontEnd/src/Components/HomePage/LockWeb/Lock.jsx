
import React, { useEffect } from 'react';

const Lock = () => {
  useEffect(() => {
    // Block specific keys (Ctrl + U, Ctrl + I, Ctrl + S, F12, etc.)
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && ['u', 'i', 's'].includes(event.key.toLowerCase())) ||
        (event.ctrlKey && event.shiftKey && ['i', 'j'].includes(event.key.toLowerCase())) ||
        event.key === 'F12'
      ) {
        event.preventDefault();  // Prevent the default action
      }
    };

    // Disable right-click
    const disableRightClick = (event) => event.preventDefault();

    // Disable text selection, copying, pasting, and dragging
    const disableSelect = (event) => event.preventDefault();
    const disableDrag = (event) => event.preventDefault();

    // Detect DevTools without using debugger
    const detectDevTools = () => {
      const threshold = 100;  // Minimum window size change to detect DevTools
      const start = new Date().getTime();

      // Check if the outer window dimensions are larger than inner window dimensions
      if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        // If DevTools are open, replace the page content with a welcome message
        document.body.innerHTML = '<h1>Welcome to my App!</h1>';
        return true;  // DevTools detected
      }
      return false;  // DevTools not detected
    };

    // Run detection function once when the page loads (not every second)
    const isDevToolsOpen = detectDevTools();
    if (isDevToolsOpen) {
      // If DevTools is open, show the "Welcome to my App!" message
      document.body.innerHTML = '<h1>Welcome to DRISHTEE COMPUTER CENTER NICHLUAL!</h1>';
    }

    // Add event listeners to block specific actions
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableSelect);
    document.addEventListener('copy', disableSelect);
    document.addEventListener('cut', disableSelect);
    document.addEventListener('paste', disableSelect);
    document.addEventListener('dragstart', disableDrag);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableSelect);
      document.removeEventListener('copy', disableSelect);
      document.removeEventListener('cut', disableSelect);
      document.removeEventListener('paste', disableSelect);
      document.removeEventListener('dragstart', disableDrag);
    };
  }, []);  // Empty array ensures the effect runs only once on mount

  return null;  // This component doesn't render anything on its own
};

export default Lock;

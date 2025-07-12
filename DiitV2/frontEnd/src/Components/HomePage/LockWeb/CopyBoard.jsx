import { useEffect } from 'react';
const CopyBoard = () => {
  useEffect(() => {
    const handleCopy = (event) => {
      event.preventDefault();  
      const customText = 'Welcome to DIIT';  
      event.clipboardData.setData('text/plain', customText);  
    };
    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []); 
  return null;
};
export default CopyBoard;

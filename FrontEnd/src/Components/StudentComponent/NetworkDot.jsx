import React, { useEffect, useState } from 'react';

const NetworkDot = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return (
    <span
      className={`position-relative rounded-circle shadow-sm border border-white`}
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        backgroundColor: online ? '#28a745' : '#dc3545',
        top: 15,
        right: 30,
        zIndex: 1000
      }}
      title={online ? 'Online' : 'Offline'}
    />
  );
};

export default NetworkDot;
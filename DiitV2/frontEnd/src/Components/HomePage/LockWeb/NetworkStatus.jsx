import React, { useEffect, useState, useRef } from 'react';
const NetworkStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const update = () => {
      setOnline(navigator.onLine);
      setVisible(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), 2500);
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    if (!navigator.onLine) update();
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      clearTimeout(timer.current);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 small" style={{ zIndex: "99990" }}>
      <div className={`d-flex align-items-center px-3 py-2 rounded-pill text-white shadow-sm ${online ? 'bg-success' : 'bg-danger'}`}>
        <i className={`bi ${online ? 'bi-wifi' : 'bi-wifi-off'} me-2`} />
        <span className="text-nowrap">{online ? "You're back online" : "You're offline"}</span>
        <button className="btn-close btn-close-white ms-2" onClick={() => setVisible(false)} aria-label="Close" />
      </div>
    </div>
  );
};
export default NetworkStatus;
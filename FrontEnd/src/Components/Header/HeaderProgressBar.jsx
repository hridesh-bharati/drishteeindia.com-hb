import React, { useState, useEffect } from "react";

const HeaderProgressBar = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollY(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-bar">
      <div className="progress-bar-inner bg-primary" style={{ width: `${scrollY}%` }}></div>
      <style>
        {`
        .scroll-progress-bar {
    position: fixed;
    top: 35px;
    left: 0;
    height: 2px;
    width: 100%;
    z-index: 9999;
}

.progress-bar-inner {
    height: 100%;
    width: 0%;
    transition: width 0.3s ease-in-out;
}
        `}
      </style>
    </div>
  );
};

export default HeaderProgressBar;

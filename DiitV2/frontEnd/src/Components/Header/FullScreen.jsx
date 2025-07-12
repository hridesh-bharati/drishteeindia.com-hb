import React, { useEffect, useState } from 'react';

function Fullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement;

      setIsFullscreen(isNowFullscreen);
        if (isNowFullscreen) {
        document.body.classList.add('fullscreen-active');
      } else {
        document.body.classList.remove('fullscreen-active');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);


  return (
    <>
      {isFullscreen && <div id="FullScreenNav"></div>}
      <button
        className="btn btn-sm text-white"
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        <i
          className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'} fullscreen-icon`}  style={{ fontSize: '0.8rem', color: "#ffffff !important" }}></i>
        {/* <span className="d-none d-sm-inline"> {isFullscreen ? 'Exit' : 'Full'} </span> */}
      </button>
    </>

  );
}

export default Fullscreen;

import React from 'react';

export default function Loader() {
  return (
    <>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <style>{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white; /* optional: background while loading */
          z-index: 9999; /* ensures it stays above other content */
        }

        .spinner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background:
            radial-gradient(farthest-side, #474bff 94%, #0000) top/9px 9px no-repeat,
            conic-gradient(#0000 30%, #474bff);
          -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
          mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
          animation: spinner-c7wet2 1s infinite linear;
        }

        @keyframes spinner-c7wet2 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </>
  );
}

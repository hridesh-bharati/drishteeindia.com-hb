import { useEffect, useState } from 'react';
import App from './App';

export default function Welcome({ onFinish }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      onFinish?.();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onFinish]);

  if (!loading) return <App />;

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center bg-white"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center" style={{ maxWidth: 400 }}>
        <img
          src="images/icon/ccc.jpg"
          alt="Welcome Icon"
          width={80}
          height={80}
          className="mb-3"
          style={{ objectFit: 'contain' }}
        />

        <div className="d-flex justify-content-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="loading-dot"
              style={{ animationDelay: `${-0.32 + i * 0.16}s` }}
            />
          ))}
        </div>

        <style>{`
          .loading-dot {
            width: 10px;
            height: 10px;
            background-color: #1877f2;
            border-radius: 50%;
            opacity: 0.3;
            animation: bounce 1.4s infinite ease-in-out both;
          }
          @keyframes bounce {
            0%, 80%, 100% {
              opacity: 0.3;
              transform: translateY(0);
            }
            40% {
              opacity: 1;
              transform: translateY(-6px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

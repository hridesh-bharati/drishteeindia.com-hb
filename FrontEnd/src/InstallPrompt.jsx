import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    // Handler to save the deferred prompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the default install prompt
      setDeferredPrompt(e); // Save the event
      setIsPromptVisible(true); // Show custom prompt
    };

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user's response (accept/dismiss)
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsPromptVisible(false); // Hide prompt after acceptance
      } else {
        console.log('User dismissed the install prompt');
      }

      // Reset deferred prompt
      setDeferredPrompt(null);
    }
  };

  const handleCloseClick = () => {
    setIsPromptVisible(false);
  };

  return isPromptVisible ? (
    <div className="install-prompt-container fixed-bottom m-3 d-flex align-items-center">
      <button
        onClick={handleInstallClick}
        className="install-btn btn btn-success rounded-pill shadow me-2"
      >
        <img src="images/icon/icon.webp" style={{ height: '30px' }} alt="App" />
        <span className="mx-1"> Install Drishtee App</span>
      </button>

      <button
        onClick={handleCloseClick}
        className="close-btn btn btn-danger rounded-circle shadow"
        aria-label="Close install prompt"
      >
        &times;
      </button>
    </div>
  ) : null;
}

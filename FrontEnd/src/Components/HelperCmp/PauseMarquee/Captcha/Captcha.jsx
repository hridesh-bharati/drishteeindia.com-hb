import React, { useState, useEffect } from 'react';
import '../../App.css';
const generateRandomCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
};

export default function Captcha() {
    const [captchaValue, setCaptchaValue] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        setCaptchaValue(generateRandomCaptcha());
        setIsCaptchaVerified(false);
        setUserInput('');
    };

    const handleCaptchaCheck = () => {
        if (userInput.toLowerCase() === captchaValue.toLowerCase()) {
            setIsCaptchaVerified(true);
            alert('CAPTCHA verified successfully!');
            // Perform your verification handler logic here
            // verifyCertificateHandler(); // Uncomment if you have this function
        } else {
            setIsCaptchaVerified(false);
            alert('CAPTCHA verification failed.');
            generateCaptcha();
        }
    };

    const handleReloadCaptcha = () => {
        generateCaptcha();
    };

    return (
        <div className='m-5 p-5 m-auto'>
            <div className="col-12 my-1 text-center">
                
                <div className="captcha-container">
                    <div className="captcha-text">
                        {captchaValue}
                    </div>
                </div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter CAPTCHA"
                    className="my-2"
                />
                <br />
                <button
                    className="btn fw-medium text-white hoverBtn mx-1"
                    style={{ background: 'orangered' }}
                    onClick={handleCaptchaCheck}
                    disabled={userInput.trim() === ''} // Disable button if userInput is empty
                >
                    <i className="bi bi-send-fill"></i> Send
                </button>
                <button
                    className="btn btn-primary fw-medium text-white mx-1"
                    onClick={handleReloadCaptcha}
                >
                    Reload CAPTCHA
                </button>
            </div>
        </div>
    );
}

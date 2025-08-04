import React from 'react';

function ScrollUp() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <style>{`
                #btnBackToTop::after {
                    content: "";
                    border-radius: 50%;
                    border: 6px solid #00ffcb;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: ring 1.5s infinite;
                    pointer-events: none;
                }

                @keyframes ring {
                    0% {
                        width: 30px;
                        height: 30px;
                        opacity: 1;
                    }
                    100% {
                        width: 100px;
                        height: 100px;
                        opacity: 0;
                    }
                }
            `}</style>

            <button
                onClick={handleScrollToTop}
                className="btn btn-primary m-0 p-1 px-2 position-fixed"
                id="btnBackToTop"
                title="Scroll to Top"
                aria-label="Scroll to top"
                style={{
                    bottom: '25px',
                    right: '10px',
                    zIndex: 9999,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <i className="bi bi-arrow-up-circle-fill fs-5"></i>
            </button>
        </>
    );
}

export default ScrollUp;

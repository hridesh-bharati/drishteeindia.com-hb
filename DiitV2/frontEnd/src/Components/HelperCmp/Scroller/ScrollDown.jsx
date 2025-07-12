import React, { useEffect, useState } from "react";

export default function ScrollDownArrow() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY < 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="scroll-arrow text-center">
            <style>{`
                .scroll-arrow {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 999;
                    opacity: 0.8;
                }
                .bounce-icon {
                    animation: bounce 1.5s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
            `}</style>
            <i className="fas fa-arrow-down bounce-icon text-secondary fs-4"></i>
        </div>
    );
}

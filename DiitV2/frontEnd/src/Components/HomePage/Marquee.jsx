// Marquee.js
import React, { useRef } from 'react';

function Marquee(props) {
    const marqueeRef = useRef(null);

    const stopMarqueeScroll = () => {
        if (marqueeRef.current) {
            marqueeRef.current.stop();
        }
    };

    const startMarqueeScroll = () => {
        if (marqueeRef.current) {
            marqueeRef.current.start();
        }
    };

    return (
        <marquee
            ref={marqueeRef}
            {...props}
            onMouseEnter={stopMarqueeScroll}
            onMouseLeave={startMarqueeScroll}
        >
            {props.children}
        </marquee>
    );
}

export default Marquee;

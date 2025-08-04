import React, { useState, useEffect } from 'react';

export default function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString(undefined, { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false
    });

    return (
        <span className='d-inline small text-uppercase'>
            {formattedTime}
        </span>
    );
}

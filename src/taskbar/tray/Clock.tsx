import React, { useState, useEffect } from 'react';

export function Clock() {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timer);
    });

    const formattedTime = time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    
    return <span>{formattedTime}</span>;
}

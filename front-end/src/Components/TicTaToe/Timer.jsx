import React, { useState, useEffect } from 'react'

function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    return (
        <div className="timer_container my-auto mx-auto w-full h-2/4 flex flex-col items-center border-2 max-w-48 border-white rounded-lg">
            <h1 className="text-2xl text-white my-auto mx-auto">Time</h1>
            <h2 className="text-xl text-white my-auto mx-auto">{formatTime(time)}</h2>
        </div>
    );
}

export default Timer
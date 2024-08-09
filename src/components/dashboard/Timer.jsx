import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import TimeUnit from './TimeUnit';

function Timer() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const incrementTime = (unit) => {
        if (unit === 'hours') setHours((prevHours) => (prevHours + 1) % 24);
        if (unit === 'minutes') setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
        if (unit === 'seconds') setSeconds((prevSeconds) => (prevSeconds + 1) % 60);
    };

    const decrementTime = (unit) => {
        if (unit === 'hours' && hours > 0) setHours(hours - 1);
        if (unit === 'minutes' && minutes > 0) setMinutes(minutes - 1);
        if (unit === 'seconds' && seconds > 0) setSeconds(seconds - 1);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        setDuration(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds]);

    // console.log(duration)

    return (
        <div className="bg-[#1E2343] p-10 rounded-2xl flex flex-col md:flex-row justify-around items-center gap-5">
            <div className="bg-[#191E39] rounded-full p-4">
                <CountdownCircleTimer isPlaying={isPlaying} duration={duration} colors="#FF6A6A" strokeWidth={6} onComplete={() => { setIsPlaying(false); setHours(0); setMinutes(0); setSeconds(0); setDuration(0); }}>
                    {({ remainingTime }) => {
                        if (remainingTime < 0) remainingTime = 0;
                        return <div className="text-white text-3xl font-medium">{formatTime(remainingTime)}</div>;
                    }}
                </CountdownCircleTimer>
            </div>
            <div className="flex flex-col gap-7">
                <div className="flex items-center gap-7">
                    <TimeUnit unit="hours" value={hours} isPlaying={isPlaying} incrementTime={incrementTime} decrementTime={decrementTime} />
                    <p className="text-white text-3xl mt-10">:</p>
                    <TimeUnit unit="minutes" value={minutes} isPlaying={isPlaying} incrementTime={incrementTime} decrementTime={decrementTime} />
                    <p className="text-white text-3xl mt-10">:</p>
                    <TimeUnit unit="seconds" value={seconds} isPlaying={isPlaying} incrementTime={incrementTime} decrementTime={decrementTime} />
                </div>
                <button className="rounded-3xl bg-[#FF6A6A] text-white py-2 px-4 focus:outline-none" onClick={() => duration > 0 && setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Start'}</button>
            </div>
        </div >
    )
}

export default Timer

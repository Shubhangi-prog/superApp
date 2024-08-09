import React from 'react';

const TimeUnit = ({ unit, value, isPlaying, incrementTime, decrementTime }) => {
    return (
        <div className={`flex flex-col items-center ${unit}`}>
            <p className="text-[#949494] mb-5">{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
            <img className={isPlaying ? 'pointer-events-none' : 'cursor-pointer'} src="/images/icons/arrow-up.png" width={20} onClick={() => incrementTime(unit)} alt={`Increase ${unit}`} />
            <h4 className="text-white text-3xl my-5">{String(value).padStart(2, '0')}</h4>
            <img className={isPlaying ? 'pointer-events-none' : 'cursor-pointer'} src="/images/icons/arrow-down.png" width={20} onClick={() => decrementTime(unit)} alt={`Decrease ${unit}`} />
        </div>
    );
};

export default TimeUnit;
import React, { useState, useEffect, useRef } from 'react';

interface ICountdownProps {
    seconds: number;
    children: (timerValue: number) => React.ReactNode;
    className?: string;
    renderDone?: React.ReactNode;
}

export const Countdown = ({ className, children, renderDone, seconds: startedValue }: ICountdownProps) => {
    const [value, setValue] = useState(startedValue);
    const [done, setDone] = useState(false);
    const timer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timer.current = setInterval(() => {
            setValue(val => val - 1);
        }, 1000);
        return () => clearInterval(timer.current);
    }, [startedValue]);

    useEffect(() => {
        if (value === 0) {
            setDone(true);
            clearInterval(timer.current);
        }
    }, [value]);

    return <div className={className}>{done && renderDone ? renderDone : children(value)}</div>;
};

import React, { useMemo } from 'react';
import classNames from 'classnames/bind';

import css from './Stepper.module.scss';

const cx = classNames.bind(css);

interface IStepperProps {
    className?: string;
    total: number;
    current: number;
}

export const Stepper = ({ className, total, current }: IStepperProps) => {
    const steps = useMemo(() => new Array(total).fill(null), [total]);

    return (
        <div className={cx(css.Root, className)}>
            {steps.map((_, idx) => {
                const isDone = current > idx;
                return <div key={idx} className={cx(css.Step, { [css.Done]: isDone })} />;
            })}
        </div>
    );
};

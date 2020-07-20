import React from 'react';
import classNames from 'classnames/bind';

import checkIcon from 'lib/ui-kit/assets/icons/otp/check.svg';
import css from './Stepper.module.scss';

const cx = classNames.bind(css);

interface IStep {
    title: string;
}

interface IStepperProps {
    className?: string;
    // children: React.ReactNode;
    steps: IStep[];
    current: number;
    isVertical?: boolean;
}

export const Stepper = ({ className, steps, current, isVertical }: IStepperProps) => (
    <div className={cx(css.Root, { [css.Vertical]: isVertical }, className)}>
        <div className={css.Line} />
        {steps.map((step, idx) => {
            const isCurrent = current === idx;
            const isDone = current > idx;
            const number = idx + 1;

            return (
                <div className={css.Step} key={idx}>
                    <div className={cx(css.Indicator, { [css.Done]: isDone, [css.Current]: isCurrent })}>
                        {!isDone && number}
                        {isDone && <img src={checkIcon} alt="Done Icon" />}
                    </div>
                    {/* <div className={css.Description}>{step.title}</div> */}
                </div>
            );
        })}
    </div>
);

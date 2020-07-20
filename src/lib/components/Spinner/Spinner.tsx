import React from 'react';
import cN from 'classnames/bind';
import css from './Spinner.module.scss';

interface ISpinnerProps {
    className?: string;
    loaderClassName?: string;
    withBackdrop?: boolean;
    message?: string;
}

const cx = cN.bind(css);

export function Spinner(props: ISpinnerProps) {
    const { withBackdrop = false, message, className, loaderClassName } = props;

    const cssClasses = cx(css.Spinner, { [css.WithBackdrop]: withBackdrop }, className);

    return (
        <div className={cssClasses}>
            <div className={cx(css.Loader, loaderClassName)}>
                <svg className={css.Circular} viewBox="25 25 50 50">
                    <circle
                        className={css.Path}
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
            {message && <p className="loader__message">{message}</p>}
        </div>
    );
}

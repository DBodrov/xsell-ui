import React from 'react';
import css from './MinmaxText.module.scss';

interface IMinmaxTextProps {
    minText?: string;
    maxText?: string;
}

export function MinmaxText(props: IMinmaxTextProps) {
    const { minText = '', maxText = '' } = props;

    return (
        <div className={css.MinmaxText}>
            <span className={css.MinText}>{minText}</span>
            <span className={css.MaxText}>{maxText}</span>
        </div>
    );
}

import React from 'react';
import css from './Label.module.scss';

interface ILabelProps {
    text: string;
    htmlFor: string;
    inline?: boolean;
    children?: React.ReactNode | never;
}

export function Label(props: ILabelProps) {
    const { htmlFor, text, children } = props;

    return (
        <label className={css.Label} htmlFor={htmlFor}>
            {children || text}
        </label>
    );
}

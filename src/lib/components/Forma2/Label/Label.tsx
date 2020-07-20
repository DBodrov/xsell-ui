import React from 'react';
import css from './Label.module.scss';

interface ILabelProps {
    text: string;
    htmlFor: string;
    inline?: boolean;
    children?: React.ReactNode | never;
}

export function Label(props: ILabelProps) {
    const { htmlFor, text, children, inline = false } = props;
    const cssLabel = `${css.Label} ${inline ? css.Inline : ''}`;

    return (
        <label className={cssLabel} htmlFor={htmlFor}>
            {children || text}
        </label>
    );
}

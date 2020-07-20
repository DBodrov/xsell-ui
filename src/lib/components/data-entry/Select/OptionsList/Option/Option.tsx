import React from 'react';
import cN from 'classnames/bind';
import { IOptionProps } from '../../types';
import css from './Option.module.scss';

const cx = cN.bind(css);

export function Option(props: IOptionProps) {
    const { value, caption, isActive = false, isDisabled = false, onClick } = props;
    const cssClasses = cx(css.Option, { [css.isActive]: isActive }, { [css.isDisabled]: isDisabled });

    const handleSelectItem = () => {
        onClick && onClick(value);
    };
    return (
        <div className={cssClasses} role="menuitem" tabIndex={0} onClick={handleSelectItem}>
            {caption}
        </div>
    );
}

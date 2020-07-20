import React, { useState } from 'react';
import cN from 'classnames/bind';
import { ICheckboxProps, TCheckboxChangeEvent } from './types';
import css from './Checkbox.module.scss';

const cx = cN.bind(css);

export function Checkbox(props: ICheckboxProps) {
    const {
        disabled,
        className,
        indeterminate,
        checked = false,
        onChangeHandler,
        children,
        name,
        onBlurHandler,
        onFocusHandler,
    } = props;
    const [isHovered, setHovered] = useState(false);
    const [isFocused, setFocused] = useState(false);

    const getClassNames = () =>
        cx(
            css.Checkbox,
            className,
            { [css.isDisabled]: disabled },
            { [css.isChecked]: Boolean(!indeterminate && checked) },
            { [css.isIndeterminate]: indeterminate },
            { [css.isHovered]: isHovered },
            { [css.isFocused]: isFocused }
        );

    const handleChange = (event: TCheckboxChangeEvent) => {
        event.preventDefault();
        (event as React.ChangeEvent<HTMLInputElement>).target.name = name;
        if (indeterminate) {
            onChangeHandler(false, event);
        } else {
            const checkedState = !checked;
            onChangeHandler(checkedState, event);
        }
    };

    const handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        setHovered(true);
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        setHovered(false);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setFocused(true);
        onFocusHandler && onFocusHandler(event.currentTarget.checked);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setFocused(false);
        onBlurHandler && onBlurHandler(event.currentTarget.checked);
    };

    return (
        <label
            className={getClassNames()}
            data-testid="checkbox"
            htmlFor={name}
            onClick={!disabled ? handleChange : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <span className={css.Box}>
                <input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={css.Control}
                    data-testid="native-input"
                    name={name}
                    id={name}
                    type="checkbox"
                    disabled={disabled}
                    checked={checked}
                    onChange={handleChange}
                />
            </span>
            {children}
        </label>
    );
}

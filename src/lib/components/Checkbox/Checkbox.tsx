import React, { useState } from 'react';
import cN from 'classnames/bind';
import css from './Checkbox.module.scss';

// type TCheckboxChangeEvent =
//     | React.ChangeEvent<HTMLInputElement>
//     | React.MouseEvent<HTMLLabelElement, MouseEvent>;
type TCheckboxChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLSpanElement, MouseEvent>;

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    indeterminate?: boolean;
    hasError: boolean;
    'data-testid'?: string;
    onFocusHandler?: (value: boolean) => void;
    onBlurHandler?: (value: boolean) => void;
    onChangeHandler: (value: boolean) => void;
    onClearHandler?: (name: string) => void;
}

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
        label,
        onBlurHandler,
        onFocusHandler,
        tabIndex,
        hasError,
        'data-testid': testid,
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
            { [css.isFocused]: isFocused },
            { [css.hasError]: hasError }
        );

    const handleChange = (event: TCheckboxChangeEvent) => {
        event.preventDefault();
        if (indeterminate) {
            onChangeHandler(false);
        } else {
            const checkedState = !checked;
            onChangeHandler(checkedState);
        }
    };

    const handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = event => {
        event.preventDefault();
        setHovered(true);
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = event => {
        event.preventDefault();
        setHovered(false);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(true);
        onFocusHandler && onFocusHandler(event.currentTarget.checked);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocused(false);
        onBlurHandler && onBlurHandler(event.currentTarget.checked);
    };

    // const labelIsClickable = () => !disabled && label && label.trim().length > 0;

    return (
        <label
            className={getClassNames()}
            data-testid={testid || 'checkbox'}
            htmlFor={name}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={css.Box}>
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
                    tabIndex={tabIndex}
                />
            </div>
            {children ? children : label}
        </label>
    );
}

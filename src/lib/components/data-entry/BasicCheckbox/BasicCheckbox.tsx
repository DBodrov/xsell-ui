import React, { useState } from 'react';
import cN from 'classnames/bind';
import css from './BasicCheckbox.module.scss';

// type TCheckboxChangeEvent =
//     | React.ChangeEvent<HTMLInputElement>
//     | React.MouseEvent<HTMLLabelElement, MouseEvent>;
type TCheckboxChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLSpanElement, MouseEvent>;

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value?: string;
    indeterminate?: boolean;
    checkboxtext?: string | any;
    onFocusHandler?: (value: boolean) => void;
    onBlurHandler?: (value: boolean) => void;
    onChangeHandler: (value: boolean) => void;
    onClearHandler?: (name: string) => void;
}

const cx = cN.bind(css);

export function BasicCheckbox(props: ICheckboxProps) {
    const {
        disabled,
        className,
        indeterminate,
        checked = false,
        onChangeHandler,
        children,
        checkboxtext,
        name,
        onBlurHandler,
        onFocusHandler,
    } = props;
    const [isHovered, setHovered] = useState(false);
    const [isFocused, setFocused] = useState(false);

    const getClassNames = () =>
        cx(
            css.BasicCheckbox,
            className,
            { [css.isDisabled]: disabled },
            { [css.isChecked]: Boolean(!indeterminate && checked) },
            { [css.isIndeterminate]: indeterminate },
            { [css.isHovered]: isHovered },
            { [css.isFocused]: isFocused }
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

    return (
        <label
            className={getClassNames()}
            data-testid="basic-checkbox"
            htmlFor={name}
            // onClick={!disabled ? handleChange : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <span className={css.Box} onClick={!disabled ? handleChange : undefined}>
                <input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={css.Control}
                    data-testid="native-input"
                    name={name}
                    type="checkbox"
                    disabled={disabled}
                    checked={checked}
                    onChange={handleChange}
                />
            </span>
            {children || checkboxtext ? <span className={css.Text}>{children || checkboxtext}</span> : null}
        </label>
    );
}

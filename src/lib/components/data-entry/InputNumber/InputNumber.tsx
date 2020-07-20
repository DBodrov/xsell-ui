import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { IInputNumberProps } from './types';
import { isEmptyString } from 'utils/string.utils';
import { toDecimalString } from 'utils/numeric.utils';
import closeIco from 'ui-kit/assets/icons/forms/close.svg';
import css from './InputNumber.module.scss';

const cx = classNames.bind(css);

const toString = (value: string | number) => {
    if (typeof value === 'number') {
        return String(value);
    }
    return value;
};

export function InputNumber(props: IInputNumberProps) {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type,
        hasClear,
        hasError = false,
        disabled = false,
        className,
        locales = 'ru-RU',
        formatOptions = {},
        styles = {},
        value = '',
        parser = 'parseFloat',
        zeroWhenEmpty = false,
        onClearHandler,
        onFocusHandler,
        onChangeHandler,
        onBlurHandler,
        name,
        ...inputProps
    } = props;

    const [isFocused, setFocus] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [isShowClear, setShowClear] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getCssClasses = () =>
        cx(
            css.container,
            { [css.isDisabled]: disabled },
            { [css.hasError]: hasError },
            { [css.isFocused]: isFocused },
            { [css.isHovered]: isHovered },
            className
        );

    const applyNumberOptions = (value: string) => {
        if (isEmptyString(value)) return '';
        const result = Number(value);
        if (formatOptions) {
            const fixedParam = formatOptions.maximumFractionDigits;
            return result.toFixed(fixedParam);
        }
        return value;
    };

    const formatAsLocaleString = (rawValue: string | number) => {
        const valueStringified = toString(rawValue);
        return toDecimalString(valueStringified, locales, formatOptions, parser);
    };

    const formatAsNumber = (value: string | number) => {
        const valueStringified = toString(value);
        const numericVal = formatOptions ? applyNumberOptions(valueStringified) : valueStringified;

        if (zeroWhenEmpty) {
            return isEmptyString(numericVal) ? 0 : Number[parser](numericVal);
        }
        return isEmptyString(numericVal) ? '' : Number[parser](numericVal);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.currentTarget;
        const formattedValue = formatAsNumber(value);
        onChangeHandler && onChangeHandler(formattedValue);
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleChangeHolder = () => {};

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setFocus(true);
        setIsEditing(true);
        const val = Number(event.target.value);
        onFocusHandler && onFocusHandler(val);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setFocus(false);
        setIsEditing(false);
        const val = Number(event.target.value);
        onBlurHandler && onBlurHandler(val);
    };

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(true);
        const hasValue = String(value).length > 0;
        if (hasClear && hasValue && !disabled) {
            setShowClear(true);
        }
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(false);
        if (isShowClear) {
            setShowClear(false);
        }
    };

    const handleClear: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!onClearHandler) {
            throw new Error('onClearHandler props is required!');
        }
        onClearHandler(name);
    };

    return (
        <div
            className={getCssClasses()}
            style={styles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {isEditing ? (
                <input
                    className={css.InputControl}
                    value={value}
                    name={name}
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={disabled}
                    autoComplete="off"
                    {...inputProps}
                />
            ) : (
                <input
                    className={css.InputControl}
                    value={formatAsLocaleString(value)}
                    name={name}
                    type="tel"
                    onFocus={handleFocus}
                    onChange={handleChangeHolder}
                    disabled={disabled}
                    autoComplete="off"
                    {...inputProps}
                />
            )}

            {isShowClear && (
                <div className={css.ClearButton} onClick={handleClear} role="button" tabIndex={-1}>
                    <img src={closeIco} alt="X" />
                </div>
            )}
        </div>
    );
}

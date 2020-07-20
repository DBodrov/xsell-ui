import React, { ChangeEventHandler, useCallback } from 'react';
import cN from 'classnames/bind';
import { isEmptyString, toDecimalString } from '../utils';
import { IRangeInputProps } from '../types';
import css from './RangeInput.module.scss';

const cx = cN.bind(css);

export function RangeInput(props: IRangeInputProps) {
    const {
        name,
        value = '',
        onChange,
        caption,
        disabled = false,
        onTouch,
        isTouched,
        onBlurHandler,
        hasError,
    } = props;

    const cssClasses = cx(css.RangeInput, { [css.hasError]: hasError }, { [css.isDisabled]: disabled });

    const formatDisplayValue = useCallback((val: string | number) => {
        let stringValue: string;
        if (typeof val === 'number') {
            stringValue = String(val);
        } else {
            const onlyDigits = val.replace(/\D/g, '');
            stringValue = onlyDigits;
        }
        return isEmptyString(stringValue) ? '' : toDecimalString(stringValue);
    }, []);

    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        const val = event.currentTarget.value;
        const onlyDigits = val.replace(/\D/g, '');
        onChange(onlyDigits);
    };

    const handleClick = () => {
        onTouch(true);
    };

    const handleBlur = () => {
        onTouch(false);
        onBlurHandler && onBlurHandler();
    };

    return (
        <div className={cssClasses}>
            {isTouched ? (
                <input
                    className={css.Control}
                    type="number"
                    name={name}
                    onBlur={handleBlur}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <input
                    className={css.Control}
                    data-testid="range-input"
                    type="text"
                    name={name}
                    value={formatDisplayValue(value)}
                    onChange={handleChange}
                    onClick={handleClick}
                    onTouchStart={handleClick}
                    // onPointerDown={handleClick}
                    disabled={disabled}
                />
            )}

            <div className={css.Caption}>
                <h4 className={css.CaptionText}>{caption}</h4>
            </div>
        </div>
    );
}

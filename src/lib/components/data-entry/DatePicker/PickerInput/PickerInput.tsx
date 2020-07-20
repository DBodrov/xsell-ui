import React, { useState, useRef, useEffect } from 'react';
import cN from 'classnames/bind';
import calendarIcon from 'ui-kit/assets/icons/interfaces/calendar-green.svg';
import { useDatePicker } from '../DatePicker.provider';
import { usePickerInput } from './hook';
import css from './PickerInput.module.scss';

const cx = cN.bind(css);

export interface IPickerInputProps {
    disabled?: boolean;
    hasError?: boolean;
    onClick: () => void;
}

export function PickerInput(props: IPickerInputProps) {
    const { disabled, hasError, onClick } = props;

    const {
        value,
        handleBlurInput,
        placeholder = '',
        isFocused,
        handleSetFocus,
        tabIndex = 0,
    } = useDatePicker();

    const pickerInputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarBtn = useRef<HTMLButtonElement>(null);

    const [isHovered, setHovered] = useState(false);

    const { displayValue, handleChangeDate } = usePickerInput(inputRef);

    const cssClasses: string = cx(
        css.PickerInput,
        { [css.isDisabled]: disabled },
        { [css.hasError]: hasError },
        { [css.isFocused]: isFocused },
        { [css.isHovered]: isHovered }
    );

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(true);
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(false);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        handleSetFocus(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget, event.relatedTarget);
        const relatedTarget = event.relatedTarget as Node;
        if (
            relatedTarget !== null &&
            (relatedTarget.contains(calendarBtn.current) || relatedTarget.contains(inputRef.current))
        ) {
            return;
        }

        handleBlurInput(displayValue);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault();
        handleChangeDate(event);
    };

    const handleShowCalendar = () => {
        onClick();
    };

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        } else {
            inputRef.current.blur();
        }
    }, [isFocused, value]);

    return (
        <div
            className={cssClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleBlur}
            onFocus={handleFocus}
            role="presentation"
            ref={pickerInputRef}>
            <input
                type="tel"
                tabIndex={tabIndex}
                aria-label="picker-input"
                ref={inputRef}
                className={css.InputControl}
                autoComplete="off"
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
            />

            <button
                className={css.CalendarButton}
                type="button"
                ref={calendarBtn}
                onClick={handleShowCalendar}
                aria-label="calendar-button">
                <img src={calendarIcon} alt="X" className={css.Icon} />
            </button>
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import closeIco from 'ui-kit/assets/icons/forms/close.svg';
import { IBasicInputProps } from './types';
import css from './BasicInput.module.scss';

const cx = classNames.bind(css);

export function BasicInput(props: IBasicInputProps) {
    const {
        hasClear,
        hasError = false,
        disabled = false,
        className,
        styles = {},
        value = '',
        icon,
        onClearHandler,
        onFocusHandler,
        onChangeHandler,
        onBlurHandler,
        name,
        selectionStart,
        selectionEnd,
        extendProps = {},
        ...inputProps
    } = props;

    const { control = {}, wrapper = {} } = extendProps;

    const [isFocused, setFocus] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [isShowClear, setShowClear] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const cssClasses: string = cx(
        css.BasicInput,
        { [css.isDisabled]: disabled },
        { [css.hasError]: hasError },
        { [css.isFocused]: isFocused },
        { [css.isHovered]: isHovered },
        className
    );

    const handleImgNoSrc: React.ReactEventHandler<HTMLImageElement> = event => {
        if (event.currentTarget instanceof HTMLImageElement) {
            const image = event.currentTarget;
            image.src = 'ui-kit/assets/icons/forms/close.svg';
        }
    };

    const handleIconClick: React.ReactEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
        inputRef.current.focus();
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault();
        const val = props.type === 'number' ? Number(event.target.value) : event.target.value;
        onChangeHandler(val, event);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocus(true);
        const val = props.type === 'number' ? Number(event.target.value) : event.target.value;
        onFocusHandler && onFocusHandler(val);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocus(false);
        const val = props.type === 'number' ? Number(event.target.value) : event.target.value;
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

    const handleClear: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        event.stopPropagation();
        if (!onClearHandler) {
            throw new Error('onClearHandler props is required!');
        }
        onClearHandler(name);
    };

    useEffect(() => {
        if (inputProps.type === 'text' || inputProps.type === 'tel') {
            if (Boolean(selectionStart) && Boolean(selectionEnd)) {
                inputRef?.current?.setSelectionRange(selectionStart, selectionEnd);
            }
        }
    }, [inputProps.type, selectionEnd, selectionStart, value]);

    return (
        <div
            className={cssClasses}
            style={styles}
            data-testid="basic-input"
            {...wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {icon && (
                <div className={css.Icon} onClick={handleIconClick} role="button" tabIndex={-1}>
                    <img src={icon} alt="no icon" onError={handleImgNoSrc} />
                </div>
            )}
            <input
                className={css.InputControl}
                value={value}
                name={name}
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={disabled}
                {...control}
                {...inputProps}
            />

            {isShowClear && (
                <div className={css.ClearButton} onClick={handleClear} role="button" tabIndex={-1}>
                    <img src={closeIco} alt="X" />
                </div>
            )}
        </div>
    );
}

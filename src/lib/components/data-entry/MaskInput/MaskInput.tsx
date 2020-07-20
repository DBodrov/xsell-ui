import React, { useState, useRef } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames/bind';
import closeIco from 'lib/ui-kit/assets/icons/forms/close.svg';
import { Formatter } from 'services';
import { IMaskInputProps } from './types';
import css from './MaskInput.module.scss';

const cx = classNames.bind(css);

export function MaskInput(props: IMaskInputProps) {
    const {
        hasError = false,
        disabled = false,
        styles = {},
        value = '',
        hasClear,
        icon,
        onClearHandler,
        onFocusHandler,
        onChangeHandler,
        onBlurHandler,
        name,
        mask,
        required,
        type,
        ...inputProps
    } = props;

    const [isFocused, setFocus] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [isShowClear, setShowClear] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const inpRef = React.createRef<HTMLInputElement>();

    const cssClasses: string = cx(
        css.MaskInput,
        { [css.isDisabled]: disabled },
        { [css.hasError]: hasError },
        { [css.isFocused]: isFocused },
        { [css.isHovered]: isHovered }
    );

    const handleImgNoSrc: React.ReactEventHandler<HTMLImageElement> = event => {
        if (event.currentTarget instanceof HTMLImageElement) {
            const image = event.currentTarget;
            image.src = 'lib/ui-kit/assets/icons/forms/close.svg';
        }
    };

    const handleIconClick: React.ReactEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
        inputRef.current.focus();
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        onChangeHandler(Formatter.getDigitals2(event.target.value));
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocus(true);
        const val = type === 'number' ? Number(event.target.value) : event.target.value;
        onFocusHandler && onFocusHandler(val);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        setFocus(false);
        const val = type === 'number' ? Number(event.target.value) : event.target.value;
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

    return (
        <div
            className={cssClasses}
            style={styles}
            data-testid="mask-input"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {icon && (
                <div className={css.Icon} onClick={handleIconClick} role="button" tabIndex={-1}>
                    <img src={icon} alt="no icon" onError={handleImgNoSrc} />
                </div>
            )}

            <InputMask
                type="text"
                inputRef={inpRef}
                data-testid="native-input"
                required={required}
                className={css.InputControl}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                mask={mask}
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

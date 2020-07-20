import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { IBasicTextareaProps } from './types';
import css from './BasicTextarea.module.scss';

const cx = classNames.bind(css);

const defaultProps: Partial<IBasicTextareaProps> = {
    hasError: false,
    value: '',
    disabled: false,
    resizable: false,
    rows: 5,
    styles: {},
};

const TextareaControls = ({ children }: { children: React.ReactNode }) => (
    <div className={css.Controls}>{children}</div>
);

export function BasicTextarea(props: IBasicTextareaProps) {
    const {
        hasClear,
        hasError,
        disabled,
        styles,
        value,
        resizable,
        onFocusHandler,
        onChangeHandler,
        onBlurHandler,
        controls,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onClearHandler,
        name,
        ...textareaProps
    } = props;

    const [isFocused, setFocus] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [isShowClear, setShowClear] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const cssClasses: string = cx(
        css.BasicTextarea,
        { [css.isDisabled]: disabled },
        { [css.hasError]: hasError },
        { [css.isFocused]: isFocused },
        { [css.isHovered]: isHovered },
        { [css.isResizable]: resizable }
    );

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        event.preventDefault();
        onChangeHandler(event.target.value);
    };

    const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = event => {
        setFocus(true);
        onFocusHandler && onFocusHandler(event.currentTarget.value);
    };

    const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = event => {
        setFocus(false);
        onBlurHandler && onBlurHandler(event.currentTarget.value);
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

    return (
        <div
            className={cssClasses}
            style={styles}
            data-testid="basic-textarea"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <textarea
                className={css.TextareaField}
                data-testid="native-textarea"
                value={value}
                name={name}
                ref={textareaRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={disabled}
                {...textareaProps}
            />
            {controls && <TextareaControls>{controls}</TextareaControls>}
        </div>
    );
}

BasicTextarea.defaultProps = defaultProps;

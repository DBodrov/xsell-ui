import React from 'react';
import closeIco from 'lib/ui-kit/assets/icons/forms/close-red.svg';
import css from './ErrorText.module.scss';

interface IErrorTextProps {
    errorMessage: string;
    styles?: React.CSSProperties;
    textStyles?: React.CSSProperties;
    hasClear?: boolean;
    onClear?: () => void;
}

export function ErrorText({ errorMessage, styles, textStyles, hasClear, onClear }: IErrorTextProps) {
    const handleClear = () => onClear();

    return (
        <div className={css.ErrorText} style={styles}>
            <span className={css.Message} style={textStyles}>
                {errorMessage}
            </span>
            {hasClear && (
                <div className={css.ClearButton} onClick={handleClear} role="button" tabIndex={-1}>
                    <img src={closeIco} alt="X" />
                </div>
            )}
        </div>
    );
}

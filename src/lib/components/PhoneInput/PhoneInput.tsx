import React from 'react';
import { BasicInput } from 'lib/components/data-entry/BasicInput';
import { IPhoneInputProps } from './types';
import { useMask } from './phoneInput.hook';

export function PhoneInput(props: IPhoneInputProps) {
    const { mask = '(999) 999-99-99', countryCode = '', onChangeHandler, name, ...inputProps } = props;

    const { handleMaskedChange, cursor, setKey } = useMask(mask, countryCode);

    const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const val = value;
        const cursorStart = event.currentTarget.selectionStart;
        const maskedValue = handleMaskedChange(val, cursorStart);
        onChangeHandler(maskedValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setKey(event.keyCode);
    };

    return (
        <BasicInput
            type="tel"
            name={name}
            onChangeHandler={handleChange}
            onKeyDown={handleKeyDown}
            selectionStart={cursor}
            selectionEnd={cursor}
            {...inputProps}
        />
    );
}

import React from 'react';
import { BasicInput } from 'lib/components/data-entry/BasicInput';
import { IMaskInputProps } from './types';
import { useMask } from './mask.hook';

export function MaskInput(props: IMaskInputProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mask, type, onChangeHandler, name, ...inputProps } = props;

    const { handleMaskedChange, cursor, setKey } = useMask(mask);

    const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const val = value;
        const cursorStart = event.currentTarget.selectionStart;
        const maskedValue = handleMaskedChange(val, cursorStart);
        onChangeHandler(maskedValue, event);
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

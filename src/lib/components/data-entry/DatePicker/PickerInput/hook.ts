import React, { useEffect, useCallback, useState } from 'react';
import { useDatePicker } from '../DatePicker.provider';

const regEx = new RegExp(/^\d{0,8}$/g);

const unmask = (value: string) => {
    const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
    return output;
};

const mask = (value: string) => {
    const output = [];
    for (let i = 0; i < value.length; i++) {
        if (i === 2 || i === 4) {
            output.push('.');
        }
        output.push(value[i]);
    }
    return output.join('');
};

export function usePickerInput(inputRef: React.RefObject<HTMLInputElement>) {
    const { handleChangeValue, value: displayValue } = useDatePicker();
    const [cursor, setCursor] = useState(0);
    const [key, setKey] = useState(null);

    const newCursorPosition = useCallback(
        (value: string) => {
            const saveCursor = inputRef.current.selectionEnd;
            const prevVal = unmask(displayValue);
            let newCursor: number;

            if (prevVal.length < value.length) {
                newCursor = saveCursor;
                if (newCursor === 3 || newCursor === 6) {
                    newCursor++;
                }
            } else if (prevVal.length > value.length) {
                newCursor = saveCursor;
                if (newCursor === 3 || newCursor === 6) {
                    newCursor--;
                }
            } else if (prevVal.length === value.length) {
                newCursor = saveCursor;
                if ((newCursor === 2 || newCursor === 5) && key === 46) {
                    newCursor++;
                } else if ((newCursor === 3 || newCursor === 6) && key === 8) {
                    newCursor--;
                }
            }
            return newCursor;
        },
        [displayValue, inputRef, key]
    );

    const handleChangeDate = useCallback(
        ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            const saveCursor = inputRef.current.selectionEnd;
            const prevValue = displayValue;
            let newValue = unmask(value);
            let newCursor = newCursorPosition(newValue);
            if (newValue.match(regEx)) {
                newValue = mask(newValue);
            } else {
                newValue = prevValue;
                newCursor = saveCursor;
            }
            setCursor(newCursor);
            handleChangeValue(newValue);
        },
        [displayValue, handleChangeValue, inputRef, newCursorPosition]
    );

    useEffect(() => {
        inputRef.current.setSelectionRange(cursor, cursor);
    }, [cursor, inputRef, displayValue]);

    useEffect(() => {
        const input = inputRef.current;
        const handleKeydown = (event: KeyboardEvent) => {
            setKey(event.keyCode);
        };

        input.addEventListener('keydown', handleKeydown);

        return () => input.removeEventListener('keydown', handleKeydown);
    }, [inputRef]);

    return { displayValue, cursor, handleChangeDate };
}

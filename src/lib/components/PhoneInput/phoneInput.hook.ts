import { useState, useCallback, useRef } from 'react';
import { isSpecSymbol, isPrefix, isAllowedChar, patterns, isEmptyString } from './utils';
import { IMaskConfig, IMaskOptions, ChangeType } from './types';

const parseMask = (mask: string, prefix = ''): IMaskOptions => {
    const config: IMaskConfig = {};
    const hasPrefix = !isEmptyString(prefix);
    mask.split('').forEach((char, i) => {
        if (isSpecSymbol(char)) {
            config[i] = { type: 'symbol', value: char, position: hasPrefix ? i + prefix.length : i };
        } else if (patterns[char]) {
            config[i] = { type: 'digit', position: hasPrefix ? i + prefix.length : i };
        }
    });

    return {
        prefix,
        charsConfig: config,
    };
};

const unmask = (value: string) => {
    if (!value || value.trim().length === 0) return '';
    const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
    return output;
};

export const useMask = (mask: string, prefix = '') => {
    const [cursor, setCursor] = useState(-1);
    const [key, setKey] = useState(null);
    const maskOptions = parseMask(mask, prefix);

    const hasPrefix = prefix.trim().length > 0;
    const maxOutputLength = unmask(`${prefix}${mask}`).length;

    const prevValue = useRef('');
    const prevCursor = useRef(0);
    const getChangeType = useCallback((): ChangeType => {
        if (key === 8) return 'backspace';
        if (key === 46) return 'delete';
        return 'default';
    }, [key]);

    const availablePositions = Object.values(maskOptions.charsConfig)
        .filter(cfg => cfg.type === 'digit')
        .map(x => x.position + 1); //позиция курсора после введенного символа;

    const nextCursorPosition = useCallback(
        (nextCursor: number) => {
            if (availablePositions.some(ap => nextCursor <= ap)) {
                const positions = availablePositions.filter(ap => nextCursor <= ap + 1);
                const result = Math.min(...positions);
                return result;
            }
            return nextCursor;
        },
        [availablePositions]
    );

    const previousCursorPosition = useCallback(
        (current: number) => {
            if (availablePositions.some(position => current >= position)) {
                const positions = availablePositions.filter(pos => current >= pos - 1);
                const result = Math.max(...positions);
                return result;
            }
            return Math.min(...availablePositions);
        },
        [availablePositions]
    );

    const updateCursor = useCallback(
        (nextValue: string) => {
            let newCursor: number;
            const diffChars = nextValue.length - prevValue.current.length;
            const changeType = getChangeType();

            if (prevValue.current.length < nextValue.length) {
                newCursor = nextCursorPosition(prevCursor.current + diffChars);
            } else if (prevValue.current.length > nextValue.length) {
                if (changeType === 'delete') {
                    if (hasPrefix && prevCursor.current < prefix.length) {
                        newCursor = prefix.length;
                    } else {
                        newCursor = prevCursor.current;
                    }
                } else {
                    newCursor = previousCursorPosition(prevCursor.current + diffChars);
                }
            } else if (prevValue.current.length === nextValue.length) {
                if (changeType === 'backspace') {
                    newCursor = previousCursorPosition(prevCursor.current - 1);
                } else if (changeType === 'delete') {
                    newCursor = prevCursor.current;
                } else {
                    newCursor = nextCursorPosition(prevCursor.current + 1);
                }
            }

            setCursor(newCursor);
            prevValue.current = nextValue;
        },
        [getChangeType, hasPrefix, nextCursorPosition, prefix.length, previousCursorPosition]
    );

    const handleMaskedChange = useCallback(
        (value: string, cursorStart: number) => {
            prevCursor.current = cursorStart;
            if (isEmptyString(value)) return '';

            const splitedValue = unmask(value).split('');
            if (splitedValue.length === 0) return '';
            const output = [];

            if (splitedValue.length > maxOutputLength) {
                splitedValue.pop();
            }

            hasPrefix ? output.push(maskOptions.prefix) : output.push('');

            Object.values(maskOptions.charsConfig).forEach(char => {
                if (hasPrefix && isPrefix(maskOptions.prefix, splitedValue[0], output.length - 1)) {
                    splitedValue.shift();
                }
                if (splitedValue.length !== 0 && char.type === 'symbol') {
                    output.push(char.value);
                }

                if (isAllowedChar(maskOptions, splitedValue[0], output.length - 1)) {
                    output.push(splitedValue.shift());
                }
                if (splitedValue.length === 0) {
                    output.push('');
                }
            });

            const outValue = output.join('');

            updateCursor(unmask(outValue));

            return outValue;
        },
        [hasPrefix, maskOptions, maxOutputLength, updateCursor]
    );

    return { handleMaskedChange, cursor, setKey };
};

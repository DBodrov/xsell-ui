import { IMaskOptions } from './types';

export const isDigit = (value: string) => {
    const val = typeof value !== 'string' ? String(value) : value;
    const onlyDigits = new RegExp('^[0-9]+$');
    return onlyDigits.test(val);
};

export const isEmptyString = (value: string) => !value || value.trim().length === 0;

const specSymbols = ['(', ')', ' ', '-'];
export const patterns = {
    '9': /[0-9]/,
};

export const isSpecSymbol = (char: string) => specSymbols.includes(char);

export const isPrefix = (maskConst: string, char: string, charPosition: number) => {
    const position = maskConst.length - 1;
    return maskConst.includes(char) && charPosition < position;
};

export const isMaskSymbol = (char: string) => patterns[9].test(char);

export const isAllowedChar = (maskOptions: IMaskOptions, char: string, insertedPosition: number) => {
    if (Boolean(char) && !isPrefix(maskOptions.prefix, char, insertedPosition)) {
        const charCfgIsExist = Boolean(maskOptions.charsConfig[insertedPosition]);
        const isAllowed =
            charCfgIsExist &&
            isMaskSymbol(char) &&
            maskOptions.charsConfig[insertedPosition].type === 'digit';

        return isAllowed;
    }
};

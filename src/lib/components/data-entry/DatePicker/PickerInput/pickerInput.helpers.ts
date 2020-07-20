export const isDigit = (value: string) => {
    const val = typeof value !== 'string' ? String(value) : value;
    const onlyDigits = new RegExp('^[0-9]+$');
    return onlyDigits.test(val);
};

export const zeroPad = (value: number | string, length: number): string => `${value}`.padStart(length, '0');

export const isEmptyString = (value: string): boolean =>
    !value || value.trim().length === 0 || value === '0' || value === '00';

import { RangeType, IRangeProps } from './types';

export const isEmptyString = (value: string): boolean => {
    if (value === null || value === undefined) return true;
    if (value.trim().length === 0) return true;
    return false;
};

export const minMaxGuard = (min: number, max: number, value: number) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
};

export const toDecimalString = (val: string) => {
    if (isEmptyString(val)) return '';
    return Number(clearFormat(val)).toLocaleString('ru');
};

export const roundToStep = (value: number, step: number) => {
    const roundedValue = Math.ceil(value / step) * step;
    return roundedValue;
};

export const getCurrencySymbol = (currency: IRangeProps['currency']) => {
    switch (currency) {
        default:
        case 'RUB':
            return '₽';
        case 'EUR':
            return '€';
        case 'USD':
            return '$';
    }
};

const fromLocalCurrency = (value: string) => {
    const localeNumber = fromLocaleNumber(value).replace(',', '.');
    return localeNumber;
};

const fromLocaleNumber = (value: string) => value.replace(/\s+/g, '');

export const fromLocaleString = (localValue: string, format: RangeType) => {
    if (localValue === '0') return '0';
    switch (format) {
        case 'numeric':
        default:
            return fromLocaleNumber(localValue);
        case 'currency':
            return fromLocalCurrency(localValue);
    }
};

export const clearFormat = (val: string) => {
    if (isEmptyString(val)) return '';
    const withoutLocale = fromLocaleNumber(val);
    const decimalView = Number(withoutLocale).toLocaleString('ru', { useGrouping: false });
    return decimalView;
};

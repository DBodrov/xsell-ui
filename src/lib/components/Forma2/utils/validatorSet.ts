import { isNullOrUndefined } from 'utils/numeric.utils';
import { IRuleParams } from '../typings/validator.types';
import { FoundedValue } from '../../data-entry/BicSearch/types';

const isRequired = (value: StringOrNumber): boolean => Boolean(value) && String(value).trim().length > 0;
const isEmail = (value: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    if (value && value.trim().length > 0) {
        return re.test(value);
    }
    return true;
};

const isEqual = (value: string | number | boolean, { options }: IRuleParams): boolean => value === options;

const length = (value: StringOrNumber, { options }: IRuleParams): boolean => {
    const val = String(value);
    if (options && typeof options === 'number' && val.length !== options) return false; // strict
    if (options.min && val.length < options.min) return false; //
    if (options.max && val.length > options.max) return false;
    return true;
};

const min = (value: number, params: IRuleParams): boolean => {
    if (isNullOrUndefined(value) || value < params.options) return false;
    return true;
};

const max = (value: number, { options }: IRuleParams): boolean => {
    if (value > options) return false;
    return true;
};

const isDate = (value: string) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    const monthIsValid = month > 0 && month <= 12;
    const yearFormatIsValid = String(year).length === 4;

    return Boolean(Number(date)) && date.getDate() === day && monthIsValid && yearFormatIsValid;
};

const fromDateString = (value: string) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date;
};

const minDate = (value: string, { options }: IRuleParams) => {
    const minDate = fromDateString(options);
    const currentDate = fromDateString(value);

    return currentDate >= minDate;
};

const maxDate = (value: string, { options }: IRuleParams) => {
    const maxDate = fromDateString(options);
    const currentDate = fromDateString(value);
    return currentDate <= maxDate;
};

const unmask = (value: string) => {
    if (!value || value.trim().length === 0) return '';
    const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
    return output;
};

const isMobilePhone = (value: string, { options }: IRuleParams) => {
    const { mask, countryCode } = options;
    const maxOutputLength = unmask(`${countryCode}${mask}`).length;
    const unmaskedValueLength = unmask(value).length;
    return maxOutputLength === unmaskedValueLength;
};

const customCheck = (value: unknown, { options }: IRuleParams) => {
    if (typeof options === 'function') {
        return options(value);
    }
    return true;
};

const isCorrectBIC = (value: FoundedValue) => value.bic.length === 9 && value.isFound;

// const externalValidation = () =>

export const validatorSet = {
    length,
    min,
    max,
    isDate,
    minDate,
    maxDate,
    isEmail,
    isRequired,
    isMobilePhone,
    isEqual,
    customCheck,
    isCorrectBIC,
};

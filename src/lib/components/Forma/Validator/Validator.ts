import { fromDateString } from '../utils';
import { TValidationRules, IRulesValue } from './types';

export const Validator = (value: StringOrNumber, rule: keyof TValidationRules, ruleOption: IRulesValue) => {
    switch (rule) {
        case 'isRequired': {
            const result = isRequired(value);
            return result;
        }
        case 'isEmail':
            return isEmail(value as string);

        case 'length':
            return length(value, ruleOption);
        case 'min':
            return min(Number(value), ruleOption);
        case 'max':
            return max(Number(value), ruleOption);
        case 'isDate':
            return isDate(value as string, ruleOption);
        case 'minDate':
            return minDate(value as string, ruleOption);
        case 'maxDate':
            return maxDate(value as string, ruleOption);
        default:
            return false;
    }
};

// rulers
const isRequired = (value: StringOrNumber): boolean => Boolean(value) && String(value).trim().length > 0;
const isEmail = (value: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    if (value && value.trim().length > 0) {
        return re.test(value);
    }
    return true;
};

const length = (value: StringOrNumber, option: IRulesValue): boolean => {
    const val = String(value);

    if (option.param && val.length !== option.param) return false;
    if (option.min && val.length < option.min) return false;
    if (option.max && val.length > option.max) return false;
    return true;
};

const min = (value: number, option: IRulesValue): boolean => {
    if (value < option.param) return false;
    return true;
};

const max = (value: number, option: IRulesValue): boolean => {
    if (value > option.param) return false;
    return true;
};

const isDate = (value: string, option: IRulesValue) => {
    const { param: { dateSeparator = '.' } = {} } = option;
    const [day, month, year] = value.split(dateSeparator).map(Number);
    const date = new Date(year, month - 1, day);
    const monthIsValid = month > 0 && month <= 12;

    return Boolean(Number(date)) && date.getDate() === day && monthIsValid;
};

const minDate = (value: string, option: IRulesValue) => {
    const minDateValue = fromDateString(option.param);
    const currentDate = fromDateString(value);
    return currentDate >= minDateValue;
};

const maxDate = (value: string, option: IRulesValue) => {
    const maxDateValue = fromDateString(option.param);
    const currentDate = fromDateString(value);
    return currentDate <= maxDateValue;
};

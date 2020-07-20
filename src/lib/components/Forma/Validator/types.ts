export type TRulesName =
    | 'isRequired'
    | 'isEmail'
    | 'length'
    | 'max'
    | 'min'
    | 'isDate'
    | 'minDate'
    | 'maxDate';

export interface IRulesValue {
    error: string;
    param?: any;
    min?: number;
    max?: number;
}
export interface IValidationError {
    [rule: string]: string;
}
export interface IValidationErrors {
    [field: string]: IValidationError;
}
export type TValidationRules = { [key in TRulesName]: IRulesValue };
export interface IValidationSchema {
    [field: string]: Partial<TValidationRules>;
}

export type ValidationSchema<K extends string = any> = {
    [P in K]: Partial<TValidationRules>;
};

export type Rulers = (value: StringOrNumber, params?: IRulesValue['param']) => boolean;

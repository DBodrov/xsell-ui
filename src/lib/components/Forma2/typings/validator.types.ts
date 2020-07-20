export type TRulesName =
    | 'isRequired'
    | 'isEmail'
    | 'isEqual'
    | 'isCorrectBIC'
    | 'length'
    | 'max'
    | 'min'
    | 'isDate'
    | 'isMobilePhone'
    | 'minDate'
    | 'maxDate'
    | 'customCheck';

export interface IRuleParams {
    error: string;
    options?: any;
}
export interface IValidationError {
    [rule: string]: string;
}
export interface IValidationErrors {
    [field: string]: IValidationError;
}
export type FieldValidationSchema = { [key in TRulesName]: IRuleParams };

export interface IValidationSchema {
    [field: string]: Partial<FieldValidationSchema>;
}

// export type Rulers = (value: StringOrNumber, options?: IRuleParams['options']) => boolean;

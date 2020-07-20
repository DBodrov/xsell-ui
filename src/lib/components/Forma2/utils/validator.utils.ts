import { IValidationSchema, FieldValidationSchema, IRuleParams } from '../typings';
import { validatorSet } from './validatorSet';

export const getFieldsWithValidation = (schema: IValidationSchema) => {
    if (!schema) return [];
    const fields = Object.keys(schema);
    return fields;
};

export const getFieldSchema = (fieldName: string, schema: IValidationSchema) => {
    const fieldSchema = schema[fieldName];
    return fieldSchema;
};

const runValidate = (value: any, ruleSet: [string, IRuleParams]) => {
    const ruleFn = validatorSet[ruleSet[0]];
    const validatingParams = ruleSet[1];
    const result = ruleFn(value, validatingParams);
    if (result) {
        return [];
    }
    return [ruleSet[0], validatingParams.error];
};

export const validateSingleField = (value: any, fieldSchema: Partial<FieldValidationSchema>) => {
    const validationResult = Object.entries(fieldSchema)
        .map((params) => runValidate(value, params))
        .filter((result) => result.length !== 0);
    return validationResult;
};

export const combineErrors = (
    errorsState: React.MutableRefObject<{}>,
    validationResult: string[][],
    fieldName: string
) => {
    if (validationResult.length > 0) {
        const [, message] = validationResult[0];
        errorsState.current[fieldName] = message;
    } else if (validationResult.length === 0 || !validationResult) {
        if (errorsState.current.hasOwnProperty(fieldName)) {
            delete errorsState.current[fieldName];
        }
    }
    return errorsState;
};

import { useState, useEffect, useReducer } from 'react';
import { Validator, IValidationSchema, IValidationErrors, TValidationRules } from './Validator';

interface IValidationAction {
    type: 'ADD_ERROR' | 'REMOVE_ERROR' | 'RESET_ERRORS';
    field?: string;
    rule?: string;
    message?: string;
}

const initErrorsState: IValidationErrors = {};

// eslint-disable-next-line consistent-return
const errorsReducer = (state = initErrorsState, action: IValidationAction) => {
    if (action.type === 'ADD_ERROR') {
        return {
            ...state,
            [action.field]: {
                ...state[action.field],
                [action.rule]: action.message,
            },
        };
    }
    if (action.type === 'REMOVE_ERROR') {
        const errorsState = { ...state };
        delete errorsState[action.field][action.rule];
        if (Object.keys(errorsState[action.field]).length === 0) {
            delete errorsState[action.field];
        }
        return errorsState;
    }
    if (action.type === 'RESET_ERRORS') {
        return state;
    }
};

export function useValidator(schema: IValidationSchema) {
    const [verifiableFields, setVerifiableFields] = useState([]);
    const [errorsState, dispatch] = useReducer(errorsReducer, initErrorsState);

    useEffect(() => {
        const emptySchema = Object.keys(schema).length === 0;
        const fields = emptySchema ? [] : Object.keys(schema);
        setVerifiableFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fieldHasError = (field: string) =>
        Boolean(errorsState[field] && Object.keys(errorsState[field]).length);
    const fieldHasRuleError = (field: string, rule: string) =>
        fieldHasError(field) && errorsState[field].hasOwnProperty(rule);

    const fieldValidate = (fieldName: string, values: object) => {
        const value = values[fieldName];
        const rules = schema[fieldName];
        let validationResult: boolean;

        Object.keys(rules).forEach(rule => {
            const ruleOptions = rules[rule as keyof TValidationRules];
            const result: boolean = Validator(value, rule as keyof TValidationRules, ruleOptions);
            validationResult = result;
            if (!result) {
                const errorMessage = rules[rule as keyof TValidationRules].error;
                dispatch({ type: 'ADD_ERROR', field: fieldName, rule, message: errorMessage });
            } else if (fieldHasRuleError(fieldName, rule)) {
                dispatch({ type: 'REMOVE_ERROR', field: fieldName, rule });
            }
        });
        return validationResult;
    };

    const hasErrors = Object.keys(errorsState).length > 0;

    const resetErrors = (): void => {
        dispatch({ type: 'RESET_ERRORS' });
    };

    const validateAllFields = (values: object) => {
        if (verifiableFields.length > 0) {
            verifiableFields.forEach(field => {
                const result = fieldValidate(field, values);
                return result;
            });

            return true;
        }
        return false;
    };

    return {
        fieldValidate,
        validateAllFields,
        hasErrors,
        errorsState,
        resetErrors,
        verifiableFields,
    };
}

import React, { useReducer, useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import { IFormaContext, IFormaState, IFormaActions, IFormaProviderProps } from '../typings';
import {
    combineErrors,
    getFieldSchema,
    validateSingleField,
    getFieldsWithValidation,
} from '../utils/validator.utils';
import { formaReducer } from './forma.reducer';

export const FormaContext = React.createContext<IFormaContext>(null);
export const useForma = () => useContext(FormaContext);

const getInitState = ({ noValidate = false, initialValues }): IFormaState => ({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmiting: false,
    isValidating: false,
    isValid: noValidate,
});

export function FormaProvider(props: IFormaProviderProps) {
    const {
        children,
        initialValues = {},
        onReset,
        onSubmit,
        noValidate,
        validationSchema,
        validateOnBlur,
    } = props;
    const errorState = useRef({});
    const fieldsWithValidation = useMemo(() => getFieldsWithValidation(validationSchema), [validationSchema]);

    const initFormaState = useMemo(() => getInitState({ noValidate, initialValues }), [
        initialValues,
        noValidate,
    ]);

    const [formaState, dispatch] = useReducer<React.Reducer<IFormaState, IFormaActions>>(
        formaReducer,
        initFormaState
    );

    const initForm = useCallback(() => {
        errorState.current = {};
        dispatch({
            type: 'INIT_FORM',
            payload: initFormaState,
        });
    }, [initFormaState]);

    const handleChange = (fieldName: string, value: any) => {
        // console.log('prov change', fieldName, value);
        dispatch({
            type: 'CHANGE_VALUE',
            fieldName,
            payload: value,
        });
        // validateOnChange && runFieldLevelValidation(fieldName);
    };

    const handleTouch = (fieldName: string) => {
        dispatch({
            type: 'SET_ISTOUCHED',
            payload: { [fieldName]: true },
        });
        validateOnBlur && runFieldLevelValidation(fieldName);
    };

    const handleClearField = (fieldName: string) => {
        dispatch({
            type: 'CLEAR_FIELD',
            fieldName,
        });
    };

    const handleResetForm = () => {
        initForm();
        onReset && onReset(initialValues);
    };

    const handleSubmitForm = () => {
        if (noValidate) {
            onSubmit(formaState.values);
        } else {
            dispatch({ type: 'SET_ISSUBMITING' });
        }
    };

    const context: IFormaContext = {
        ...formaState,
        ...props,
        handleChange,
        handleTouch,
        handleClearField,
        handleResetForm,
        handleSubmitForm,
        dispatch,
    };

    const formaContext = useMemo(() => ({ ...context }), [context]);

    const runSingleFieldValidation = useCallback(
        (fieldName: string, value: any) => {
            if (fieldsWithValidation.includes(fieldName)) {
                const fieldSchema = getFieldSchema(fieldName, validationSchema);
                const fieldValidationResults = validateSingleField(value, fieldSchema);
                combineErrors(errorState, fieldValidationResults, fieldName);
            }
        },
        [fieldsWithValidation, validationSchema]
    );

    const runAllFieldsValidation = useCallback(() => {
        Object.keys(formaState.values).forEach(field => {
            dispatch({ type: 'SET_ISTOUCHED', payload: { [field]: true } });
            runSingleFieldValidation(field, formaState.values[field]);
        });
    }, [formaState.values, runSingleFieldValidation]);

    const runFieldLevelValidation = useCallback(
        (fieldName: string) => {
            runSingleFieldValidation(fieldName, formaState.values[fieldName]);
            dispatch({
                type: 'ADD_ERROR',
                payload: errorState.current,
            });
        },
        [formaState.values, runSingleFieldValidation]
    );

    useEffect(() => {
        initForm();
    }, [initForm]);

    useEffect(() => {
        if (formaState.isValidating) {
            runAllFieldsValidation();
            dispatch({
                type: 'ADD_ERROR',
                payload: errorState.current,
            });
            dispatch({
                type: 'SET_ISVALIDATING',
                payload: false,
            });
        }
        if (formaState.isSubmiting && !formaState.isValidating && formaState.isValid) {
            // console.log('submit fire');
            onSubmit && onSubmit(formaState.values);
            dispatch({ type: 'SET_ISSUBMITED' });
        }
    }, [
        formaState.isSubmiting,
        formaState.isValid,
        formaState.isValidating,
        formaState.touched,
        formaState.values,
        onSubmit,
        runAllFieldsValidation,
    ]);

    useEffect(() => {
        let isValid = false;
        const requiredFields = getFieldsWithValidation(validationSchema);
        const touchedFields = Object.keys(formaState.touched);
        if (requiredFields.every(field => touchedFields.includes(field))) {
            if (Object.keys(formaState.errors).length === 0) {
                isValid = true;
            }
        }
        dispatch({ type: 'SET_ISVALID', payload: isValid });
    }, [formaState.errors, formaState.touched, validationSchema]);

    return <FormaContext.Provider value={formaContext}>{children}</FormaContext.Provider>;
}

import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { Values, Touched, IFormCtx, IFormaProps } from './types';
import { useValidator } from './validator.hook';

export const FormaContext = React.createContext<IFormCtx>(null);
export const useForma = () => useContext(FormaContext);

export function Forma(props: IFormaProps) {
    const {
        initialValues,
        children,
        onReset,
        onSubmit,
        validationSchema,
        noValidate,
        validateOnBlur,
        validateOnChange,
    } = props;

    const [values, setValues] = useState<Values>(initialValues);
    const [touched, setTouched] = useState<Touched>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const noValidation =
        noValidate || Boolean(!validationSchema || Object.keys(validationSchema).length === 0);
    const schema = noValidation ? {} : validationSchema;

    const { fieldValidate, validateAllFields, hasErrors, errorsState, resetErrors } = useValidator(schema);

    const resetState = useCallback((): void => {
        setValues(initialValues);
        setTouched({});
        resetErrors();
        setIsSubmitting(false);
    }, [initialValues, resetErrors]);

    const handleValidate = useCallback(
        (fieldName?: string): void => {
            if (validationSchema[fieldName]) {
                fieldValidate(fieldName, values);
            }
        },
        [fieldValidate, validationSchema, values]
    );

    const handleFormSubmission = useCallback(() => {
        onSubmit(values);
        setTouched({});
        setIsSubmitting(false);
    }, [onSubmit, values]);

    useEffect(() => {
        if (isSubmitting) {
            if (!noValidation) {
                const noErrors = validateAllFields(values);
                if (noErrors) {
                    handleFormSubmission();
                }
            } else {
                handleFormSubmission();
            }
        }
        // TODO: Refactor it!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting]);

    const handleChange = useCallback(
        (name: string, value: string | number): void => {
            setValues(prevValues => ({ ...prevValues, ...{ [name]: value } }));

            if (!noValidation && validateOnChange) {
                fieldValidate(name, { [name]: value });
            }
            setIsSubmitting(false);
        },
        [fieldValidate, noValidation, validateOnChange]
    );

    const handleReset = useCallback((): void => {
        resetState();
        onReset && onReset(values);
    }, [onReset, resetState, values]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setIsSubmitting(true);
    };

    const handleTouch = useCallback(
        (name: string) => {
            if (!noValidation && validateOnBlur) {
                handleValidate(name);
            }
            setTouched(prevTouched => ({ ...prevTouched, ...{ [name]: true } }));
        },
        [handleValidate, noValidation, validateOnBlur]
    );

    const handleClearField = useCallback(
        (fieldName: string) => {
            const copyTouched = { ...touched };
            delete copyTouched[fieldName];
            setTouched(copyTouched);
            setValues(prevVals => ({ ...prevVals, [fieldName]: undefined }));
        },
        [touched]
    );

    const formCtx: IFormCtx = useMemo(
        () => ({
            values,
            touched,
            errors: errorsState,
            isSubmitting,
            handleChange,
            handleReset,
            handleSubmit,
            handleTouch,
            handleClearField,
            isValid: !hasErrors,
            noValidate,
        }),
        [
            errorsState,
            handleChange,
            handleClearField,
            handleReset,
            handleTouch,
            hasErrors,
            isSubmitting,
            noValidate,
            touched,
            values,
        ]
    );

    return <FormaContext.Provider value={formCtx}>{children}</FormaContext.Provider>;
}

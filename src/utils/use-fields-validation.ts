import React from 'react';

type TFieldValue = any;
type TFormData = Record<string, TFieldValue>;
type TValidationSchema<T = any> = T extends object ? T : Record<string, {rule: string; options: any}>;

interface IFieldsValidationArgs<T> {
  validationSchema: T extends object ? T : any;
  formData: TFormData;
}

function initStates(validationSchema: TValidationSchema) {
  const fields = Object.keys(validationSchema);
  const touchedState = {};
  const errorState = {};
  fields.forEach(f => {
    touchedState[f] = false;
    errorState[f] = '';
  });
  return {
    initTouchedState: touchedState,
    initErrorState: errorState,
  };
}

export function useFieldsValidation<T = any>({validationSchema, formData}: IFieldsValidationArgs<T>) {
  const {initErrorState, initTouchedState} = initStates(validationSchema);
  const [touchedState, setTouched] = React.useState(initTouchedState);
  const [errorState, setError] = React.useState(initErrorState);

  const validateRequiredField = React.useCallback(
    (value: string, e: React.FocusEvent<HTMLInputElement>): boolean => {
      const field = e.currentTarget.name;
      setTouched(t => ({...t, [field]: true}));
      const val = formData[field];
      const schema = validationSchema[field];
      if (!val) {
        setError(e => ({...e, [field]: schema.isRequired.error}));
        return false;
      } else {
        setError(e => ({...e, [field]: ''}));
        return true;
      }
    },
    [formData, validationSchema],
  );

  const validateMinValue = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const field = e.currentTarget.name;
    setTouched(t => ({...t, [field]: true}));
    const val = Number(formData[field]);
    const schema = validationSchema[field];
    const isValid = val >= schema.min.options;
    setError(e => ({...e, [field]: isValid ? '' : schema.min.error}));
    return isValid;
  }, [formData, validationSchema]);

  const validateMaxValue = React.useCallback((value: number, e?: React.FocusEvent<HTMLInputElement>) => {
    const field = e.currentTarget.name;
    const val = Number(formData[field]);
    const schema = validationSchema[field];
    const isValid = val <= schema.max.options;
    setError(e => ({...e, [field]: isValid ? '' : schema.max.error}));
    return isValid;
  }, [formData, validationSchema]);

  return {
    touchedState, errorState, validateRequiredField, validateMinValue, validateMaxValue
  }
}

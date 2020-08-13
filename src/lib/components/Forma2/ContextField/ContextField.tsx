import React, {useCallback, useMemo, Fragment} from 'react';
import {useForma} from '../Provider';
import {IContextFieldProps, IFieldContext} from '../typings';

export function ContextField({children, name}: IContextFieldProps) {
  const {handleChange, handleClearField, handleTouch, values, errors, touched} = useForma();

  const handleChangeField = useCallback(
    (fieldValue: any) => {
      console.log(fieldValue);
      handleChange(name, fieldValue);
    },
    [handleChange, name],
  );

  const handleBlur = useCallback(() => {
    handleTouch(name);
  }, [handleTouch, name]);

  const handleClear = useCallback(
    (fieldName: string) => {
      handleClearField(fieldName);
    },
    [handleClearField],
  );

  const getErrorMessage = useCallback(() => {
    const error = errors[name];
    return error;
  }, [errors, name]);

  const hasError = useCallback(() => errors[name] !== undefined && errors[name] !== null, [errors, name]);

  const fieldContext = useMemo<IFieldContext>(
    () => ({
      key: name,
      name,
      hasError: hasError(),
      hasTouched: Boolean(touched[name]),
      value: values[name],
      handleChangeField,
      handleBlur,
      handleClear,
      touched,
      errorMessage: getErrorMessage(),
    }),
    [getErrorMessage, handleBlur, handleChangeField, handleClear, hasError, name, touched, values],
  );

  return <Fragment>{children(fieldContext)}</Fragment>;
}

import React, { useRef, useState, useEffect, useCallback, Fragment } from 'react';
import cN from 'classnames/bind';
import { BasicInput, Range } from 'lib/components/data-entry';
import { useForma } from '../Forma';
import { ErrorText } from '../ErrorText';
import { Label } from '../Label';
import { FieldValue, FieldTypes, SimpleFieldProps } from '../types';
import css from './SimpleField.module.scss';

const cx = cN.bind(css);

export function SimpleField(props: SimpleFieldProps<any>) {
    const { name, type = 'text', hasClear, styles, inline, label, ...restProps } = props;

    const { handleChange, handleTouch, handleClearField, values, errors, noValidate } = useForma();

    const fieldRef = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);

    const handleChangeField = useCallback(
        (fieldValue: FieldValue) => {
            // console.log(fieldValue, typeof fieldValue);
            handleChange(name, fieldValue);
        },
        [handleChange, name]
    );

    const handleBlur = useCallback(() => {
        handleTouch(name);
    }, [handleTouch, name]);

    const handleClear = useCallback(
        (fieldName: string) => {
            if (hasClear) {
                handleClearField(fieldName);
            }
        },
        [handleClearField, hasClear]
    );

    const getErrorMessage = () => {
        const error = errors[name];
        return Object.values(error)[0];
    };

    useEffect(() => {
        if (errors[name]) {
            setHasError(true);
        } else if (hasError) {
            setHasError(false);
        }
    }, [errors, hasError, name]);

    const cssClasses = cx(css.SimpleField, { [css.Inline]: inline }, { [css.NoValidate]: noValidate });

    const renderFormControl = () => {
        switch (type as FieldTypes) {
            default:
            case 'text': {
                return (
                    <BasicInput
                        key={name}
                        type={type}
                        name={name}
                        hasError={hasError}
                        hasClear={hasClear}
                        styles={styles}
                        value={values[name]}
                        onChangeHandler={handleChangeField}
                        onBlurHandler={handleBlur}
                        onClearHandler={handleClear}
                        {...restProps}
                    />
                );
            }
            case 'range': {
                return (
                    <Range
                        key={name}
                        name={name}
                        onChangeHandler={handleChangeField}
                        onBlurHandler={handleBlur}
                        value={values[name]}
                        hasError={hasError}
                        {...restProps}
                    />
                );
            }
        }
    };

    const renderField = () => {
        if (type !== 'checkbox') {
            return (
                <Fragment>
                    <Label text={label} htmlFor={name} />
                    {renderFormControl()}
                </Fragment>
            );
        }
        return renderFormControl();
    };

    return (
        <div className={cssClasses} ref={fieldRef}>
            <div className={css.FormControl}>
                {renderField()}
                {errors[name] && <ErrorText errorMessage={getErrorMessage()} />}
            </div>
        </div>
    );
}

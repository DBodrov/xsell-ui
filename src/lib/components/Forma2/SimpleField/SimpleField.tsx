import React, { useRef, useCallback, Fragment, useMemo } from 'react';
import cN from 'classnames/bind';
import { BasicInput, Range, Select, DatePicker, InputNumber, BasicTextarea } from 'lib/components/data-entry';
import { Checkbox, ICheckboxProps } from 'lib/components/Checkbox';
import { PhoneInput, IPhoneInputProps } from 'lib/components/PhoneInput';
import { MaskInput, IMaskInputProps } from 'lib/components/MaskInput';
import {
    ISelectProps,
    IBasicInputProps,
    IRangeProps,
    IDatePickerProps,
    IBasicTextareaProps,
} from 'lib/components/data-entry/types';

import { useForma } from '../Provider';
import { ErrorText } from '../ErrorText';
import { Label } from '../Label';
import { FieldBaseAttributes, FieldTypes } from '../typings/field.types';
import css from './SimpleField.module.scss';

const cx = cN.bind(css);

export function SimpleField(props: FieldBaseAttributes) {
    const {
        name,
        type = 'text',
        styles,
        hasClear = false,
        inline = false,
        label,
        description,
        ...restProps
    } = props;

    const { handleChange, handleClearField, handleTouch, values, errors, noValidate, touched } = useForma();

    const fieldRef = useRef<HTMLDivElement>(null);
    // const [hasError, setHasError] = useState(false);

    const handleChangeField = useCallback(
        (fieldValue: any) => {
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
        return error;
    };

    const cssField = cx(css.SimpleField, { [css.NoValidate]: noValidate });
    const cssFormControl = cx(css.FormControl, { [css.Inline]: inline });

    const hasError = useCallback(() => errors[name] !== undefined && errors[name] !== null, [errors, name]);

    const basePropsPack = useMemo(
        () => ({
            key: name,
            type,
            name,
            hasError: hasError(),
            hasClear,
            styles,
            value: values[name],
            'aria-label': label,
            onChangeHandler: handleChangeField,
            onBlurHandler: handleBlur,
            onClearHandler: handleClear,
        }),
        [handleBlur, handleChangeField, handleClear, hasClear, hasError, label, name, styles, type, values]
    );

    const renderFormControl = () => {
        switch (type as FieldTypes) {
            default:
            case 'text': {
                return <BasicInput {...basePropsPack} {...(restProps as IBasicInputProps)} />;
            }
            case 'textarea': {
                return <BasicTextarea {...basePropsPack} {...(restProps as IBasicTextareaProps)} />;
            }
            case 'number': {
                return <InputNumber {...basePropsPack} {...(restProps as unknown)} />;
            }
            case 'range': {
                return <Range {...basePropsPack} {...(restProps as IRangeProps)} />;
            }
            case 'date': {
                return <DatePicker {...basePropsPack} {...(restProps as IDatePickerProps)} />;
            }
            case 'select': {
                return <Select {...basePropsPack} {...(restProps as ISelectProps)} />;
            }
            case 'tel': {
                return <PhoneInput {...basePropsPack} {...(restProps as IPhoneInputProps)} />;
            }
            case 'checkbox': {
                return (
                    <Checkbox
                        checked={basePropsPack.value}
                        {...basePropsPack}
                        onBlurHandler={undefined}
                        {...(restProps as ICheckboxProps)}
                    />
                );
            }
            case 'mask': {
                return <MaskInput {...basePropsPack} {...(restProps as IMaskInputProps)} />;
            }
        }
    };

    const renderField = () => {
        if (type !== 'checkbox') {
            return (
                <Fragment>
                    <Label text={label} htmlFor={name} inline={inline} />
                    {renderFormControl()}
                </Fragment>
            );
        }
        return renderFormControl();
    };

    return (
        <div className={cssField} ref={fieldRef}>
            <div className={cssFormControl}>
                {renderField()}
                {description && <span className={css.Description}>{description}</span>}
                {touched[name] && errors[name] && <ErrorText errorMessage={getErrorMessage()} />}
            </div>
        </div>
    );
}

import React, { useContext, useRef, useState, useEffect } from 'react';
import cN from 'classnames/bind';
import {
    BasicInput,
    Select,
    BasicTextarea,
    BasicCheckbox,
    PhoneInput,
    MaskInput,
    DatePicker,
} from 'lib/components/data-entry';
import { FormaContext } from '../Forma';
import { ErrorText } from '../ErrorText';
import { IFormCtx, IFieldProps, IFieldHandlers, FieldValue, FieldTypes, TRenderProps } from '../types';
import css from './Field.module.scss';

const getFieldComponent = (field: FieldTypes) => {
    switch (field) {
        case 'checkbox':
            return BasicCheckbox;
        case 'email':
        case 'text':
        case 'password':
        case 'number':
        default:
            return BasicInput;
        case 'select':
            return Select;
        case 'mask':
            return MaskInput;
        case 'phone':
            return PhoneInput;
        case 'textarea':
            return BasicTextarea;
        case 'date': {
            return DatePicker;
        }
    }
};

const cx = cN.bind(css);

export function Field(props: IFieldProps & IFieldHandlers & Pick<TRenderProps, 'handleChange'>) {
    const { type = 'text', name, label, inline, hasClear, component, handleChange, ...restProps } = props;
    const ctx = useContext<IFormCtx>(FormaContext);
    const fieldRef = useRef<HTMLDivElement>(null);
    const value = ctx.values[name];
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (ctx && ctx.errors[name]) {
            setHasError(true);
        } else if (hasError) {
            setHasError(false);
        }
    }, [ctx, hasError, name]);

    const FormField: any = component || getFieldComponent(type as FieldTypes);

    const errorMessage = () => {
        const error = ctx.errors[name];
        return Object.values(error)[0];
    };

    const handleChangeField = (fieldValue: FieldValue) => {
        ctx.handleChange(name, fieldValue);
        handleChange && handleChange(name, fieldValue);
    };

    const handleBlur = () => {
        ctx.handleTouch(name);
    };

    const handleClear = (fieldName: string) => {
        if (hasClear) {
            ctx.handleClearField(fieldName);
        }
    };

    const cssClasses = cx(css.Field, { [css.Inline]: inline }, { [css.NoValidate]: ctx.noValidate });

    return (
        <div className={cssClasses} ref={fieldRef}>
            {label && type !== 'checkbox' && (
                <label className={css.Label} htmlFor={name}>
                    {label}
                </label>
            )}
            <div className={css.FormControl}>
                <FormField
                    key={name}
                    type={type}
                    name={name}
                    value={value}
                    hasClear={hasClear}
                    onChangeHandler={handleChangeField}
                    onBlurHandler={handleBlur}
                    onClearHandler={handleClear}
                    hasError={hasError}
                    checkboxtext={type === 'checkbox' ? label : undefined}
                    checked={type === 'checkbox' ? value : undefined}
                    {...restProps}
                />
                {ctx.errors[name] && <ErrorText errorMessage={errorMessage()} />}
            </div>
        </div>
    );
}

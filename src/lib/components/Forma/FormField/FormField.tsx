import React, { useMemo, useCallback } from 'react';
import cN from 'classnames/bind';
import { useForma } from '../Forma';
import { FieldValue, IFormFieldContext } from '../types';
import css from './FormField.module.scss';

interface IFormFieldProps {
    children: (formFieldCtx: IFormFieldContext) => React.ReactNode;
    layout?: 'inline' | 'column';
    name: string;
}

const cx = cN.bind(css);

export function FormField(props: IFormFieldProps) {
    const { children, layout, name } = props;
    const ctx = useForma();

    const handleChangeField = useCallback(
        (fieldValue: FieldValue) => {
            ctx.handleChange(name, fieldValue);
        },
        [ctx, name]
    );

    const handleBlurField = useCallback(() => {
        ctx.handleTouch(name);
    }, [ctx, name]);

    const cssClasses = cx(css.FormField, { [css.Inline]: layout === 'inline' });
    const formFieldCtx: IFormFieldContext = useMemo(
        () => ({
            checked: (ctx.values[name] as boolean) || false,
            name,
            onChangeHandler: handleChangeField,
            onBlurHandler: handleBlurField,
        }),
        [ctx.values, handleBlurField, handleChangeField, name]
    );

    return <div className={cssClasses}>{children(formFieldCtx)}</div>;
}

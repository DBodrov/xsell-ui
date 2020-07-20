import React, { useContext } from 'react';
import cn from 'classnames/bind';
import { FormaContext } from '../Forma';
import { IFormProps, IFormCtx } from '../types';
import css from './Form.module.scss';

const cx = cn.bind(css);

export function Form(props: IFormProps) {
    const { direction, styles, children, ...formProps } = props;
    const ctx = useContext<IFormCtx>(FormaContext);

    const cssClasses: string = cx(
        css.Form,
        { [css.Horizontal]: direction === 'horizontal' },
        { [css.Vertical]: direction === 'vertical' }
    );

    // console.log(ctx.isSubmitting);
    return (
        <form
            key={ctx.isSubmitting ? 'submit' : 'unsubmit'}
            onReset={ctx.handleReset}
            onSubmit={ctx.handleSubmit}
            className={cssClasses}
            style={styles}
            {...formProps}>
            {children(ctx)}
        </form>
    );
}

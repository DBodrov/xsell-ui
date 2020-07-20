import React from 'react';
import cn from 'classnames/bind';
import { useForma } from '../Provider';
import { FormaFormProps } from '../typings';
import { isFunction } from '../utils/forma.utils';
import css from './Form.module.scss';

const cx = cn.bind(css);

export function Form(props: FormaFormProps) {
    const { direction = 'vertical', styles, children, className, ...formAttributes } = props;
    const formaContext = useForma();
    const { handleSubmitForm, handleResetForm } = formaContext;

    const cssClasses: string = cx(
        className,
        css.Form,
        { [css.Horizontal]: direction === 'horizontal' },
        { [css.Vertical]: direction === 'vertical' }
    );

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        handleSubmitForm && handleSubmitForm();
    };

    const handleReset: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        handleResetForm && handleResetForm();
    };

    return (
        <form
            // key={ctx.isSubmitting ? 'submit' : 'unsubmit'}
            onReset={handleReset}
            data-testid="form"
            onSubmit={handleSubmit}
            className={cssClasses}
            style={styles}
            {...formAttributes}>
            {isFunction(children) ? children(formaContext) : children}
        </form>
    );
}

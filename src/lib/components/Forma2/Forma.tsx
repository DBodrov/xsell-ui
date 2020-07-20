import React from 'react';
import { FormaProvider } from './Provider';
import { Form } from './Form';
import { IFormaProps } from './typings';

export function Forma(props: IFormaProps) {
    const { children, style, controlProps: { form: formProps = {} } = {}, ...restProps } = props;

    return (
        <FormaProvider {...restProps}>
            <Form {...formProps} style={style}>
                {children}
            </Form>
        </FormaProvider>
    );
}

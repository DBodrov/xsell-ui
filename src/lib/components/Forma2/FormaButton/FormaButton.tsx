import React from 'react';
import { BasicButton, BasicButtonProps } from 'lib/components/buttons/BasicButton';
import { useForma } from '../Provider';

type TFormaButtonProps = Omit<BasicButtonProps, 'disabled'> & {
    type?: 'submit' | 'reset';
    disabledMode?: 'alwaysEnabled' | 'validationOnly' | 'validationAndExternals';
    disablingParams?: any[][];
};

export function FormaButton(props: TFormaButtonProps) {
    const { type = 'submit', disabledMode = 'validationOnly', disablingParams, ...restProps } = props;
    const { isValid, values } = useForma();
    const disablingByValue = () => {
        const checkPair = (pair: any[]) => values[pair[0]] === pair[1];
        const result = disablingParams.every(checkPair);
        return !result;
    };
    const isDisabled = () => {
        if (type === 'reset') return false;
        if (disabledMode === 'alwaysEnabled') return false;
        if (disabledMode === 'validationOnly') return !isValid;
        if (disabledMode === 'validationAndExternals') {
            return !isValid || disablingByValue();
        }
        return !isValid;
    };

    return <BasicButton disabled={isDisabled()} type={type} {...restProps} />;
}

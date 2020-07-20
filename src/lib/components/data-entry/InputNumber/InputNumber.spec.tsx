import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputNumber } from './InputNumber';
import { IInputNumberProps } from './types';

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

const onChangeMock = jest.fn();

const setup = (props?: Partial<IInputNumberProps>) => {
    const utils = render(
        <InputNumber
            name="numberInput"
            onChangeHandler={onChangeMock}
            data-testid="number-input"
            locales="ru-RU"
            {...props}
        />
    );

    const input = utils.getByTestId('number-input') as HTMLInputElement;

    return {
        input,
        ...utils,
    };
};

describe('*** InputNumber ***', () => {
    test('render InputNumber with minimum props', () => {
        const { input } = setup();
        userEvent.click(input);
        fireEvent.change(input, { target: { value: '123' } });
        expect(onChangeMock).toBeCalledWith(123);
    });

    test('should display formatted value', async () => {
        const { input } = setup({ value: '1000' });
        const telInput = input as HTMLInputElement;
        expect(telInput.value.replace(/\s+/g, ' ')).toEqual('1 000');
    });

    test('should display empty value', () => {
        const { input } = setup({ value: undefined });
        expect(input.value).toEqual('');
    });

    test('should return decimal value', () => {
        const { input } = setup({ formatOptions: { maximumFractionDigits: 2 } });
        userEvent.click(input);
        fireEvent.change(input, { target: { value: '0.1' } });
        expect(onChangeMock).toBeCalledWith(0.1);
    });

    test('should round up value', () => {
        const { input } = setup({ formatOptions: { maximumFractionDigits: 2 } });
        userEvent.click(input);
        fireEvent.change(input, { target: { value: '0.119' } });
        expect(onChangeMock).toBeCalledWith(0.12);
    });
});

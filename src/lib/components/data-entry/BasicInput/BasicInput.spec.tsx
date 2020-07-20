import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BasicInput } from './BasicInput';

afterEach(cleanup);

const onChangeMock = jest.fn();

describe('****BasicInput****', () => {
    test('should render BasicInput', () => {
        const { getByTestId } = render(<BasicInput onChangeHandler={onChangeMock} name="textInput" />);
        getByTestId('basic-input');
    });

    test('Bugfix for setSelectionrange in email input. Should render BasicInput type email', () => {
        const { getByTestId } = render(
            <BasicInput
                type="email"
                onChangeHandler={onChangeMock}
                name="textInput"
                extendProps={{ control: { 'data-testid': 'native-input' } }}
            />
        );
        getByTestId('basic-input');
    });

    test('should called onChangeHandler', () => {
        const { getByTestId } = render(
            <BasicInput
                onChangeHandler={onChangeMock}
                name="textInput"
                type="text"
                extendProps={{ control: { 'data-testid': 'native-input' } }}
            />
        );
        const nativeInput = getByTestId('native-input') as HTMLInputElement;
        fireEvent.change(nativeInput, { target: { value: 'test 1' } });
        // expect(nativeInput.value).toBe('test 1');
        expect(onChangeMock).toBeCalledTimes(1);
    });
});

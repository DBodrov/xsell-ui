import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MaskInput } from './MaskInput';

afterEach(cleanup);

const onChangeMock = jest.fn();

describe('****MaskInput****', () => {
    test('should render MaskInput', () => {
        const { getByTestId } = render(<MaskInput onChangeHandler={onChangeMock} name="textInput" />);
        getByTestId('mask-input');
    });

    test('should render mask correct', () => {
        const { getByTestId } = render(
            <MaskInput
                onChangeHandler={onChangeMock}
                name="textInput"
                value="7710994411"
                mask="9999 999999"
            />
        );

        const nativeInput = getByTestId('native-input');
        expect(nativeInput.getAttribute('value')).toBe('7710 994411');
    });
});

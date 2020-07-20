import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BasicCheckbox } from './BasicCheckbox';

afterEach(cleanup);

const onChangeMock = jest.fn();

describe('****BasicCheckbox****', () => {
    test('should render BasicCheckbox', () => {
        const { getByTestId } = render(<BasicCheckbox onChangeHandler={onChangeMock} name="checkbox" />);
        getByTestId('basic-checkbox');
    });

    test('should render BasicCheckbox with label', () => {
        const { getByText } = render(
            <BasicCheckbox onChangeHandler={onChangeMock} name="checkbox">
                Checkbox label
            </BasicCheckbox>
        );
        getByText('Checkbox label');
    });

    test('should called onChangeHandler', () => {
        const { getByTestId } = render(<BasicCheckbox onChangeHandler={onChangeMock} name="checkbox" />);
        const checkbox = getByTestId('basic-checkbox');
        const nativeCheckbox = getByTestId('native-input') as HTMLInputElement;
        expect(nativeCheckbox.checked).toEqual(false);
        fireEvent.click(checkbox.firstElementChild);
        expect(onChangeMock).toHaveBeenCalled();
    });

    test('should have indeterminate className', () => {
        const { getByTestId } = render(
            <BasicCheckbox onChangeHandler={onChangeMock} name="checkbox" indeterminate />
        );
        const checkbox = getByTestId('basic-checkbox');
        expect(checkbox.classList.contains('isIndeterminate')).toBeTruthy();
    });
});

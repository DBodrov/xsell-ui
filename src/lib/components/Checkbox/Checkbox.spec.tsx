import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

afterEach(cleanup);

const onChangeMock = jest.fn();

describe('**** Checkbox ****', () => {
    test('should render Checkbox', () => {
        const { getByTestId } = render(<Checkbox onChangeHandler={onChangeMock} name="checkbox" />);
        getByTestId('checkbox');
    });

    test('should render Checkbox with label', () => {
        const { getByText } = render(
            <Checkbox onChangeHandler={onChangeMock} name="checkbox">
                Checkbox label
            </Checkbox>
        );
        getByText('Checkbox label');
    });

    test('should called onChangeHandler', () => {
        const { getByTestId } = render(<Checkbox onChangeHandler={onChangeMock} name="checkbox" />);
        const nativeCheckbox = getByTestId('native-input') as HTMLInputElement;
        expect(nativeCheckbox.checked).toEqual(false);
        fireEvent.click(nativeCheckbox);
        expect(onChangeMock).toBeCalled();
    });

    test('should have indeterminate className', () => {
        const { getByTestId } = render(
            <Checkbox onChangeHandler={onChangeMock} name="checkbox" indeterminate />
        );
        const checkbox = getByTestId('checkbox');
        expect(checkbox.classList.contains('isIndeterminate')).toBeTruthy();
    });
});

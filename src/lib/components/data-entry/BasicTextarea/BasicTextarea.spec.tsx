import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BasicTextarea } from './BasicTextarea';

afterEach(cleanup);

const onChangeMock = jest.fn();

describe('****BasicTextarea****', () => {
    test('should render BasicTextarea', () => {
        const { getByTestId } = render(<BasicTextarea onChangeHandler={onChangeMock} name="textarea" />);
        getByTestId('basic-textarea');
    });

    test('should called onChangeHandler', () => {
        const { getByTestId } = render(<BasicTextarea onChangeHandler={onChangeMock} name="textarea" />);
        const nativeInput = getByTestId('native-textarea');
        fireEvent.change(nativeInput, { target: { value: 'test 2' } });
        expect(onChangeMock).toHaveBeenCalledWith('test 2');
    });
});

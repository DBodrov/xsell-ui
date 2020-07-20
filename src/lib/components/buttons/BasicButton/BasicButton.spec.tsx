import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BasicButton } from './BasicButton';

afterEach(cleanup);

const onClickMock = jest.fn();

describe('****BasicButton****', () => {
    test('should render BasicButton', () => {
        const { getByTestId } = render(<BasicButton type="button" onClick={onClickMock} />);
        getByTestId('basic-button');
    });

    test('should called onClick handler', () => {
        const { getByTestId } = render(<BasicButton type="button" onClick={onClickMock} />);
        const button = getByTestId('basic-button');
        fireEvent.click(button, {});
        expect(onClickMock).toHaveBeenCalled();
    });

    test('should not called onClick when button is disabled', () => {
        // eslint-disable-next-line react/jsx-boolean-value
        const { getByTestId } = render(<BasicButton type="button" onClick={onClickMock} disabled />);
        const button = getByTestId('basic-button');
        expect(button).toHaveAttribute('disabled');
    });
});

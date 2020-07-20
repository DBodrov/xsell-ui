import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomerInfoForm } from './CustomerInfoForm';

afterEach(cleanup);

const mockCustomerCheckHandler = jest.fn();
const mockCustomerInfoData = {
    birthDate: '03.01.1990',
    consentAgree: true,
    phoneNumber: '+89781234568',
};

const setup = () => {
    const utils = render(<CustomerInfoForm onCustomerCheck={mockCustomerCheckHandler} />);

    return { ...utils };
};

describe('*** Customer Info Form ***', () => {
    test('should render form, input fields and submit form without any errors', () => {
        const { getByPlaceholderText, getByTestId, getByText } = setup();

        const phoneInput = getByPlaceholderText(/\+7/i);
        const birthdayInput = getByPlaceholderText(/ДД.ММ.ГГГГ/i);
        const checkBox = getByTestId('checkbox');
        const submitButton = getByText('Далее');

        fireEvent.change(phoneInput, { target: { value: '89781234568' } });
        fireEvent.change(birthdayInput, { target: { value: '03011990' } });
        fireEvent.click(checkBox);
        expect(submitButton).not.toBeDisabled();
        fireEvent.click(submitButton);
        expect(mockCustomerCheckHandler).toBeCalledTimes(1);
        expect(mockCustomerCheckHandler).toBeCalledWith(mockCustomerInfoData);
    });
});

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvents from '@testing-library/user-event';
import { AccountForm } from './AccountForm';

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

const accountValidationError = 'Номер счёта должен быть не менее 20 символов';
const bikValidationError = 'БИК должен быть не менее 9 символов';

const onSubmitFormMock = jest.fn();

const setup = () => {
    const utils = render(<AccountForm onUpdateAccount={onSubmitFormMock} />);
    const form = utils.container.getElementsByTagName('form')[0];
    const account = utils.getByPlaceholderText(/рублёвый счёт/i);
    const bic = utils.getByPlaceholderText(/бик банка/i);
    const submitButton = utils.getByText('Отправить заявку');

    return {
        form,
        account,
        bic,
        submitButton,
        ...utils,
    };
};

describe('*** Anketa / Account Form ***', () => {
    test('should render empty form', () => {
        const { form } = setup();
        expect(form).toBeInTheDocument();
    });

    test('validation form fields', () => {
        const { account, bic, form, getByText } = setup();
        userEvents.click(bic);
        userEvents.click(account);
        userEvents.click(bic);
        fireEvent.submit(form);
        expect(getByText(new RegExp(accountValidationError, 'i'))).toBeInTheDocument();
        expect(getByText(new RegExp(bikValidationError, 'i'))).toBeInTheDocument();
    });
});

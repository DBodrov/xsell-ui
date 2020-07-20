import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from './LoginForm';

afterEach(cleanup);

const onLoginMock = jest.fn();
const mockLoginData = {
    birthDate: '03.01.1990',
    consentAgree: true,
    distanceAgreement: true,
    phoneNumber: '+7(978) 123-45-68',
};

describe('**** LOGIN FORM ****', () => {
    test('LoginForm render without crashing', () => {
        // пустая форма
        const { getByText, container } = render(<LoginForm onLogin={onLoginMock} />);
        getByText('Введите телефон');
        const form = container.getElementsByTagName('form')[0];
        expect(form).toBeInTheDocument();
    });

    test('submit filled form', () => {
        const { getByLabelText, getByText } = render(<LoginForm onLogin={onLoginMock} />);
        const phoneNumber = getByLabelText(/Мобильный телефон/i);
        const birthDate = getByLabelText(/picker-input/i);
        const consentAgree = getByText(/в целях рассмотрения настоящего/i);
        const distanceAgree = getByText(/Я присоединяюсь к действующей редакции/i);
        const submitButton = getByText('Продолжить');

        expect(phoneNumber).toBeInTheDocument();
        expect(birthDate).toBeInTheDocument();

        fireEvent.change(phoneNumber, { target: { value: mockLoginData.phoneNumber } });
        fireEvent.change(birthDate, { target: { value: mockLoginData.birthDate } });
        fireEvent.click(consentAgree);
        fireEvent.click(distanceAgree);
        fireEvent.click(submitButton);
        expect(onLoginMock).toHaveBeenCalledTimes(1);
        expect(onLoginMock).toHaveBeenCalledWith(mockLoginData);
    });
});

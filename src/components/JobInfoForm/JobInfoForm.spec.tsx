import React from 'react';
// import { fireEvent, act } from '@testing-library/react';
import { fireEvent, act, render } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { TJobInfo } from 'context/Anketa';
import { JobInfoForm } from './JobInfoForm';

afterEach(() => {
    jest.resetAllMocks();
});

const onSubmitFormMock = jest.fn();
const handleAddressChangedMock = jest.fn();
const handleArchivingAnketaMock = jest.fn();
const mockData: TJobInfo = {
    workPlace: 'АО 123',
    lastWorkExperienceMonths: 89,
    mainMonthlyIncomeAmount: 20000,
    workIndustry: 'RGB_INDUSTRY_3$1',
    workInn: 1234567890,
    creditBureauConsentAgree: true,
};

const setup = () => {
    const utils = render(<JobInfoForm onConfirmArchiving={handleArchivingAnketaMock} />, {
        anketaContext: { verifySignature: onSubmitFormMock },
    });
    const form = utils.container.getElementsByTagName('form')[0];
    const workPlace = utils.getByLabelText('Место работы');
    const expirience = utils.getByLabelText('Стаж на последнем месте (месяцев)');
    const additionalIncome = utils.getByLabelText('Весь ежемесячный доход (руб)');
    const workIndustry = utils.getByLabelText('Отрасль занятости');
    const workInn = utils.getByLabelText('ИНН РАБОТОДАТЕЛЯ');
    const creditBureauConsentAgree = utils.getByTestId('checkbox');
    const submitBtn = utils.getByText('Все данные верны');
    const changeBtn = utils.getByText('изменить');

    return {
        form,
        workPlace,
        expirience,
        additionalIncome,
        creditBureauConsentAgree,
        workIndustry,
        workInn,
        submitBtn,
        changeBtn,
        ...utils,
    };
};

describe('*** JobInfo Form Test ***', () => {
    test('should render JobInfo form', () => {
        const { workPlace, expirience, additionalIncome, creditBureauConsentAgree, submitBtn } = setup();
        [workPlace, expirience, additionalIncome, creditBureauConsentAgree, submitBtn].forEach((field) =>
            expect(field).toBeInTheDocument()
        );
    });

    test('should submit filled form - happy path', () => {
        const {
            submitBtn,
            workPlace,
            expirience,
            additionalIncome,
            workIndustry,
            workInn,
            creditBureauConsentAgree,
            getByText,
        } = setup();

        userEvent.click(workPlace);
        fireEvent.change(workPlace, { target: { value: mockData.workPlace } });

        userEvent.click(expirience);
        fireEvent.change(expirience, { target: { value: mockData.lastWorkExperienceMonths } });

        userEvent.click(additionalIncome);
        fireEvent.change(additionalIncome, {
            target: { value: mockData.mainMonthlyIncomeAmount },
        });

        userEvent.click(workIndustry);
        const menuitem = getByText('Энергетика');
        act(() => userEvent.click(menuitem));

        userEvent.click(workInn);
        fireEvent.change(workInn, {
            target: { value: '1234567890' },
        });

        fireEvent.click(creditBureauConsentAgree);
        fireEvent.click(submitBtn);

        expect(onSubmitFormMock).toHaveBeenCalledTimes(1);
        expect(onSubmitFormMock).toHaveBeenCalledWith(mockData);
    });

    test('should accept passport change', () => {
        const { changeBtn } = setup();

        userEvent.click(changeBtn);
        expect(handleAddressChangedMock).toHaveBeenCalledTimes(1);
    });

    test('should display validation errors messages', () => {
        const { workPlace, expirience, additionalIncome, getByText } = setup();

        userEvent.click(workPlace);
        userEvent.click(expirience);
        expect(getByText('Место работы не может быть пустым')).toBeInTheDocument();

        fireEvent.change(expirience, { target: { value: 0 } });
        userEvent.click(additionalIncome);
        expect(getByText('Стаж должен быть больше 3 месяцев')).toBeInTheDocument();

        fireEvent.change(additionalIncome, { target: { value: 1 } });
        userEvent.click(workPlace);
        expect(getByText('Доход не может быть менее 1 000 рублей')).toBeInTheDocument();
    });

    test('display validation error on main income - max value', () => {
        const { workPlace, additionalIncome, getByText } = setup();
        userEvent.click(additionalIncome);
        fireEvent.change(additionalIncome, { target: { value: 2000000 } });
        userEvent.click(workPlace);

        expect(getByText('Доход не может быть более 1 000 000 рублей')).toBeInTheDocument();
    });
});

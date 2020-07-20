import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DatePicker } from './DatePicker';

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});
const mockChangeDate = jest.fn();
const initDate = '07.10.2019';
const placeholder = 'type birthday';

const setup = (value = initDate) => {
    const utils = render(
        <DatePicker
            name="birthday"
            onChangeHandler={mockChangeDate}
            value={value}
            placeholder={placeholder}
            view="days"
            locales="en"
        />
    );

    const picker = utils.getByTestId('date-picker');

    return {
        picker,
        ...utils,
    };
};

describe('*** DatePicker ***', () => {
    test('should DatePicker render, change date', () => {
        const { getByPlaceholderText } = setup();
        const input = getByPlaceholderText(placeholder) as HTMLInputElement;
        expect(input.value).toBe(initDate);
        fireEvent.change(input, { target: { value: '17121995' } });
        expect(mockChangeDate).toBeCalledWith('17.12.1995');
    });

    test('input incorrect date, return empty string', () => {
        const { getByPlaceholderText } = setup();
        const input = getByPlaceholderText(placeholder) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'lorem ipsum' } });
        expect(mockChangeDate).toBeCalledWith('');
    });

    test('should render Calendar, change day', async () => {
        const { getByLabelText, getByTestId } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);

        const calendar = await waitForElement(() => getByTestId('calendar'));
        expect(calendar).toBeInTheDocument();
        const days = calendar.getElementsByClassName('Day');
        const day5 = Array.from(days).find(day => day.textContent === '5');
        expect(day5).toBeInTheDocument();
        fireEvent.click(day5);
        expect(mockChangeDate).toBeCalledWith('05.10.2019');
    });

    test('select next year from calendar panel', async () => {
        const { getByLabelText, getByTestId } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);
        const calendar = await waitForElement(() => getByTestId('calendar'));
        const nextYearBtn = calendar
            .getElementsByClassName('CalendarPanel year')[0]
            .getElementsByClassName('Next')[0];
        fireEvent.click(nextYearBtn);
        const yearPanelValue = calendar
            .getElementsByClassName('CalendarPanel year')[0]
            .getElementsByClassName('PanelValue')[0];
        expect(yearPanelValue.textContent).toMatch(/2020/i);
    });

    test('select next month from calendar panel', async () => {
        const { getByLabelText, getByTestId } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);

        const calendar = await waitForElement(() => getByTestId('calendar'));
        const nextMonthBtn = calendar
            .getElementsByClassName('CalendarPanel month')[0]
            .getElementsByClassName('Next')[0];
        fireEvent.click(nextMonthBtn);
        const monthPanelValue = calendar
            .getElementsByClassName('CalendarPanel month')[0]
            .getElementsByClassName('PanelValue')[0];
        expect(monthPanelValue.textContent).toMatch(/november/i);
    });

    test('select previous year from calendar panel', async () => {
        const { getByLabelText, getByTestId } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);

        const calendar = await waitForElement(() => getByTestId('calendar'));
        const prevYearBtn = calendar
            .getElementsByClassName('CalendarPanel year')[0]
            .getElementsByClassName('Prev')[0];
        fireEvent.click(prevYearBtn);
        const yearPanelValue = calendar
            .getElementsByClassName('CalendarPanel year')[0]
            .getElementsByClassName('PanelValue')[0];
        expect(yearPanelValue.textContent).toMatch(/2018/i);
    });

    test('select prev month from calendar panel', async () => {
        const { getByLabelText, getByTestId } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);

        const calendar = await waitForElement(() => getByTestId('calendar'));
        const prevMonthBtn = calendar
            .getElementsByClassName('CalendarPanel month')[0]
            .getElementsByClassName('Prev')[0];
        fireEvent.click(prevMonthBtn);
        const monthPanelValue = calendar
            .getElementsByClassName('CalendarPanel month')[0]
            .getElementsByClassName('PanelValue')[0];
        expect(monthPanelValue.textContent).toMatch(/september/i);
    });

    test('open months calendar and select  month', async () => {
        const { getByLabelText, getByTestId, getByText } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);
        const calendar = await waitForElement(() => getByTestId('calendar'));
        const monthValue = getByText(/october/i);
        fireEvent.click(monthValue);
        const monthCalendar = await waitForElement(
            () => calendar.getElementsByClassName('MonthsCalendar')[0]
        );
        expect(monthCalendar).toBeInTheDocument();
        const november = getByText(/november/i);
        fireEvent.click(november);
        const monthPanelValue = calendar
            .getElementsByClassName('CalendarPanel month')[0]
            .getElementsByClassName('PanelValue')[0];
        expect(monthPanelValue.textContent).toMatch(/november/i);
    });

    test('open years calendar, change to previous decade and select year', async () => {
        const { getByLabelText, getByTestId, getByText } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);
        const calendar = await waitForElement(() => getByTestId('calendar'));
        const yearValue = getByText(/2019/i);
        fireEvent.click(yearValue);
        const yearsCalendar = await waitForElement(() => calendar.getElementsByClassName('YearsCalendar')[0]);
        const years = yearsCalendar.getElementsByClassName('Year');
        const firstYearOfDecade = Array.from(years).find(year => year.textContent === '2010');
        expect(yearsCalendar).toBeInTheDocument();
        expect(firstYearOfDecade).toBeInTheDocument();
        const prevDecadeBtn = calendar
            .getElementsByClassName('CalendarPanel decade')[0]
            .getElementsByClassName('Prev')[0];
        fireEvent.click(prevDecadeBtn);
        const prevYears = yearsCalendar.getElementsByClassName('Year');
        const yearInPrevDecade = Array.from(prevYears).find(year => year.textContent === '2002');
        expect(yearInPrevDecade).toBeInTheDocument();
        fireEvent.click(yearInPrevDecade);
        const yearsPanel = calendar.getElementsByClassName('CalendarPanel year')[0];
        expect(yearsPanel).toBeInTheDocument();
        const panelValue = yearsPanel.getElementsByClassName('PanelValue')[0];
        expect(panelValue.textContent).toEqual('2002');
    });

    test('open years calendar, change to next decade and select year', async () => {
        const { getByLabelText, getByTestId, getByText } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);
        const calendar = await waitForElement(() => getByTestId('calendar'));
        const yearValue = getByText(/2019/i);
        fireEvent.click(yearValue);
        const yearsCalendar = await waitForElement(() => calendar.getElementsByClassName('YearsCalendar')[0]);
        const nextDecadeBtn = calendar
            .getElementsByClassName('CalendarPanel decade')[0]
            .getElementsByClassName('Next')[0];
        fireEvent.click(nextDecadeBtn);
        const nextYears = yearsCalendar.getElementsByClassName('Year');
        const yearInNextDecade = Array.from(nextYears).find(year => year.textContent === '2024');
        expect(yearInNextDecade).toBeInTheDocument();
        fireEvent.click(yearInNextDecade);
        const yearsPanel = calendar.getElementsByClassName('CalendarPanel year')[0];
        expect(yearsPanel).toBeInTheDocument();
        const panelValue = yearsPanel.getElementsByClassName('PanelValue')[0];
        expect(panelValue.textContent).toEqual('2024');
    });

    // behavior
    test('change month and year from calendar and close calendar, should not invoke change handler', async () => {
        const { getByLabelText, getByTestId, getByText } = setup();
        const calendarBtn = getByLabelText('calendar-button');
        fireEvent.click(calendarBtn);
        const calendar = await waitForElement(() => getByTestId('calendar'));
        const yearValue = getByText(/2019/i);
        fireEvent.click(yearValue);
        const yearsCalendar = await waitForElement(() => calendar.getElementsByClassName('YearsCalendar')[0]);
        const years = yearsCalendar.getElementsByClassName('Year');
        const firstYearOfDecade = Array.from(years).find(year => year.textContent === '2010');
        fireEvent.click(firstYearOfDecade);
        expect(mockChangeDate).toBeCalledTimes(0);
        const monthCalendar = await waitForElement(
            () => calendar.getElementsByClassName('MonthsCalendar')[0]
        );
        expect(monthCalendar).toBeInTheDocument();
        const november = getByText(/november/i);
        fireEvent.click(november);
        expect(mockChangeDate).toBeCalledTimes(0);
        fireEvent.click(calendarBtn);
        expect(mockChangeDate).toBeCalledTimes(0);
    });

    // test bugfix
    describe(' *** BUGFIX: empty picker input ***', () => {
        test('remove input value, open calendar and change month', () => {
            const { getByLabelText } = setup();
            const input = getByLabelText('picker-input') as HTMLInputElement;
            fireEvent.change(input, { target: { value: '' } });
            expect(mockChangeDate).toBeCalledWith('');
        });

        test('open calendar and change month, should change month panel value without crashing', async () => {
            const { getByLabelText, getByTestId } = setup('');
            const input = getByLabelText('picker-input') as HTMLInputElement;
            expect(input.value).toBe('');
            const calendarBtn = getByLabelText('calendar-button');
            fireEvent.click(calendarBtn);

            const calendar = await waitForElement(() => getByTestId('calendar'));
            const prevMonthBtn = calendar
                .getElementsByClassName('CalendarPanel month')[0]
                .getElementsByClassName('Prev')[0];
            fireEvent.click(prevMonthBtn);
            expect(input.value).toBe('');
            expect(mockChangeDate).toBeCalledTimes(0);
        });
    });

    describe('*** BUGFIX: input one digit and change year/month from calendar ***', () => {
        test('incorrect date input not crashing page', async () => {
            const { getByLabelText, getByTestId } = setup('1');
            const input = getByLabelText('picker-input') as HTMLInputElement;
            expect(input.value).toBe('1');
            const calendarBtn = getByLabelText('calendar-button');
            fireEvent.click(calendarBtn);

            const calendar = await waitForElement(() => getByTestId('calendar'));
            const prevMonthBtn = calendar
                .getElementsByClassName('CalendarPanel month')[0]
                .getElementsByClassName('Prev')[0];
            fireEvent.click(prevMonthBtn);
            expect(calendar).toBeInTheDocument();
        });
    });
});

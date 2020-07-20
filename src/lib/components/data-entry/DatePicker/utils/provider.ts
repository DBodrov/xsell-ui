import { ChangeDirection } from '../types';
import { THIS_DAY, THIS_MONTH, THIS_YEAR } from './date';
import { zeroPad } from './common';
import { createDecadeTitle } from './calendar';

const dayOrMonthValid = (value: string) => value && value.length === 2 && value !== '00';

export const getDecade = (date: string) => {
    const year = getPickerYear(date);
    return createDecadeTitle(year);
};

export const getPickerYear = (date: string) => {
    const [, , year] = date.split('.');
    if (year && year.length === 4) {
        return Number(year);
    }
    return THIS_YEAR;
};

export const getPickerMonth = (date: string) => {
    const [, month] = date.split('.');
    const formattedMonth = month && zeroPad(month, 2);
    return dayOrMonthValid(formattedMonth) && Number(formattedMonth) <= 12
        ? formattedMonth
        : zeroPad(THIS_MONTH, 2);
};

export const getPickerDay = (date: string) => {
    const [day] = date.split('.');
    const formattedDay = day && zeroPad(day, 2);
    return dayOrMonthValid(formattedDay) ? formattedDay : zeroPad(THIS_DAY, 2);
};

export const changeMonth = (direction: ChangeDirection, currentValue: number): string => {
    let monthValue: number;
    if (direction === 'prev') {
        monthValue = currentValue - 1;
        if (monthValue < 1) {
            monthValue = 12;
        }
    } else if (direction === 'next') {
        monthValue = currentValue + 1;
        if (monthValue > 12) {
            monthValue = 1;
        }
    }
    return String(monthValue);
};

interface IDateOptions {
    minDate?: string;
    maxDate?: string;
}

export const changeYear = (direction: ChangeDirection, currentValue: number): number => {
    let yearValue: number;
    if (direction === 'prev') {
        yearValue = currentValue - 1;
    } else if (direction === 'next') {
        yearValue = currentValue + 1;
    }
    return yearValue;
};

export const changeDecade = (direction: ChangeDirection, currentValue: string) => {
    let decadeValue: string;
    if (direction === 'prev') {
        const [firstYear] = currentValue.split('-');
        decadeValue = createDecadeTitle(Number(firstYear) - 10);
    } else if (direction === 'next') {
        const [firstYear] = currentValue.split('-');
        decadeValue = createDecadeTitle(Number(firstYear) + 10);
    }
    return decadeValue;
};

export const createDateString = (day: string | number, month: string | number, year: string | number) =>
    `${zeroPad(day, 2)}.${zeroPad(month, 2)}.${year}`;

export const splitDateString = (dateString: string) => dateString.split('.');

export const dateStringToDate = (value: string) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date;
};

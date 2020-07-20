import { DayType, IDateParams } from '../types';
import { THIS_MONTH, THIS_YEAR, THIS_DECADE } from './date';

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11]; // апрель, июнь, сентябрь, ноябрь - по 30 дней
    const isLeapYear = year % 4 === 0; // делится на 4 без остатка - високосный год

    return month === 2 // февраль 28-29?
        ? isLeapYear
            ? 29
            : 28
        : months30.includes(month)
        ? 30
        : 31;
};

export const isSameDay = (date: IDateParams, baseDate: IDateParams): boolean => {
    const { day: currentDay, month: currentMonth, year: currentYear } = date;
    const { day: baseDay, month: baseMonth, year: baseYear } = baseDate;
    return currentDay === baseDay && currentMonth === baseMonth && currentYear === baseYear;
};

export const isSameMonth = (date: IDateParams, baseDate: IDateParams): boolean => {
    const { month: currentMonth, year: currentYear } = date;
    const { month: baseMonth, year: baseYear } = baseDate;
    return currentMonth === baseMonth && currentYear === baseYear;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay === 0 ? 7 : firstDay;
};

// предыдущий месяц (и год)
export const getPreviousMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
    const prevMonth = month > 1 ? month - 1 : 12;
    const prevMonthYear = month > 1 ? year : year - 1;
    return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
    const nextMonth = month < 12 ? month + 1 : 1;
    const nextMonthYear = month < 12 ? year : year + 1;
    return { month: nextMonth, year: nextMonthYear };
};

export const getCurrentMonthDays = (month: number, year: number) => {
    const monthDays = getMonthDays(month, year);
    const emptyDays = new Array(monthDays).fill(undefined);

    return [...emptyDays].map((n, i) => i + 1);
};

export const getDayType = (displayDate: IDateParams): DayType => {
    const { day, month, year } = displayDate;
    const dayNumber = new Date(year, month - 1, day).getDay();
    if (dayNumber === 6 || dayNumber === 0) {
        return 'weekend';
    }
    return 'workday';
};

export const getDayTooltip = (date: Date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru', options);
};

export const getFirstYearInDecade = (year = THIS_YEAR) => {
    const firstYear = year - (year % 10);
    return firstYear;
};

export const createDecadeTitle = (year = THIS_YEAR) => {
    const firstYear = getFirstYearInDecade(year);
    const lastYear = firstYear + 9;
    return `${firstYear}-${lastYear}`;
};

export const getDisabledState = (
    day: number,
    month: number,
    year: number,
    minDate?: string,
    maxDate?: string
) => {
    const currentDate = new Date(year, month, day);
    let minResult = false;
    let maxResult = false;
    if (minDate) {
        const [minDay, minMonth, minYear] = minDate.split('.').map(Number);
        const minNativeDate = new Date(minYear, minMonth, minDay);
        minResult = currentDate < minNativeDate;
    }
    if (maxDate) {
        const [maxDay, maxMonth, maxYear] = maxDate.split('.').map(Number);
        const maxNativeDate = new Date(maxYear, maxMonth, maxDay);
        maxResult = currentDate > maxNativeDate;
    }
    return minResult || maxResult;
};

export const yearsCalendarBuilder = (decade = THIS_DECADE) => {
    const [firstYear, lastYear] = decade.split('-');
    const emptyYears = new Array(10).fill(undefined);
    const currentDecade = emptyYears.map((n, i) => Number(firstYear) + i);
    const yearsCalendar = [Number(firstYear) - 1, ...currentDecade, Number(lastYear) + 1];

    return yearsCalendar;
};

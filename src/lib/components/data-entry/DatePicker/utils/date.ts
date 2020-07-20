import { IMonth } from '../types';
import { createDecadeTitle } from './calendar';

export const THIS_YEAR = new Date().getFullYear();

export const THIS_DECADE = createDecadeTitle();

export const THIS_MONTH = new Date().getMonth() + 1;

export const THIS_DAY = new Date().getDate();

export const getMonthsList = (locales: string | string[]): IMonth[] => {
    const year = THIS_YEAR;
    const months: IMonth[] = [];
    for (let i = 0; i < 12; i++) {
        const monthNumber = i;
        const date = new Date(year, i, 1);
        const month = new Date(date).toLocaleString(locales, { month: 'long' });
        months.push({ monthNumber: String(monthNumber + 1), monthName: month });
    }
    return months;
};

export function getMonthName(monthNumber: string, locales?: string | string[]) {
    const monthItem = getMonthsList(locales).find(m => Number(m.monthNumber) === Number(monthNumber));
    return monthItem.monthName;
}

export const WEEK_DAYS = [
    { title: 'Пн', number: 1 },
    { title: 'Вт', number: 2 },
    { title: 'Ср', number: 3 },
    { title: 'Чт', number: 4 },
    { title: 'Пт', number: 5 },
    { title: 'Сб', number: 6 },
    { title: 'Вс', number: 0 },
] as const;

// 6 недель в календаре
export const CALENDAR_WEEKS = 6;

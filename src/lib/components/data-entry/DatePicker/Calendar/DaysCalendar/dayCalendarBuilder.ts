import {
    getDayType,
    getCurrentMonthDays,
    getMonthDays,
    getMonthFirstDay,
    getNextMonth,
    getPreviousMonth,
    getDisabledState,
} from '../../utils/calendar';
import { THIS_MONTH, THIS_YEAR, CALENDAR_WEEKS } from '../../utils/date';
import { ChangeDirection, IDateObject, IDateParams, IDayCalendarOptions } from '../../types';

const createDateParams = (month = THIS_MONTH, year = THIS_YEAR, day = 1): IDateParams => ({
    day,
    month,
    year,
});

const createDateObject = (
    index: number,
    day: number,
    month: number,
    year: number,
    monthStep?: ChangeDirection,
    minDate?: string,
    maxDate?: string
): IDateObject => {
    const dayType = getDayType(createDateParams(month, year, day));
    const disabledDate = getDisabledState(day, month, year, minDate, maxDate);

    const dateObject = {
        monthStep,
        key: `${year}_${month}_${day}`,
        type: dayType,
        calendarDay: day,
        calendarMonth: month,
        calendarYear: year,
        calendarDate: new Date(year, month - 1, day),
        disabledDate,
    };

    return dateObject;
};

export const daysCalendar = (month: number, year: number) => [...getCurrentMonthDays(month, year)];

export const daysCalendarBuilder = (internalValue: string, options?: IDayCalendarOptions): IDateObject[] => {
    const [, month = THIS_MONTH, year = THIS_YEAR] = internalValue.split('.').map(Number);
    const { minDate = null, maxDate = null } = options;

    const currentMonthDates = getCurrentMonthDays(month, year).map((day, index) =>
        createDateObject(index, day, month, year, null, minDate, maxDate)
    );
    const monthDays = getMonthDays(month, year); // кол-во дней текущего месяца
    const daysFromPrevMonth = getMonthFirstDay(month, year) - 1; // кол-во дней от предыдущего месяца
    const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear); // дней в предыдущем месяце

    const prevMonthDates = Array(daysFromPrevMonth)
        .fill(undefined)
        .map((n, index) => {
            const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
            return createDateObject(index, day, prevMonth, prevMonthYear, 'prev', minDate, maxDate);
        });

    const nextMonthDates = Array(daysFromNextMonth)
        .fill(undefined)
        .map((n, index) => {
            const day = index + 1;
            return createDateObject(index, day, nextMonth, nextMonthYear, 'next', minDate, maxDate);
        });

    return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

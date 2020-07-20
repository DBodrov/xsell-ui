import React, { useCallback, useRef } from 'react';
import { animated } from 'react-spring';
import cN from 'classnames/bind';
import { useDatePicker } from '../../DatePicker.provider';
import { useSwipe } from '../swipe.hook';
import { IDateObject } from '../../types';
import { isSameDay, getDayTooltip } from '../../utils/calendar';
import { splitDateString, createDateString } from '../../utils/provider';
import { daysCalendarBuilder } from './dayCalendarBuilder';
import css from './DaysCalendar.module.scss';

const cx = cN.bind(css);

export function DaysTable() {
    const calendarRef = useRef<HTMLDivElement>(null);

    const {
        internalValue,
        value,
        month: monthNumber,
        day,
        year,
        handleChangeValue,
        handleCloseCalendar,
        minDate,
        maxDate,
    } = useDatePicker();

    const valueGuard = useCallback(
        () => (internalValue.trim().length > 0 ? internalValue : createDateString(day, monthNumber, year)),
        [day, internalValue, monthNumber, year]
    );

    const { calendarStyles, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
        'month',
        monthNumber
    );

    const getCssClasses = (dateObject: IDateObject) => {
        const [storedDay, storedMonth, storedYear] = splitDateString(value).map(Number);
        const storedDate = { day: storedDay, month: storedMonth, year: storedYear };

        const currentDate = {
            day: dateObject.calendarDay,
            month: dateObject.calendarMonth,
            year: dateObject.calendarYear,
        };
        const cssClasses = cx(
            css.Day,
            { [css.Weekend]: dateObject.type === 'weekend' },
            { [css.PrevMonthDay]: dateObject.monthStep === 'prev' },
            { [css.NextMonthDay]: dateObject.monthStep === 'next' },
            {
                [css.Active]: isSameDay(storedDate, currentDate),
            },
            { [css.isDisabled]: dateObject.disabledDate }
        );
        return cssClasses;
    };

    const handleDaySelect = useCallback(
        (dateObject: IDateObject) => {
            const { calendarDay, calendarMonth, calendarYear } = dateObject;
            const newDate = createDateString(calendarDay, calendarMonth, calendarYear);
            handleChangeValue(newDate);
            handleCloseCalendar();
        },
        [handleChangeValue, handleCloseCalendar]
    );

    return (
        <animated.div
            className={css.DaysTable}
            ref={calendarRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={calendarStyles}
            onTouchEnd={handleTouchEnd}>
            {daysCalendarBuilder(valueGuard(), { minDate, maxDate }).map(dateObject => (
                <span
                    key={dateObject.key}
                    title={getDayTooltip(dateObject.calendarDate)}
                    className={getCssClasses(dateObject)}
                    onClick={dateObject.disabledDate ? undefined : () => handleDaySelect(dateObject)}
                    role="presentation"
                    data-testid="day">
                    {dateObject.calendarDay}
                </span>
            ))}
        </animated.div>
    );
}

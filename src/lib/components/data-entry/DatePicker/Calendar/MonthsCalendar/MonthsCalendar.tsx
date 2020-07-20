import React from 'react';
import cn from 'classnames/bind';
import { useDatePicker } from '../../DatePicker.provider';
import { getMonthsList } from '../../utils/date';
import { createDateString } from '../../utils/provider';
import { zeroPad } from '../../utils/common';
import css from './MonthsCalendar.module.scss';

const cx = cn.bind(css);

export function MonthsCalendar() {
    const {
        locales,
        month,
        day,
        year,
        setCalendarView,
        handleChangeValue,
        handleCloseCalendar,
        view,
        setInternalValue,
    } = useDatePicker();

    const getCssClasses = (monthNumber: string) =>
        cx(css.Month, { [css.Active]: Number(monthNumber) === Number(month) });

    const handleMonthSelect = (monthNumber: string) => {
        const newDate = createDateString(day, zeroPad(monthNumber, 2), year);
        if (view === 'months') {
            handleChangeValue(newDate);
            handleCloseCalendar();
        } else {
            setInternalValue(newDate);
            setCalendarView('days');
        }
    };

    return (
        <div className={css.MonthsCalendar}>
            {getMonthsList(locales).map(({ monthNumber, monthName }) => (
                <span
                    key={monthNumber}
                    className={getCssClasses(monthNumber)}
                    tabIndex={0}
                    role="button"
                    onClick={() => handleMonthSelect(monthNumber)}>
                    {monthName}
                </span>
            ))}
        </div>
    );
}

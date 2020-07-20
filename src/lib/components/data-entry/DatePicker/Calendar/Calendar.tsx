import React from 'react';
import { CalendarPanel } from './CalendarPanel';
import { CalendarTable } from './CalendarTable';
import { useDatePicker } from '../DatePicker.provider';
import css from './Calendar.module.scss';

export function Calendar() {
    const { calendarView } = useDatePicker();
    const getTypeForYearPanel = () => {
        if (calendarView === 'years') {
            return 'decade';
        }
        return 'year';
    };

    return (
        <div className={css.Calendar} data-testid="calendar">
            <CalendarPanel type={getTypeForYearPanel()} navDisabled={false} />
            <CalendarPanel type="month" navDisabled={calendarView === 'years'} />
            <CalendarTable view={calendarView} />
        </div>
    );
}

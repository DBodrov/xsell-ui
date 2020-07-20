import React from 'react';
import css from './DaysCalendar.module.scss';
import { WEEK_DAYS } from '../../utils/date';

export function DaysPanel() {
    return (
        <div className={css.DaysPanel}>
            {WEEK_DAYS.map(day => (
                <span key={day.number} className={css.DayOfWeek}>
                    {day.title}
                </span>
            ))}
        </div>
    );
}

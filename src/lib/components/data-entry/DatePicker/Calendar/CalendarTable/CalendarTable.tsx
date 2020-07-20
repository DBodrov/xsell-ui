import React, { useEffect } from 'react';
import { useDatePicker } from '../../DatePicker.provider';
import { DaysCalendar } from '../DaysCalendar/DaysCalendar';
import { MonthsCalendar } from '../MonthsCalendar';
import { YearsCalendar } from '../YearsCalendar';
import { TCalendarView } from '../../types';
import css from './CalendarTable.module.scss';

interface ICalendarTable {
    view: TCalendarView;
}

export function CalendarTable(props: ICalendarTable) {
    const { view } = props;
    const { setCalendarView } = useDatePicker();

    useEffect(() => {
        if (view !== 'days') {
            setCalendarView('days');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCalendarView = () => {
        if (view === 'days') {
            return <DaysCalendar />;
        }
        if (view === 'months') {
            return <MonthsCalendar />;
        }
        if (view === 'years') {
            return <YearsCalendar />;
        }
        return <DaysCalendar />;
    };

    return <div className={css.CalendarTable}>{renderCalendarView()}</div>;
}

import React from 'react';
import cn from 'classnames/bind';
import { getMonthName } from '../../utils/date';
import { useDatePicker } from '../../DatePicker.provider';
import { IMonth, IYear, ChangeDirection, TCalendarView, PanelType } from '../../types';
import css from './CalendarPanel.module.scss';

interface ICalendarPanelProps {
    type: PanelType;
    months?: IMonth[];
    years?: IYear[];
    navDisabled: boolean;
}

const cx = cn.bind(css);

export function CalendarPanel(props: ICalendarPanelProps) {
    const { type, navDisabled = false } = props;
    const { handleChangePanel, year, month, setCalendarView, locales, decade } = useDatePicker();

    const panelValueCss = cx(css.PanelValue, { [css.asLink]: type !== 'decade' });

    const handleChange: React.MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        const direction = event.currentTarget.name as ChangeDirection;
        handleChangePanel(direction, type);
    };

    const handleSelectCalendar = () => {
        const view: TCalendarView = type === 'year' ? 'years' : 'months';
        setCalendarView(view);
    };

    const getPanelValue = () => {
        if (type === 'year') return year;
        if (type === 'month') return getMonthName(month, locales);
        if (type === 'decade') return decade;
        return '';
    };

    return (
        <div className={`${css.CalendarPanel} ${type}`}>
            <button
                className={css.Prev}
                name="prev"
                type="button"
                onClick={handleChange}
                disabled={navDisabled}>
                {''}
            </button>
            <div
                role="button"
                tabIndex={0}
                style={{ cursor: type === 'decade' ? 'default' : 'pointer' }}
                className={panelValueCss}
                onClick={type !== 'decade' ? handleSelectCalendar : undefined}>
                {getPanelValue()}
            </div>
            <button
                className={css.Next}
                name="next"
                type="button"
                onClick={handleChange}
                disabled={navDisabled}>
                {''}
            </button>
        </div>
    );
}

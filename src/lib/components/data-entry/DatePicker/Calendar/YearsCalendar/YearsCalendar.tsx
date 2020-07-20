import React, { useRef } from 'react';
import { animated } from 'react-spring';
import cn from 'classnames/bind';
import { useDatePicker } from '../../DatePicker.provider';
import { useSwipe } from '../swipe.hook';
import { yearsCalendarBuilder } from '../../utils/calendar';
import { createDateString } from '../../utils/provider';
import css from './YearsCalendar.module.scss';

const cx = cn.bind(css);

export function YearsCalendar() {
    const {
        decade,
        day,
        month,
        year,
        handleChangeValue,
        setCalendarView,
        view,
        setInternalValue,
        handleCloseCalendar,
    } = useDatePicker();

    const yearsCalendarRef = useRef<HTMLDivElement>(null);

    const { handleTouchStart, handleTouchMove, handleTouchEnd, calendarStyles } = useSwipe('decade', decade);

    const getCssClasses = (currentYear: number) =>
        cx(css.Year, { [css.Active]: Number(currentYear) === year });

    const handleYearSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
        const yearValue = e.currentTarget.textContent;
        const newDate = createDateString(day, month, Number(yearValue));
        if (view === 'years') {
            handleChangeValue(newDate);
            handleCloseCalendar();
        } else {
            setInternalValue(newDate);
            setCalendarView('months');
        }
    };

    return (
        <animated.div
            style={calendarStyles}
            className={css.YearsCalendar}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            ref={yearsCalendarRef}>
            {yearsCalendarBuilder(decade).map(valueYear => (
                <span
                    key={valueYear}
                    role="button"
                    tabIndex={0}
                    className={getCssClasses(valueYear)}
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleYearSelect(e)}>
                    {valueYear}
                </span>
            ))}
        </animated.div>
    );
}

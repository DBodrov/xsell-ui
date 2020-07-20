import React, {
    useState,
    useEffect,
    useContext,
    useMemo,
    createContext,
    useCallback,
    useLayoutEffect,
} from 'react';
import {
    changeMonth,
    changeYear,
    changeDecade,
    getPickerDay,
    getPickerMonth,
    getPickerYear,
    getDecade,
    createDateString,
    splitDateString,
} from './utils/provider';
import { THIS_DAY, THIS_MONTH, THIS_YEAR, THIS_DECADE } from './utils/date';
import { zeroPad, isEmptyString } from './utils/common';
import { ChangeDirection, PanelType, IDatePickerContext, IDatePickerProps, TCalendarView } from './types';

const DatePickerContext = createContext<IDatePickerContext>(null);

interface IDatePickerProviderProps extends IDatePickerProps {
    children: React.ReactNode;
    onCloseCalendar: () => void;
    calendarIsOpen: boolean;
}

export const DatePickerProvider = (props: IDatePickerProviderProps) => {
    const {
        showCurrent,
        locales = 'ru',
        placeholder,
        onChangeHandler,
        onBlurHandler,
        value: pickerValue,
        children,
        disabled = false,
        onCloseCalendar,
        maxDate,
        minDate,
        calendarIsOpen,
        view = 'days',
        calendarDefaultDate,
        tabIndex,
    } = props;
    // const [displayValue, setDisplayValue] = useState('');
    const [internalValue, setInternalValue] = useState('');
    const [day, setDay] = useState(zeroPad(THIS_DAY, 2));
    const [month, setMonth] = useState(zeroPad(THIS_MONTH, 2));
    const [year, setYear] = useState(THIS_YEAR);
    const [decade, setDecade] = useState(THIS_DECADE);
    const [calendarView, setCalendarView] = useState<TCalendarView>(view);
    const [panelDirection, setPanelDirection] = useState<ChangeDirection>(null);
    const [isFocused, setFocus] = useState(false);

    const handleChangeValue = useCallback(
        (date: string) => {
            onChangeHandler && onChangeHandler(date);
        },
        [onChangeHandler]
    );

    const handleChangePanel = useCallback(
        (direction: ChangeDirection, panelType: PanelType) => {
            let newDate: string;
            setPanelDirection(direction);
            const [
                internalDay = THIS_DAY,
                internalMonth = THIS_MONTH,
                internalYear = THIS_YEAR,
            ] = splitDateString(internalValue);
            if (panelType === 'month') {
                const monthValue = changeMonth(direction, Number(internalMonth));
                newDate = createDateString(internalDay, monthValue, internalYear);
                if (view === 'months') {
                    handleChangeValue(newDate);
                }
                setInternalValue(newDate);
            } else if (panelType === 'year') {
                const yearValue = changeYear(direction, year);
                newDate = createDateString(internalDay, internalMonth, yearValue);
                setInternalValue(newDate);
            } else if (panelType === 'decade') {
                // console.log(panelType);
                const decadeValue = changeDecade(direction, decade);
                setDecade(decadeValue);
            }
        },
        [decade, handleChangeValue, internalValue, view, year]
    );

    const handleBlurInput = useCallback(
        (date: string) => {
            // setFocus(false);
            if (!calendarIsOpen) {
                setFocus(false);
                onBlurHandler && onBlurHandler(date);
            }
        },
        [calendarIsOpen, onBlurHandler]
    );

    const handleCloseCalendar = useCallback(() => {
        onCloseCalendar();
        setFocus(true);
    }, [onCloseCalendar]);

    const handleSetFocus = (focusState: boolean) => setFocus(focusState);

    useLayoutEffect(() => {
        if (calendarIsOpen) {
            if (isEmptyString(pickerValue)) {
                if (isEmptyString(calendarDefaultDate)) {
                    setInternalValue(createDateString(day, month, year));
                    return;
                }
                setInternalValue(calendarDefaultDate);
                return;
            }
            setInternalValue(pickerValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pickerValue, calendarIsOpen]);

    useEffect(() => {
        const internalYear = getPickerYear(internalValue);
        setYear(internalYear);
        const internalMonth = getPickerMonth(internalValue);
        setMonth(internalMonth);
        const internalDay = getPickerDay(internalValue);
        setDay(internalDay);
        const internalDecade = getDecade(internalValue);
        setDecade(internalDecade);
    }, [internalValue]);

    const context: IDatePickerContext = {
        value: pickerValue,
        internalValue,
        handleChangePanel,
        handleChangeValue,
        handleBlurInput,
        showCurrent,
        disabled,
        placeholder,
        locales,
        decade,
        year,
        month,
        day,
        minDate,
        maxDate,
        handleCloseCalendar,
        calendarView,
        setCalendarView,
        panelDirection,
        isFocused,
        handleSetFocus,
        view,
        setInternalValue,
        calendarDefaultDate,
        tabIndex,
    };

    const pickerData = useMemo(() => ({ ...context }), [context]);

    return <DatePickerContext.Provider value={pickerData}>{children}</DatePickerContext.Provider>;
};

export const useDatePicker = () => useContext(DatePickerContext);

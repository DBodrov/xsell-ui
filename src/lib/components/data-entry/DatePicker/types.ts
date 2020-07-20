export type DatePickerValue = string;

export interface IYear {
    [id: number]: number;
}

export interface IMonth {
    monthNumber: string;
    monthName: string;
}

export interface IDatePickerProps {
    name: string;
    view: TCalendarView;
    hasError?: boolean;
    disabled?: boolean;
    hasClear?: boolean;
    showCurrent?: boolean;
    locales?: string | string[];
    placeholder?: string;
    onChangeHandler: (value: string) => void;
    onClearHandler?: (name: string) => void;
    onFocusHandler?: (value: string) => void;
    onBlurHandler?: (value: string) => void;
    styles?: React.CSSProperties;
    value: DatePickerValue;
    tabIndex?: number;
    yearsList?: IYear[];
    monthsList?: IMonth[];
    maxDate?: string;
    minDate?: string;
    calendarDefaultDate?: string;
}

export interface IPickerValue {
    day: string;
    month: string;
    year: string;
}

export interface IPickerDropdownProps {
    isOpen: boolean;
    offset?: ClientRect;
    // onClick: (value: string) => void;
    children?: never;
}

export type TCalendarView = 'days' | 'months' | 'years';

export type ChangeDirection = 'prev' | 'next';
export type PanelType = 'month' | 'year' | 'decade';

export interface IDayCalendarOptions {
    minDate?: string;
    maxDate?: string;
}

export interface IDatePickerContext extends Partial<IDatePickerProps> {
    value?: string;
    internalValue?: string;
    decade: string;
    year: number;
    month: string;
    day: string;
    calendarView: TCalendarView;
    panelDirection: ChangeDirection;
    isFocused: boolean;

    handleChangePanel: (direction: ChangeDirection, panelType: PanelType) => void;
    handleChangeValue: (date: string) => void;
    handleBlurInput: (date: string) => void;
    handleCloseCalendar: () => void;
    setCalendarView: (view: TCalendarView) => void;
    handleSetFocus: (focusState: boolean) => void;
    setInternalValue: (date: string) => void;
}

export type DayType = 'workday' | 'weekend';

export interface IDateObject {
    key: string;
    type: DayType;
    monthStep: ChangeDirection;
    calendarDay: number;
    calendarMonth: number;
    calendarYear: number;
    calendarDate: Date;
    disabledDate: boolean;
}

export interface IDateParams {
    day: number;
    month: number;
    year: number;
}

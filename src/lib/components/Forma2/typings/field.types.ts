import { Options } from 'lib/components/data-entry/Select';
import { TCalendarView } from 'lib/components/data-entry/DatePicker/types';
import { IFormaContext } from './forma.types';

export type FieldTypes =
    | 'text'
    | 'number'
    | 'email'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'password'
    | 'mask'
    | 'tel'
    | 'date'
    | 'range';

export interface IFieldBaseProps {
    name: string;
    type?: FieldTypes;
    styles?: React.CSSProperties;
    hasClear?: boolean;
    inline?: boolean;
    label?: string;
    description?: React.ReactNode;
    'data-testid'?: string;
}

type InputAttributes =
    | JSX.IntrinsicElements['input']
    | JSX.IntrinsicElements['textarea']
    | JSX.IntrinsicElements['select'];

interface ISpecificFieldProps {
    // for Select
    options?: Options;
    // for PhopneInput
    controls?: React.ReactNode;
    mask?: string;
    countryCode?: string;
    // checkbox
    indeterminate?: boolean;
    // for DatePicker
    calendarDefaultDate?: string;
    view?: TCalendarView;
    showCurrent?: boolean;
    locales?: string | string[];
    maxDate?: string;
    minDate?: string;
    // for InputNumber
    formatOptions?: Intl.NumberFormat;
    zeroWhenEmpty?: boolean;
    extendProps?: {
        wrapperDiv?: any;
        input?: any;
    };
    parser?: 'parseFloat' | 'parseInt';
    'data-testid'?: string;
}

export type FieldBaseAttributes = InputAttributes & IFieldBaseProps & ISpecificFieldProps;

export interface IFieldContext {
    key?: string;
    name: string;
    hasError: boolean;
    hasTouched: boolean;
    value: any;
    touched: IFormaContext['touched'];
    errorMessage: string;
    handleChangeField: (fieldValue: any) => void;
    handleBlur: () => void;
    handleClear: (fieldName: string) => void;
}
export interface IContextFieldProps {
    children: (fieldContext: IFieldContext) => React.ReactNode;
    name: string;
}

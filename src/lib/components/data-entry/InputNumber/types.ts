export interface IInputNumberProps extends Exclude<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    children?: never;
    hasError?: boolean;
    hasClear?: boolean;
    'data-testid'?: string;
    styles?: React.CSSProperties;
    locales?: string | string[];
    formatOptions?: Intl.NumberFormatOptions;
    zeroWhenEmpty?: boolean;
    name: string;
    value?: string | number;
    extendProps?: {
        wrapperDiv?: any;
        input?: any;
    };
    parser?: 'parseFloat' | 'parseInt';
    onFocusHandler?: (value: string | number) => void;
    onBlurHandler?: (value: string | number) => void;
    onChangeHandler: (value: string | number | undefined) => void;
    onClearHandler?: (name: string) => void;
}

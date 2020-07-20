export interface IBasicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    hasError?: boolean;
    hasClear?: boolean;
    styles?: React.CSSProperties;
    // inputClassName: string;
    selectionStart?: number;
    selectionEnd?: number;
    name: string;
    value?: string;
    extendProps?: {
        wrapper?: any;
        control?: any;
    };
    onFocusHandler?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onClearHandler?: (name: string) => void;
}

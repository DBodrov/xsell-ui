export interface IMaskInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: never;
    icon?: string;
    hasError?: boolean;
    hasClear?: boolean;
    styles?: React.CSSProperties;
    name: string;
    value?: string;
    mask?: string;
    onFocusHandler?: (value: string | number) => void;
    onBlurHandler?: (value: string | number) => void;
    onChangeHandler: (value: string[]) => void;
    onClearHandler?: (name: string) => void;
}

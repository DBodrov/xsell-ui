export interface IBasicTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    children?: never;
    controls?: React.ReactNode;
    hasError?: boolean;
    hasClear?: boolean;
    styles?: React.CSSProperties;
    name: string;
    value?: string;
    resizable?: boolean;
    onFocusHandler?: (value: string) => void;
    onBlurHandler?: (value: string) => void;
    onChangeHandler: (value: string) => void;
    onClearHandler: (name: string) => void;
}

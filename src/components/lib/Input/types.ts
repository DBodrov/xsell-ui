export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    name: string;
    value?: string | number;
    onFocusHandler?: (value: string, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: string , event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

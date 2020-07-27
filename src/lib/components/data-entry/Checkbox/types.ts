export type TCheckboxChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLSpanElement, MouseEvent>;

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    indeterminate?: boolean;
    onFocusHandler?: (value: boolean) => void;
    onBlurHandler?: (value: boolean) => void;
    onChangeHandler: (value: boolean, event: TCheckboxChangeEvent) => void;
    onClearHandler?: (name: string) => void;
}

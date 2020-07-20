export type TOption = Record<string | number, string>;
export type Options = TOption[];

export interface ISelectProps {
    name: string;
    placeholder: string;
    hasError?: boolean;
    options?: Options;
    disabled?: boolean;
    hasClear?: boolean;
    onChangeHandler: (value: ValueType) => void;
    onClearHandler?: (name: string) => void;
    onFocusHandler?: (value: ValueType) => void;
    onBlurHandler?: () => void;
    styles?: React.CSSProperties;
    value?: ValueType;
    tabIndex?: number;
}

export interface IOptionsListProps {
    options: Options;
    selectedValue?: string | number;
    onChangeHandler: (value: ValueType) => void;
}

export interface IOptionProps {
    value: string | number;
    caption: string;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick: (itemId: string | number) => void;
}

export interface ISelectDropdownProps {
    isOpen: boolean;
    offset?: ClientRect;
    activeOption?: ValueType;
    onClick: (value: string) => void;
    children?: never;
}

export type ValueType = string | number | null;

export interface IConvertSchema {
    key: string;
    value: string;
}

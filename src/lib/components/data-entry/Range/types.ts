export type RangeType = 'currency' | 'numeric';

export interface IRangeProps {
    name: string;
    rangeType?: 'numeric' | 'currency';
    currency?: 'RUB' | 'USD' | 'EUR';
    disabled?: boolean;
    inputDisabled?: boolean;
    caption?: string;
    value?: string | number;
    min: number | string;
    max: number | string;
    minText?: string;
    maxText?: string;
    step?: number | string;
    styles?: React.CSSProperties;
    hasError?: boolean;
    onChangeHandler: (value: string | number) => void;
    onFocusHandler?: (value: string | number) => void;
    onBlurHandler?: (value: string | number) => void;
    onClearHandler?: (name: string) => void;
}

export interface IRangeInputProps {
    name: string;
    value?: string;
    caption?: string;
    min?: number;
    max?: number;
    onChange: (value: string) => void;
    onTouch: (touchState: boolean) => void;
    onBlurHandler?: () => void;
    isTouched: boolean;
    disabled: boolean;
    hasError?: boolean;
}

export interface ISliderProps {
    min: number;
    max: number;
    value?: string | number;
    step?: number;
    disabled?: boolean;
    isManualEdit?: boolean;
    hasError?: boolean;
    onEndEditing?: () => void;
    onChangeHandler: (value: number) => void;
    onBlurHandler?: () => void;
    onFocusHandler?: () => void;
}

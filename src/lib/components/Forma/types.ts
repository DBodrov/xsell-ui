import { Options, IRangeProps } from 'lib/components/data-entry/types';
import { IValidationErrors, ValidationSchema } from './Validator';

export type Values = Record<string, FieldValue>;
export interface IFormValues {
    [key: string]: any;
}
export type Touched = Record<string, boolean>;
export type TFormData<T = any> = { [K in keyof T]: T[K] };

export interface IFormaProps {
    initialValues: Values | IFormValues | TFormData;
    validationSchema?: ValidationSchema;
    noValidate?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onSubmit: (values: Values | TFormData<any>) => void;
    onReset?: (Values: Values) => void;
    children?: React.ReactNode;
}

export interface IFormCtx<T = any> {
    values: Values | IFormValues | TFormData<T>;
    touched: Touched;
    errors: IValidationErrors;
    isSubmitting: boolean;
    isValid: boolean;
    noValidate?: boolean;
    handleChange: (name: string, value: FieldValue) => void;
    handleReset: () => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleTouch: (name: string) => void;
    handleClearField: (name: string) => void;
}

export interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
    direction?: 'horizontal' | 'vertical';
    styles?: React.CSSProperties;
    children?: (ctx: IFormCtx) => React.ReactNode;
}

export type FieldTypes =
    | 'text'
    | 'number'
    | 'email'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'password'
    | 'mask'
    | 'phone'
    | 'date'
    | 'range';

export type FieldValue = string | number | boolean | null | undefined;

export interface IFieldProps
    extends React.HTMLProps<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        Omit<Partial<IRangeProps>, 'min' | 'max' | 'step'> {
    name: string;
    component?: React.ReactNode;
    type: FieldTypes;
    children?: React.ReactNode;
    icon?: string;
    mask?: string;
    maskChar?: string;
    inline?: boolean;
    hasError?: boolean;
    hasClear?: boolean;
    styles?: React.CSSProperties;
    value?: string | number;
    checked?: boolean;
    options?: Options;
    resizable?: boolean;
    disabled?: boolean;
    checkboxText?: string | any;
    label?: string | any;
}

export type TRenderProps = Partial<IFormCtx>;

export interface IFieldHandlers {
    onFocusHandler?: (value: FieldValue) => void;
    onBlurHandler?: (value: FieldValue) => void;
    onChangeHandler?: (value: FieldValue) => void;
    onClearHandler?: (name: string) => void;
}

export interface IFormFieldContext extends IFieldHandlers {
    name: string;
    checked?: boolean;
}

export type GenericFieldHTMLAttributes =
    | JSX.IntrinsicElements['input']
    | JSX.IntrinsicElements['select']
    | JSX.IntrinsicElements['textarea'];

export type SimpleFieldProps<T> = GenericFieldHTMLAttributes & T & { type: FieldTypes };

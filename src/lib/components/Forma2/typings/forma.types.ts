import { IValidationSchema } from './validator.types';

type Values = { [field: string]: any };

// provider
type ActionType =
    | 'INIT_FORM'
    | 'RESET_FORM'
    | 'CHANGE_VALUE'
    | 'CLEAR_FIELD'
    | 'ADD_ERROR'
    | 'SET_ISVALIDATING'
    | 'SET_ISTOUCHED'
    | 'SET_ISVALID'
    | 'SET_ISSUBMITING'
    | 'SET_ISSUBMITED';

export interface IFormaActions {
    type: ActionType;
    fieldName?: string;
    payload?: any;
}

export interface IFormaState {
    readonly values: Values;
    readonly touched: { [field: string]: boolean };
    readonly errors: { [field: string]: string };
    isValidating: boolean;
    isSubmiting: boolean;
    isValid: boolean;
}

export interface IFormaContext extends IFormaState, IFormaProps {
    handleChange: (fieldName: string, value: any) => void;
    handleTouch: (fieldName: string) => void;
    handleClearField: (fieldName: string) => void;
    handleSubmitForm: () => void;
    handleResetForm: () => void;
    dispatch: React.Dispatch<IFormaActions>;
}

// Forma2
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFormaProviderProps extends IFormaProps {}

export interface IFormaProps {
    initialValues: { [field: string]: any };
    validationSchema?: IValidationSchema;
    noValidate?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onSubmit: (values: Values) => void;
    onReset?: (values: Values) => void;
    children?: React.ReactNode | ((args: IFormaContext) => React.ReactNode);
    style?: React.CSSProperties;
    controlProps?: {
        form?: Omit<FormaFormProps, 'children'>;
        // formFields?: any;
    };
}

export type FormaFormProps = Pick<
    React.FormHTMLAttributes<HTMLFormElement>,
    Exclude<keyof React.FormHTMLAttributes<HTMLFormElement>, 'onReset' | 'onSubmit'>
> & {
    direction?: 'horizontal' | 'vertical';
    styles?: React.CSSProperties;
    children: React.ReactNode | ((args: IFormaContext) => React.ReactNode);
    className?: string;
};

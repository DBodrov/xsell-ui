import { IFormaProviderProps } from '../typings/';

export const isFunction = (children: any): children is Function => typeof children === 'function';

export const propsGuard = (props: IFormaProviderProps) => {
    validationGuard(props);
};

const validationGuard = (props: IFormaProviderProps) => {
    const { noValidate, validationSchema } = props;
    if (!noValidate) {
        if (!validationSchema) throw new Error('validationSchema props not found');
    }
};

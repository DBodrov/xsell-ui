import { IBasicInputProps } from 'lib/components/data-entry/BasicInput/types';

export interface IMaskInputProps extends IBasicInputProps {
    mask: string;
    extendProps?: {
        wrapper?: any;
        control?: any;
    };
}

export interface IMaskConfig {
    [x: string]: {
        type: 'symbol' | 'const' | 'digit';
        value?: string;
        position?: number;
    };
}

export interface IMaskOptions {
    prefix?: string;
    suffix?: string;
    charsConfig: IMaskConfig;
}

export type ChangeType = 'default' | 'backspace' | 'delete' | 'textPasted';

import { useState } from 'react';
import { Options, IConvertSchema, ISelectProps } from './types';

export function useSelected(options: Options) {
    const [selectedValue, setSelectedValue] = useState<ISelectProps['value']>(null);
    const [caption, setCaption] = useState<string>('');

    const valueSetter = (value: ISelectProps['value']): void => {
        const selectedOption = options.filter((opt) => opt[value] as ISelectProps['value'])[0];
        const displayText = Object.values(selectedOption)[0];
        setCaption(displayText);
        setSelectedValue(value);
    };

    const resetValue = (): void => {
        setSelectedValue(null);
        setCaption('');
    };

    return { selectedValue, valueSetter, caption, resetValue };
}

export function fromCollection(data: [], schema: IConvertSchema): Options {
    const { key, value }: { key: string; value: string } = schema;

    return data.reduce((options, item) => {
        const option = {
            [item[key]]: item[value],
        };
        options.push(option);
        return options;
    }, []);
}

import React from 'react';
import { IOptionsListProps, TOption } from '../types';
import { Option } from './Option';
import css from './OptionsList.module.scss';

export function OptionsList(props: IOptionsListProps) {
    const { options, onChangeHandler, selectedValue } = props;

    const isActiveOption = (value: keyof TOption) => String(value) === String(selectedValue);

    return (
        <div className={css.OptionsList}>
            {options && options.length > 0 ? (
                options.map(option => {
                    const [key, value] = Object.entries(option)[0];
                    return (
                        <Option
                            key={key}
                            value={key}
                            caption={value}
                            onClick={onChangeHandler}
                            isActive={isActiveOption(key)}
                        />
                    );
                })
            ) : (
                <span className={css.NoData}>Нет данных</span>
            )}
        </div>
    );
}

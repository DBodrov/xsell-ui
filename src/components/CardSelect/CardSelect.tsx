import React, { Fragment } from 'react';
import cx from 'classnames';
import Select, { ValueType, ActionMeta } from 'react-select';
import css from './CardSelect.module.scss';
import cardIcon from 'assets/images/card-color.svg';

interface ICardSelectProps {
    options: { label: string; value: any }[];
    onChange: (value: ValueType<any>, actionMeta: ActionMeta) => void;
    value: ValueType<any>;
}

interface IOptionProps {
    children?: React.ReactNode;
}

interface ISelectComponentProps {
    [x: string]: any;
}

export interface ICardSelectOption {
    label: string;
    value: string;
}

export interface ISelectState {
    inputValue: string;
    menuIsOpen: boolean;
    value: ICardSelectOption;
}

export interface ISelectState {
    inputValue: string;
    menuIsOpen: boolean;
    value: ICardSelectOption;
}

export interface ICardSelectRef {
    state: ISelectState;
}

// eslint-disable-next-line prettier/prettier
const theme = (provided) => ({
    ...provided,
    colors: {
        ...provided.colors,
        primary: '#52ae30',
    },
});

const customStyles = {
    // eslint-disable-next-line prettier/prettier
    input: (provided) => ({
        ...provided,
    }),
    // eslint-disable-next-line prettier/prettier
    indicatorSeparator: (provided) => ({
        ...provided,
        marginBottom: 16,
        marginTop: 16,
    }),
    // eslint-disable-next-line prettier/prettier
    control: (provided) => ({
        ...provided,
        boxShadow: 'none',
    }),
};

const OptionContent = ({ children }: IOptionProps) => (
    <Fragment>
        <div>
            <img src={cardIcon} alt="Card" />
        </div>
        <div className={css.Description}>
            <span>Ваша карта</span>
            <span>
                <b>{children}</b>
            </span>
        </div>
    </Fragment>
);

const CustomHeadOption = ({ innerRef, innerProps, ...props }: ISelectComponentProps) => (
    <div ref={innerRef} {...innerProps} className={css.HeadOption}>
        <OptionContent {...props} />
    </div>
);

const CustomOption = ({ innerRef, innerProps, isSelected, ...props }: ISelectComponentProps) => (
    <div ref={innerRef} {...innerProps} className={cx(css.SingleOption, { [css.Selected]: isSelected })}>
        <div className={css.CustomOption}>
            <OptionContent {...props} />
        </div>
    </div>
);

const NoOptionsMessage = ({ innerRef, innerProps }: ISelectComponentProps) => (
    <div ref={innerRef} {...innerProps} className={css.NoOptionsMessage}>
        Ничего не найдено
    </div>
);

const components = {
    SingleValue: CustomHeadOption,
    Option: CustomOption,
    NoOptionsMessage,
};

export const CardSelect = ({ options, value, onChange }: ICardSelectProps) => (
    <Select
        placeholder="Выберите карту"
        onChange={onChange}
        theme={theme}
        components={components}
        value={value}
        styles={customStyles}
        options={options}
    />
);

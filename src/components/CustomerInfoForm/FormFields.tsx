import React, { Fragment } from 'react';
import { UI } from 'services';
import { Field, FormField, IFieldProps, IFieldHandlers } from 'lib/components/Forma';
import { Checkbox } from 'lib/components/data-entry/Checkbox';
import css from './CustomerInfoForm.module.scss';

// FIXME: костыль костыльный
const Input = ({
    type,
    value,
    onChangeHandler,
    name,
    placeholder,
}: Partial<IFieldProps> & Partial<IFieldHandlers>) => (
    <input
        className={css.InputDate}
        type={type}
        value={value}
        name={name}
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={e => onChangeHandler(e.currentTarget.value)}
    />
);

const agreementLink =
    'https://hb.bizmrg.com/otpbank-docs/x-sell/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%BD%D1%8B%D1%85%20%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%BE%D0%B2.pdf';

const AgreementLink = () => (
    <span>
        Я даю{' '}
        <a className="as-link" href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
            согласие на обработку
        </a>{' '}
        Банком моих персональных данных в целях рассмотрения настоящего сообщения
    </span>
);

export function FormFields() {
    return (
        <div className={css.FormFields}>
            <Field
                type="phone"
                name="phoneNumber"
                label="МОБИЛЬНЫЙ ТЕЛЕФОН"
                placeholder="+7  ( ___ )  ___ - __ - __ "
            />
            {UI.isMobile() ? (
                <Field
                    type="date"
                    name="birthDate"
                    component={Input}
                    label="ДАТА РОЖДЕНИЯ"
                    placeholder="Выберите дату"
                />
            ) : (
                <Field type="text" name="birthDate" label="ДАТА РОЖДЕНИЯ" placeholder="ГГГГ-ММ-ДД" />
            )}
            <FormField layout="inline" name="consentAgree">
                {ctx => (
                    <Fragment>
                        <Checkbox
                            onChangeHandler={ctx.onChangeHandler}
                            name={ctx.name}
                            checked={ctx.checked}
                        />
                        <AgreementLink />
                    </Fragment>
                )}
            </FormField>
        </div>
    );
}

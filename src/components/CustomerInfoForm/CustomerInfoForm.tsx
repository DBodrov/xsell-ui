import React, { useCallback, Fragment } from 'react';
import { Experiment, Variant } from 'react-optimize';
import { Forma, Form, Field, FormField, ValidationSchema } from 'lib/components/Forma';
import { BasicButton } from 'lib/components/buttons';
import { Checkbox } from 'lib/components/data-entry/Checkbox';
import heroPic from 'assets/images/hero2/hero2@3x.png';
import { Hero } from 'components/Hero';
import { ICustomerInfo } from 'typings';
import { AgreementLink } from './AgreementLink';
import css from './CustomerInfoForm.module.scss';

interface ICustomerInfoFormProps {
    onCustomerCheck: (customerInfo: ICustomerInfo) => void;
}

const submitButtonStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
};

const date18plus = () => {
    const now = new Date();
    const initYear = now.getFullYear() - 18;
    const initMonth = now.getMonth();
    const initDay = now.getDate();
    const initDate = new Date(initYear, initMonth, initDay).toLocaleDateString('ru');
    return initDate;
};

const initCustomerInfoForm: ICustomerInfo = {
    birthDate: '',
    phoneNumber: '',
    consentAgree: false,
};

const validationSchema: ValidationSchema = {
    // birthDate: {
    //     isDate: { error: 'Введите дату в формате ДД.ММ.ГГГГ' },
    //     maxDate: { param: date18plus(), error: 'Вам должно быть больше 18 лет' },
    // },
};

export function CustomerInfoForm(props: ICustomerInfoFormProps) {
    const { onCustomerCheck } = props;
    const handleCheckCustomer = useCallback(
        (customerData: ICustomerInfo) => {
            onCustomerCheck(customerData);
        },
        [onCustomerCheck]
    );

    const infoIsCompleted = useCallback((formData: ICustomerInfo): boolean => {
        const { birthDate, consentAgree, phoneNumber } = formData;
        const customerInfoIsOk = birthDate.trim().length > 0 && phoneNumber.trim().length > 0;
        return customerInfoIsOk && consentAgree;
    }, []);

    return (
        <Forma
            initialValues={initCustomerInfoForm}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={handleCheckCustomer}>
            <Form direction="vertical" className={css.CustomerInfoForm}>
                {ctx => (
                    <Fragment>
                        <Hero
                            imgUrl={heroPic}
                            headText="Кредит наличными"
                            subheadText="Укажите свои данные,
                            чтобы мы могли узнать вас"
                        />
                        {/* <h2>Введите телефон</h2>
                        <p>Укажите свой номер телефона и дату рождения, чтобы мы могли узнать вас.</p> */}
                        <div className={css.FormFields}>
                            <Field
                                type="phone"
                                name="phoneNumber"
                                label="МОБИЛЬНЫЙ ТЕЛЕФОН"
                                placeholder="+7  ( ___ )  ___ - __ - __ "
                                autoComplete="off"
                                autoFocus
                            />
                            <Field
                                type="date"
                                name="birthDate"
                                label="ДАТА РОЖДЕНИЯ"
                                placeholder="ДД.ММ.ГГГГ"
                                calendarDefaultDate={date18plus()}
                                maxDate={date18plus()}
                                autoFocus={false}
                                tabIndex={0}
                            />
                            <FormField layout="inline" name="consentAgree">
                                {fieldCtx => (
                                    <Fragment>
                                        <Checkbox
                                            onChangeHandler={fieldCtx.onChangeHandler}
                                            name={fieldCtx.name}
                                            checked={fieldCtx.checked}
                                        />
                                        <AgreementLink />
                                    </Fragment>
                                )}
                            </FormField>
                        </div>

                        <div className={css.FormFooter}>
                            <Experiment id="3TEQEUaeSCylpAsy49mWNw">
                                <Variant id="0">
                                    <BasicButton
                                        type="submit"
                                        theme="primary"
                                        flat
                                        value="Далее"
                                        disabled={!infoIsCompleted(ctx.values as ICustomerInfo)}
                                        inactive={false}
                                        styles={submitButtonStyles}
                                    />
                                </Variant>
                                <Variant id="1">
                                    <BasicButton
                                        type="submit"
                                        theme="primary"
                                        data-testid="submit-button"
                                        flat
                                        value="Отправить"
                                        disabled={!infoIsCompleted(ctx.values as ICustomerInfo)}
                                        styles={submitButtonStyles}
                                    />
                                </Variant>
                            </Experiment>
                        </div>
                    </Fragment>
                )}
            </Form>
        </Forma>
    );
}

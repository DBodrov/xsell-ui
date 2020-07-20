import React, { useCallback } from 'react';
import { Forma, SimpleField, FormaButton, IValidationSchema } from 'lib/components/Forma2';
import { IAuth1Params } from 'context/Auth';
import { AgreementLink, DistanceAgreementLink } from './Links';
import css from './LoginForm.module.scss';

interface ILoginFormProps {
  onLogin: (authInfo: IAuth1Params) => void;
}

const date18plus = () => {
  const now = new Date();
  const initYear = now.getFullYear() - 18;
  const initMonth = now.getMonth();
  const initDay = now.getDate();
  const initDate = new Date(initYear, initMonth, initDay).toLocaleDateString('ru');
  return initDate;
};

const initLoginForm: IAuth1Params = {
  birthDate: '',
  phoneNumber: '',
  consentAgree: false,
  distanceAgreement: false,
};

const validationSchema: IValidationSchema = {
  birthDate: {
    isDate: { error: 'Введите дату в формате ДД.ММ.ГГГГ' },
    maxDate: { options: date18plus(), error: 'Вам должно быть больше 18 лет' },
    minDate: { options: '01.01.1919', error: 'Укажите вашу реальную дату рождения' },
  },
  phoneNumber: {
    isMobilePhone: {
      options: { mask: '(999) 999-99-99', countryCode: '+7' },
      error: 'Введите номер мобильного телефона',
    },
  },
  consentAgree: {
    isEqual: {
      options: true,
      error: '',
    },
  },
  distanceAgreement: {
    isEqual: {
      options: true,
      error: '',
    },
  },
};

export function LoginForm(props: ILoginFormProps) {
  const { onLogin } = props;
  const handleLogin = useCallback(
    (authData: IAuth1Params) => {
      onLogin(authData);
    },
    [onLogin]
  );

  return (
    <Forma
      initialValues={initLoginForm}
      validateOnBlur
      controlProps={{ form: { className: css.LoginForm } }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}>
      <div className={css.Heading}>
        <h2 className={css.Title}>Введите телефон</h2>
        <p className={css.Subtitle}>
          Укажите свой номер телефона и дату рождения, чтобы мы могли узнать вас.
        </p>
      </div>
      <SimpleField
        type="tel"
        name="phoneNumber"
        countryCode="+7"
        mask="(999) 999-99-99"
        placeholder="+7 (___) ___-___-__"
        label="МОБИЛЬНЫЙ ТЕЛЕФОН"
        hasClear
        autoComplete="off"
        tabIndex={0}
      />
      <SimpleField
        type="date"
        name="birthDate"
        label="ДАТА РОЖДЕНИЯ"
        placeholder="ДД.ММ.ГГГГ"
        calendarDefaultDate={date18plus()}
        maxDate={date18plus()}
        autoFocus={false}
        autoComplete="off"
        tabIndex={0}
      />
      <SimpleField name="consentAgree" type="checkbox" tabIndex={0}>
        <AgreementLink />
      </SimpleField>
      <SimpleField name="distanceAgreement" type="checkbox" tabIndex={0}>
        <DistanceAgreementLink />
      </SimpleField>
      <FormaButton value="Продолжить" tabIndex={0} disabledMode="alwaysEnabled" />
    </Forma>
  );
}

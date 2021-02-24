import React from 'react';
import {css} from '@emotion/react';
import {InputPhone} from 'neutrino-ui';
import {DatePicker} from 'neutrino-ui/lib/sealed';
import {Form, FormField, Label, H2} from 'components/lib';
import {isEmptyString} from 'utils/string.utils';
import {unmask, mobilePhoneValidator, errorValidation} from './utils';
import {
  placeholderStyles,
  fieldStyles,
  borderFieldStyles,
  countryCodeStyle,
  birthDateStyles,
  ErrorText,
} from './styles';

type FormState = {
  phoneNumber: string;
  birthDate: string;
};

type TFormValidationState = {
  touched: {
    phoneNumber: boolean;
    birthDate: boolean;
  };
  error: {
    phoneNumber: string;
    birthDate: string;
  };
};

const initValidationState: TFormValidationState = {
  touched: {
    birthDate: false,
    phoneNumber: false,
  },
  error: {
    birthDate: '',
    phoneNumber: '',
  },
};

export function SigninForm() {
  const [{birthDate, phoneNumber}, dispatch] = React.useReducer(
    (state: FormState, changes: Partial<FormState>) => ({...state, ...changes}),
    {phoneNumber: '', birthDate: ''},
  );

  const [{error, touched}, setValidation] = React.useReducer(
    (state: TFormValidationState, changes: Partial<TFormValidationState>) => ({...state, ...changes}),
    initValidationState,
  );

  const handleChangePhone = React.useCallback((phone: string) => {
    dispatch({phoneNumber: phone});
  }, []);

  const handleChangeBirthDay = React.useCallback((date: string) => {
    dispatch({birthDate: date});
  }, []);

  const validateDate = () => {
    console.log('validate date');
  };

  const validatePhoneNumber = React.useCallback(() => {
    console.log('Phone onBlur handle');
    const phoneNumberIsValid = mobilePhoneValidator(phoneNumber);
    const updateTouched = {...touched, phoneNumber: true};
    const updateError = {...error, phoneNumber: phoneNumberIsValid ? '' : errorValidation.phoneNumber};
    setValidation({touched: updateTouched, error: updateError});
  }, [error, phoneNumber, touched]);

  const hasPhoneNumberError = !isEmptyString(error.phoneNumber) && touched.phoneNumber;
  const hasBirthDateError = !isEmptyString(error.birthDate) && touched.birthDate;
  const formIsValid = !hasBirthDateError && !hasBirthDateError;

  console.log('hasPhoneError', hasPhoneNumberError);

  const phoneNumberBorderStyle = css([
    borderFieldStyles,
    css`
      border-color: ${hasPhoneNumberError ? 'var(--color-error)' : 'var(--color-border)'};
      &:focus,
      &:hover {
        border-color: ${hasPhoneNumberError ? 'var(--color-error)' : 'var(--color-primary)'};
      }
    `,
  ]);

  return (
    <Form>
      <FormField>
        <H2>Личные данные</H2>
      </FormField>
      <FormField css={{margin: 0}}></FormField>

      <FormField>
        <Label htmlFor="phoneNumber">Мобильный телефон</Label>
        <InputPhone
          countryCode="+7"
          mask="(999) 999-99-99"
          name="phoneNumber"
          onChange={handleChangePhone}
          onBlur={validatePhoneNumber}
          css={[fieldStyles, phoneNumberBorderStyle, placeholderStyles]}
          countryCodeCSS={countryCodeStyle}
          id="phoneNumber"
          value={phoneNumber}
          placeholder="(___) ___-__-__"
          autoFocus
        />
        {hasPhoneNumberError ? <ErrorText>{error.phoneNumber}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="birthDay">Дата рождения</Label>
        <DatePicker
          name="birthDay"
          onChangeHandler={handleChangeBirthDay}
          value={birthDate}
          inputStyles={birthDateStyles}
          calendarButtonStyles={{color: 'var(--color-primary)'}}
          onBlur={validateDate}
        />
      </FormField>
    </Form>
  );
}

import React from 'react';
import {css} from '@emotion/react';
import {InputPhone, Checkbox, Button} from 'neutrino-ui';
import {DatePicker} from 'neutrino-ui/lib/sealed';
import {Form, FormField, Label, H2, SecuritySign} from 'components/lib';
import {AgreementLink, DistanceAgreementLink} from './Links';
import {useSignin} from './use-signin';
import {date18plus} from './utils';
import {
  placeholderStyles,
  fieldStyles,
  borderFieldStyles,
  countryCodeStyle,
  birthDateStyles,
  ErrorText,
} from './styles';
import {TSigninFormProps} from './types';

export function SigninForm({onLogin}: TSigninFormProps) {
  const {
    values,
    error,
    changeBirthDate,
    changePhoneNumber,
    changeConsentAgree,
    changeDistanceAgreement,
    validateDate,
    validatePhoneNumber,
    validateAgreementFields,
    hasBirthDateError,
    hasConsentAgreeError,
    hasPhoneNumberError,
    hasDistanceAgreementError,
  } = useSignin();

  const handleChangePhone = React.useCallback(
    (phone: string) => {
      changePhoneNumber(phone);
    },
    [changePhoneNumber],
  );

  const handleChangeBirthDate = React.useCallback(
    async (date: string) => {
      changeBirthDate(date);
      const splittedDate = date.split('.');
      const isComplete =
        splittedDate[0]?.length === 2 && splittedDate[1]?.length === 2 && splittedDate[2]?.length === 4;

      if (splittedDate.length === 3 && isComplete) {
        validateDate(date);
      }
    },
    [changeBirthDate, validateDate],
  );

  const handleValidateBirthDate = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      validateDate(values.birthDate);
    },
    [validateDate, values.birthDate],
  );

  const setConsentAgreement = React.useCallback(
    (isAgree: boolean) => {
      changeConsentAgree(isAgree);
    },
    [changeConsentAgree],
  );

  const setDistanceAgreement = React.useCallback(
    (isAgree: boolean) => {
      changeDistanceAgreement(isAgree);
    },
    [changeDistanceAgreement],
  );

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

  const birthDateBorderStyle = css([
    borderFieldStyles,
    css`
      border-color: ${hasBirthDateError ? 'var(--color-error)' : 'var(--color-border)'};
      &:focus,
      &:hover {
        border-color: ${hasBirthDateError ? 'var(--color-error)' : 'var(--color-primary)'};
      }
    `,
  ]);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isCompetelyAgree = validateAgreementFields();
      const phoneNumberFieldIsValid = await validatePhoneNumber();
      const birthDateFieldIsValid = await validateDate(values.birthDate);
      const isValid = isCompetelyAgree && phoneNumberFieldIsValid && birthDateFieldIsValid;
      if (isValid) {
        onLogin(values);
      }
      return;
    },
    [onLogin, validateAgreementFields, validateDate, validatePhoneNumber, values],
  );

  return (
    <Form onSubmit={handleSubmit}>
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
          value={values?.phoneNumber}
          placeholder="(___) ___-__-__"
          aria-label="мобильный телефон"
          tabIndex={1}
        />
        {hasPhoneNumberError ? <ErrorText>{error.phoneNumber}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="birthDay">Дата рождения</Label>
        <DatePicker
          name="birthDay"
          onChangeHandler={handleChangeBirthDate}
          value={values?.birthDate}
          locale="ru"
          inputStyles={css([birthDateStyles, birthDateBorderStyle])}
          inputProps={{'aria-label': 'дата рождения', placeholder: 'ДД.ММ.ГГГГ', tabIndex: 0}}
          calendarButtonStyles={{color: hasBirthDateError ? 'var(--color-error)' : 'var(--color-primary)'}}
          onBlur={handleValidateBirthDate}
          maxDate={date18plus()}
        />
        {hasBirthDateError ? <ErrorText>{error.birthDate}</ErrorText> : null}
      </FormField>
      <FormField css={{gridColumn: '1/3', '@media (min-width: 704px)': {maxWidth: 608}}}>
        <Checkbox
          onChangeHandler={setConsentAgreement}
          variant="primary"
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
          hasError={hasConsentAgreeError}
          checked={values.consentAgree}
        >
          <AgreementLink />
        </Checkbox>
      </FormField>
      <FormField css={{gridColumn: '1/3', '@media (min-width: 704px)': {maxWidth: 608}}}>
        <Checkbox
          onChangeHandler={setDistanceAgreement}
          variant="primary"
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
          checked={values.distanceAgreement}
          hasError={hasDistanceAgreementError}
        >
          <DistanceAgreementLink />
        </Checkbox>
      </FormField>
      <FormField css={{justifyContent: 'center'}}>
        <Button type="submit" variant="primary" css={{width: 288, height: 48, borderRadius: 28}}>
          Далее
        </Button>
      </FormField>
      <FormField css={{paddingTop: 12}}>
        <SecuritySign />
      </FormField>
    </Form>
  );
}

import React from 'react';
import {css} from '@emotion/react';
import {Input, InputNumber, Span, Checkbox, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {useCampaign} from 'utils/use-campaign';
import {onlyDigit, maxLengthString} from 'utils/string.utils';
import {SecuritySign} from 'components/lib';
import {CustomerAddress, WorkIndustryField} from './components';
import {fallbackAgreementLink} from './utils';
import {useJobinfoForm} from './use-jobinfo-form';
import {Form, innFieldStyles, fieldStyles, Label, FormField, ErrorText} from './styles';

export function JobInfoForm() {
  const {campaignParams, STAFF_CAMPAIGN} = useCampaign();
  const {anketa} = useAnketa();

  const {agreementFormLink, registrationAddress} = anketa;
  const agreementLink = agreementFormLink ? `/gateway/doc${agreementFormLink}` : fallbackAgreementLink;

  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;
  const {
    values,
    dispatch,
    handleChangeAddress,
    handleFormSubmit,
    error,
    validateRequiredField,
    validateInn,
    validateMonthlyAmount,
    formValid,
    validateLastWorkExperience
  } = useJobinfoForm(isStaff);

  const handleChangeTextField = React.useCallback(
    (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e?.currentTarget?.name;
      dispatch({type: 'CHANGE_VALUE', fieldName, payload: value});
    },
    [dispatch],
  );


  const handleChangeAgreement = React.useCallback(
    (isAgree: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'creditBureauConsentAgree', payload: isAgree});
    },
    [dispatch],
  );

  const handleChangeInn = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inn = onlyDigit(event.currentTarget.value);
      const fullInn = maxLengthString(inn, 12);

      dispatch({type: 'CHANGE_VALUE', fieldName: 'workInn', payload: fullInn});
    },
    [dispatch],
  );

  const handleBlurInn = (event: React.FocusEvent<HTMLInputElement>) => {
    validateInn();
  };

  const handleChangeIndustry = React.useCallback(
    (id: string) => dispatch({type: 'CHANGE_VALUE', fieldName: 'workIndustry', payload: id}),
    [dispatch],
  );

  const hasError = (fieldName: string) => {
    return Boolean(error[fieldName]);
  };

  const errorStyleInputNumber = (field: string) =>
    css({
      border: `1px ${hasError(field) ? 'var(--color-secondary)' : 'var(--color-border)'} solid`,
      '&:hover, &:focus': {
        borderColor: hasError(field) ? 'var(--color-secondary)' : 'var(--color-primary)',
      },
    });

  return (
    <Form onSubmit={handleFormSubmit}>
      <CustomerAddress address={registrationAddress} onChangeAddress={handleChangeAddress} />
      <FormField>
        <Label htmlFor="workInn">ИНН работодателя</Label>
        <input
          type="tel"
          css={[
            fieldStyles,
            innFieldStyles,
            errorStyleInputNumber('workInn'),
            css({
              '&::-webkit-inner-spin-button': {
                display: 'none',
              },
            }),
          ]}
          onChange={handleChangeInn}
          onBlur={handleBlurInn}
          value={values.workInn}
          id="workInn"
        />
        {hasError('workInn') ? <ErrorText>{error.workInn}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="workPlace">Место работы</Label>
        <Input
          type="text"
          name="workPlace"
          id="workPlace"
          aria-label="Место работы"
          hasError={hasError('workPlace')}
          onChangeHandler={handleChangeTextField}
          onBlurHandler={() => validateRequiredField('workPlace')}
          value={values.workPlace}
          css={[fieldStyles]}
        />
        {hasError('workPlace') ? <ErrorText>{error.workPlace}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="mainMonthlyIncomeAmount">Весь ежемесячный доход (руб)</Label>
        <InputNumber
          name="mainMonthlyIncomeAmount"
          id="mainMonthlyIncomeAmount"
          aria-label="Весь ежемесячный доход (руб)"
          onChangeHandler={handleChangeTextField}
          value={values.mainMonthlyIncomeAmount}
          css={[fieldStyles, errorStyleInputNumber('mainMonthlyIncomeAmount')]}
          onBlurHandler={validateMonthlyAmount}
        />

        {hasError('mainMonthlyIncomeAmount') ? (
          <ErrorText>{error.mainMonthlyIncomeAmount}</ErrorText>
        ) : (
          <Span css={{fontSize: 14, color: 'var(--color-text-label)', paddingTop: 8}}>
            Ваш постоянный + дополнительный доход до вычета налогов
          </Span>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="lastWorkExperienceMonths">Стаж на последнем месте (месяцев)</Label>
        <InputNumber
          name="lastWorkExperienceMonths"
          id="lastWorkExperienceMonths"
          onChangeHandler={handleChangeTextField}
          value={values.lastWorkExperienceMonths}
          aria-label="Стаж на последнем месте (месяцев)"
          css={[fieldStyles, errorStyleInputNumber('lastWorkExperienceMonths')]}
          onBlurHandler={validateLastWorkExperience}
        />
        {hasError('lastWorkExperienceMonths') ? (
          <ErrorText>{error.lastWorkExperienceMonths}</ErrorText>
        ) : null}
      </FormField>
      <WorkIndustryField
        industryId={values.workIndustry}
        onChangeIndustry={handleChangeIndustry}
        onBlurHandler={() => validateRequiredField('workIndustry')}
        hasError={hasError('workIndustry')}
        errorText={error.workIndustry}
      />
      <FormField css={{gridColumn: '1/3', '@media (min-width: 704px)': {maxWidth: 608}}}>
        <Checkbox
          variant="primary"
          onChangeHandler={handleChangeAgreement}
          checked={values.creditBureauConsentAgree}
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
        >
          <Span>
            Я даю{' '}
            <a
              css={{color: 'var(--color-primary)'}}
              href={agreementLink}
              type="download"
              rel="noopener noreferrer"
            >
              согласие Банку на запрос информации
            </a>{' '}
            в Бюро кредитных историй для оценки моей платежеспособности
          </Span>
        </Checkbox>
      </FormField>
      <FormField>
        <Button
          variant="primary"
          flat
          css={{width: 288, height: 48, borderRadius: 28}}
          type="submit"
          disabled={!formValid()}
        >
          Все данные верны
        </Button>
      </FormField>
      <FormField css={{height: 48, justifyContent: 'center'}}>
        <SecuritySign />
      </FormField>
    </Form>
  );
}

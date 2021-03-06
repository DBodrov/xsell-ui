import React from 'react';
import {css} from '@emotion/react';
import {Input, InputNumber, Span, Checkbox, Button, InputPhone} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {useCampaign} from 'utils/use-campaign';
import {onlyDigit, maxLengthString} from 'utils/string.utils';
import {SecuritySign} from 'components/lib';
import {CustomerAddress, WorkIndustryField, CollapseAgreements} from './components';
import {BKI_AGREEMENT_DEFAULT, PERSONAL_DATA_AGREEMENT} from 'utils/externals';
import {useJobinfoForm} from './use-jobinfo-form';
import {TFieldName} from './types';
import {
  Form,
  innFieldStyles,
  fieldStyles,
  Label,
  FormField,
  ErrorText,
  countryCodeStyle,
  placeholderStyles,
  additionalPhoneFieldStyles,
} from './styles';

export function JobInfoForm() {
  const {campaignParams, STAFF_CAMPAIGN} = useCampaign();
  const {anketa} = useAnketa();

  const {agreementFormLink, registrationAddress} = anketa;
  const agreementLink = agreementFormLink ? `/gateway/doc${agreementFormLink}` : BKI_AGREEMENT_DEFAULT;

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
    validateLastWorkExperience,
    validateAdditionalPhoneNumber,
  } = useJobinfoForm(isStaff);

  const handleChangeTextField = React.useCallback(
    (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e?.currentTarget?.name as TFieldName;
      dispatch({type: 'CHANGE_VALUE', fieldName, payload: value});
    },
    [dispatch],
  );

  const setCreditBureauConsentAgree = React.useCallback(
    (isAgree: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'creditBureauConsentAgree', payload: isAgree});
    },
    [dispatch],
  );

  const setNotarialRecord = React.useCallback(
    (isAgree: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'notarialRecord', payload: isAgree});
    },
    [dispatch],
  );

  const setPersonalDataProcessingConsentAgree = React.useCallback(
    (isAgree: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'personalDataProcessingConsentAgree', payload: isAgree});
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

  const handleChangePhone = React.useCallback((value?: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'additionalPhone', payload: value})
  }, [dispatch]);

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
        <Label htmlFor="workInn">?????? ????????????????????????</Label>
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
          aria-label="?????? ????????????????????????"
        />
        {hasError('workInn') ? <ErrorText>{error.workInn}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="workPlace">?????????? ????????????</Label>
        <Input
          type="text"
          name="workPlace"
          id="workPlace"
          aria-label="?????????? ????????????"
          hasError={hasError('workPlace')}
          onChangeHandler={handleChangeTextField}
          onBlurHandler={() => validateRequiredField('workPlace')}
          value={values.workPlace}
          css={[fieldStyles]}
        />
        {hasError('workPlace') ? <ErrorText>{error.workPlace}</ErrorText> : null}
      </FormField>
      <FormField>
        <Label htmlFor="mainMonthlyIncomeAmount">???????? ?????????????????????? ?????????? (??????)</Label>
        <InputNumber
          name="mainMonthlyIncomeAmount"
          id="mainMonthlyIncomeAmount"
          aria-label="???????? ?????????????????????? ?????????? (??????)"
          onChangeHandler={handleChangeTextField}
          value={values.mainMonthlyIncomeAmount}
          css={[fieldStyles, errorStyleInputNumber('mainMonthlyIncomeAmount')]}
          onBlurHandler={validateMonthlyAmount}
        />

        {hasError('mainMonthlyIncomeAmount') ? (
          <ErrorText>{error.mainMonthlyIncomeAmount}</ErrorText>
        ) : (
          <Span css={{fontSize: 14, color: 'var(--color-text-label)', paddingTop: 8}}>
            ?????? ???????????????????? + ???????????????????????????? ?????????? ???? ???????????? ??????????????
          </Span>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="lastWorkExperienceMonths">???????? ???? ?????????????????? ?????????? (??????????????)</Label>
        <InputNumber
          name="lastWorkExperienceMonths"
          id="lastWorkExperienceMonths"
          onChangeHandler={handleChangeTextField}
          value={values.lastWorkExperienceMonths}
          aria-label="???????? ???? ?????????????????? ?????????? (??????????????)"
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
      <FormField>
        <Label htmlFor="additionalPhone">???????????????????????????? ??????????????</Label>
        <InputPhone
          countryCode="+7"
          mask="(999) 999-99-99"
          name="phoneNumber"
          onChange={handleChangePhone}
          onBlur={validateAdditionalPhoneNumber}
          css={[additionalPhoneFieldStyles, errorStyleInputNumber('additionalPhone'), placeholderStyles]}
          countryCodeCSS={countryCodeStyle}
          id="additionalPhone"
          value={values?.additionalPhone}
          placeholder="(___) ___-__-__"
          aria-label="???????????????????????????? ?????????????????? ??????????????"
        />
        {hasError('additionalPhone') ? <ErrorText>{error.additionalPhone}</ErrorText> : null}
      </FormField>
      <FormField css={{gridColumn: '1/3', '@media (min-width: 704px)': {maxWidth: 608}}}>
        <Checkbox
          onChangeHandler={setCreditBureauConsentAgree}
          id="creditBureauConsentAgree"
          checked={values.creditBureauConsentAgree}
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
        >
          <div>
            ?? ?????? ???????????????? ????{' '}
            <a
              href={PERSONAL_DATA_AGREEMENT}
              target="_blank"
              rel="noopener noreferrer"
              css={{color: 'var(--color-primary)'}}
            >
              ?????????????????? ???????????? ???????? ???????????????????????? ????????????
            </a>
            ?? ?????????? ???????????????????????? ???????????????????? ?????????????????? ??{' '}
            <a
              href={agreementLink}
              target="_blank"
              rel="noopener noreferrer"
              css={{color: 'var(--color-primary)'}}
            >
              ???? ???????????? ????????????????????
            </a>
            ?? ???????? ?????????????????? ?????????????? ?????? ???????????? ???????? ????????????????????????????????????
          </div>
        </Checkbox>
        <CollapseAgreements
          collectionSetted={values.personalDataProcessingConsentAgree}
          notarialSetted={values.notarialRecord}
          setCollection={setPersonalDataProcessingConsentAgree}
          setNotarial={setNotarialRecord}
        />
      </FormField>
      <FormField>
        <Button
          variant="primary"
          flat
          css={{width: 288, height: 48, borderRadius: 28}}
          type="submit"
          disabled={!formValid()}
        >
          ?????? ???????????? ??????????
        </Button>
      </FormField>
      <FormField css={{height: 48, justifyContent: 'center'}}>
        <SecuritySign />
      </FormField>
    </Form>
  );
}

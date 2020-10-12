import React, {useEffect, useCallback, useReducer} from 'react';
import cN from 'classnames/bind';
import {Card} from 'components/Card';
import {BasicButton} from 'lib/components/buttons';
import {Range} from 'lib/components/data-entry/Range';
import {Checkbox} from 'lib/components/data-entry/Checkbox';

import {useCampaign} from 'utils/use-campaign';
import {useFetch} from 'utils/use-fetch';
import {Cookies} from 'utils/cookies';
import {useAnketa} from 'context/Anketa';
import {useValidationCalc} from './validation.hook';
import {SmsInfoLink, JobInsuranceLink, LifeInsuranceLink} from './CalcLinks';
import {getRate} from './utils';
import {usePayment} from './use-payment';
import css from './CalcAmountForm.module.scss';

const cx = cN.bind(css);
const timezone = new Date().getTimezoneOffset() / -60;
let timeout: any;

export type TLoanParams = typeof defaultLoanParams;

const defaultLoanParams = {
  customerTimezoneOffset: timezone,
  requestedLoanAmount: 300000,
  requestedLoanTermMonths: 21,
  jobLossProtection: false,
  lifeAndHealthProtection: false,
  smsInforming: false,
  workExperience: undefined,
  campaignParticipant: false,
  rate: 19.9,
};

const loanParamsReducer = (s: Partial<TLoanParams>, a: Partial<TLoanParams>) => ({...s, ...a});

export function CalcAmountForm() {
  const [loanParams, setState] = useReducer(loanParamsReducer, {
    ...defaultLoanParams,
    campaignParticipant: Cookies.getCookie(Cookies.DIFFERENCE_HAVE) === 'true',
  });
  const {STAFF_CAMPAIGN, campaignParams} = useCampaign();
  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;
  const {payment, updateLoanParams} = usePayment(isStaff);
  const fetchClient = useFetch();
  const {step, updateAnketa} = useAnketa();

  const {validateLoanParam, readError, formIsValid} = useValidationCalc(isStaff);
  const maxAmount = isStaff ? 3000000 : 1000000;

  const handleSubmit: React.MouseEventHandler = useCallback(
    event => {
      event.preventDefault();
      if (formIsValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {rate, ...anketa} = loanParams;
        updateAnketa(step, anketa);
      }
    },
    [formIsValid, loanParams, step, updateAnketa],
  );

  useEffect(() => {
    const fallbackWorkExperience = () => {
      const fallbackRate = getRate(1);
      setState({workExperience: 1, rate: fallbackRate});
    };
    const getWorkExperience = async () => {
      fetchClient('/gateway/customer-profile/get-work-experience', {method: 'post'}).then(
        (data: any) => {
          const rateByExperience = getRate(data?.workExperienceMonths);
          setState({workExperience: data?.workExperienceMonths, rate: rateByExperience});
        },
        error => {
          fallbackWorkExperience();
          console.error(error.message);
        },
      );
    };
    if (isStaff && !loanParams.workExperience) {
      getWorkExperience();
    }
  }, [fetchClient, isStaff, loanParams.workExperience]);

  useEffect(() => {
    if (formIsValid) {
      timeout = window.setTimeout(() => updateLoanParams(loanParams), 300);
    }
    return () => window.clearTimeout(timeout);
  }, [formIsValid, loanParams, updateLoanParams]);

  const setAmount = useCallback(
    (value: string | number) => {
      validateLoanParam('requestedLoanAmount', Number(value));
      setState({requestedLoanAmount: Number(value)});
    },
    [validateLoanParam],
  );

  const setTerm = useCallback(
    (value: string | number) => {
      validateLoanParam('requestedLoanTermMonths', Number(value));
      setState({requestedLoanTermMonths: Number(value)});
    },
    [validateLoanParam],
  );

  const setDifferenceHave = useCallback(
    (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        campaignParticipant: value,
        lifeAndHealthProtection: value ? value : loanParams.lifeAndHealthProtection,
      });
    },
    [loanParams.lifeAndHealthProtection],
  );

  const setCheckboxes = useCallback(
    (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = event?.target?.name;

      if (fieldName === 'lifeAndHealthProtection' && value === false) {
        setDifferenceHave(false);
      }
      setState({[fieldName]: value});
    },
    [setDifferenceHave],
  );

  const amountError = readError('requestedLoanAmount');
  const termError = readError('requestedLoanTermMonths');

  return (
    <div className={css.Form}>
      <div className={css.Pad}>
        <div className={cx(css.FormField)}>
          <label className={css.Label} htmlFor="requestedLoanAmount">
            <span className={css.caption}>Желаемая сумма</span>
            <Range
              data-testid="sum-input"
              name="requestedLoanAmount"
              rangeType="currency"
              currency="RUB"
              onChangeHandler={setAmount}
              value={loanParams.requestedLoanAmount}
              minText="30 000"
              maxText={maxAmount.toLocaleString('ru')}
              min={30000}
              max={maxAmount}
              step={1000}
              hasError={amountError?.length > 0}
            />
            {amountError?.length > 0 && <span className={css.ErrorText}>{amountError}</span>}
          </label>
        </div>
        <div className={cx(css.FormField)}>
          <label className={css.Label} htmlFor="requestedLoanTermMonths">
            <span className={css.caption}>Срок кредита</span>
            <Range
              data-testid="sum-input"
              name="requestedLoanTermMonths"
              rangeType="numeric"
              caption="мес."
              onChangeHandler={setTerm}
              value={loanParams.requestedLoanTermMonths}
              minText="12 месяцев"
              maxText="60 месяцев"
              min={12}
              max={60}
              step={12}
              hasError={termError?.length > 0}
            />
            {termError?.length > 0 && <span className={css.ErrorText}>{termError}</span>}
          </label>
        </div>
      </div>

      <svg
        className={css.Triangle}
        shapeRendering="geometricPrecision"
        preserveAspectRatio="none"
        viewBox="0 0 100 50"
      >
        <path d="M 0 50 L 50 0 L 100 50" />
      </svg>
      <div className={css.TermsForm}>
        <Card className={css.Terms}>
          <div className={css.TermsBlock}>{isStaff ? 'КРЕДИТ ДЛЯ СОТРУДНИКОВ' : 'УСЛОВИЯ КРЕДИТА'}</div>

          <div className={cx(css.TermsBlock, css.Payments)}>
            <div className={css.PaymentItem}>
              <span className={css.PaymentTitle}>Ежемесячный платёж</span>
              <span className={css.PaymentValue}>
                {Number((payment || 0).toFixed(0)).toLocaleString('ru')} ₽
              </span>
            </div>
            <div className={css.PaymentItem}>
              <span className={css.PaymentTitle}>Cтавка по кредиту*</span>
              <span className={css.PaymentValue}>{loanParams.rate} %</span>
            </div>
            {isStaff && (
              <div className={css.PaymentItem}>
                <span className={css.PaymentTitle}>Непрерывный стаж***</span>
                <span className={css.PaymentValue}>{loanParams.workExperience} мес.</span>
              </div>
            )}
          </div>

          <Card.Body className={cx(css.Pad, css.Checkboxes)}>
            <div className={css.CheckboxesItem}>
              <Checkbox
                name="smsInforming"
                onChangeHandler={setCheckboxes}
                checked={loanParams.smsInforming}
              />
              <SmsInfoLink htmlFor="smsInforming" />
            </div>

            <div className={css.CheckboxesItem}>
              <Checkbox
                name="jobLossProtection"
                onChangeHandler={setCheckboxes}
                checked={loanParams.jobLossProtection}
              />
              <JobInsuranceLink htmlFor="jobLossProtection" />
            </div>

            <div className={css.CheckboxesItem}>
              <Checkbox
                name="lifeAndHealthProtection"
                onChangeHandler={setCheckboxes}
                checked={loanParams.lifeAndHealthProtection}
              />
              <LifeInsuranceLink htmlFor="lifeAndHealthProtection" />
            </div>
            <div className={css.CheckboxesItem}>
              <Checkbox
                name="campaignParticipant"
                onChangeHandler={setDifferenceHave}
                checked={loanParams.campaignParticipant}
              />
              <label htmlFor="campaignParticipant">
                <strong>Акция "Разница есть" **</strong>
              </label>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className={css.Pad}>
        <BasicButton
          className={css.SaveButton}
          onClick={handleSubmit}
          data-testid="submit-btn"
          type="button"
          theme="primary"
          value="Далее"
          disabled={!formIsValid}
        />
        <p className={css.Disclaimer} style={{marginBottom: 0}}>
          * Расчет носит предварительный характер. Точная сумма ежемесячного платежа будет определена Банком
          по результатам рассмотрения заявки
        </p>
        <p className={css.Disclaimer} style={{marginBottom: 0}}>
          ** После выполнения{' '}
          <a
            css={{color: 'var(--color-primary)'}}
            href="https://www.otpbank.ru/retail/credits/difference/"
            target="_blank"
            rel="noopener noreferrer"
          >
            условий
          </a>
          , в конце срока кредита мы пересчитаем его проценты по ставке 8,5%, и вернем переплату на ваш счет
        </p>

        {isStaff && (
          <p className={css.Disclaimer}>
            *** Перевод внутри организации через увольнение разрывает непрерывный трудовой стаж.
          </p>
        )}
      </div>
    </div>
  );
}

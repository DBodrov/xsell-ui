import React from 'react';
import {Span, Checkbox, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {Form, Label, FormField, H2, SecuritySign, LinkButton} from 'components/lib';
import {useCampaign} from 'utils/use-campaign';
import {DIFFERENCE_HAVE_RULES} from 'utils/externals';
import {Range} from './components/Range';
import {AdditionsModal} from './components/AdditionsModal';
import {useCalcClient} from './use-calc-client';
import {usePayment} from './use-payment';
import {TAdditionsModalType} from './types';
import {MinmaxText, ConditionsCard, List, ListItem} from './styles';

export function CalculatorForm() {
  const {STAFF_CAMPAIGN, FAP_CAMPAIGN, campaignParams} = useCampaign();
  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;
  const isFap = campaignParams?.campaignName === FAP_CAMPAIGN;
  const {step, updateAnketa} = useAnketa();
  const timer = React.useRef(null);

  const {
    getWorkExperience,
    values,
    dispatch,
    validateLoanAmount,
    validateLoanTerm,
    error,
    validateAllFields,
    getCalculatorParams,
    calculatorParams,
  } = useCalcClient(campaignParams?.campaignName);
  const {payment, updateLoanParams} = usePayment(isStaff);
  const showDifferenceHave = !isStaff || (isStaff && values?.workExperience < 25);

  const [modalState, setModalState] = React.useState({modalType: '', modalTitle: '', isOpen: false});
  const [takeMore, setTakeMore] = React.useState({isShowMore: false, takeAmount: undefined});

  const takeMoreMoney = React.useCallback((current: number) => {
    const takeAmount = 400000 - current;
    setTakeMore(s => ({...s, isShowMore: true, takeAmount}));
  }, []);

  const resetTakeMoreMoney = React.useCallback(() => {
    setTakeMore(s => ({...s, isShowMore: false, takeAmount: undefined}));
  }, []);

  const handleFapPromoRate = React.useCallback(
    (amount: number) => {
      if (amount < 400000) {
        takeMoreMoney(amount);
      } else {
        resetTakeMoreMoney();
      }
    },
    [resetTakeMoreMoney, takeMoreMoney],
  );

  const handleChangeAmount = React.useCallback(
    (amount: number) => {
      if (isFap) {
        handleFapPromoRate(amount);
      }
      dispatch({type: 'CHANGE_VALUE', fieldName: 'requestedLoanAmount', payload: amount});
    },
    [dispatch, handleFapPromoRate, isFap],
  );

  const handleChangeTerm = React.useCallback(
    (term: number) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'requestedLoanTermMonths', payload: term});
    },
    [dispatch],
  );

  const handleSetCheck = React.useCallback(
    (field: string, isChecked: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: field, payload: isChecked});
      if (field === 'lifeAndHealthProtection' && isChecked === false) {
        dispatch({type: 'CHANGE_VALUE', fieldName: 'campaignParticipant', payload: false});
      }
    },
    [dispatch],
  );

  const handleSetDifferenceHave = React.useCallback(
    (isChecked: boolean) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'campaignParticipant', payload: isChecked});
      if (isChecked) {
        handleSetCheck('lifeAndHealthProtection', true);
      }
    },
    [dispatch, handleSetCheck],
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formIsValid = (await validateAllFields()).every(Boolean);
      if (formIsValid) {
        const loanParams = {
          ...values,
          rate: payment.rate,
        };
        updateAnketa(step, loanParams);
      }
    },
    [payment?.rate, step, updateAnketa, validateAllFields, values],
  );

  const handleOpenModal = React.useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const modalTitle = e.currentTarget.textContent;
    const modalType = e.currentTarget.dataset.modal;
    setModalState(s => ({...s, modalTitle, modalType, isOpen: true}));
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModalState(s => ({...s, modalTitle: '', modalType: '', isOpen: false}));
  }, []);

  React.useEffect(() => {
    if (isStaff && !values.workExperience) {
      getWorkExperience();
    }
  }, [getWorkExperience, isStaff, values.workExperience]);

  React.useEffect(() => {
    timer.current = window.setTimeout(async () => {
      const formIsValid = (await validateAllFields()).every(Boolean);
      if (formIsValid) {
        updateLoanParams(values);
      }
    }, 300);

    return () => window.clearTimeout(timer.current);
  }, [updateLoanParams, validateAllFields, values]);

  React.useEffect(() => {
    if (!calculatorParams) {
      getCalculatorParams();
    }
  }, [calculatorParams, getCalculatorParams]);

  const hasError = (fieldName: string) => {
    return Boolean(error[fieldName]);
  };

  const readPayment = React.useCallback(
    (modalType: string): number => {
      if (payment) {
        const payments = {
          smsService: payment.monthlySmsPayment,
          diffHave: payment.monthlyCampaignPayment,
          job: payment.monthlyJobLossProtectionPayment,
          life: payment.monthlyLifeAndHealthProtectionPayment,
        };
        return payments[modalType];
      }
    },
    [payment],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <div css={{width: '100%'}}>
        <FormField css={{height: isFap ? '9rem' : 'auto'}}>
          <Label>Желаемая сумма кредита</Label>
          <Range
            showCurrency
            value={values.requestedLoanAmount}
            min={calculatorParams?.minLoanAmount}
            step={1000}
            max={calculatorParams?.maxLoanAmount}
            onChange={handleChangeAmount}
            onBlur={() => validateLoanAmount(values?.requestedLoanAmount)}
            formatter={val => val.toLocaleString('ru')}
            aria-label="Желаемая сумма кредита"
            hasError={hasError('requestedLoanAmount')}
          />
          {hasError('requestedLoanAmount') ? (
            <span css={{fontSize: 14, color: 'var(--color-error)', paddingTop: 4}} role="alert">
              {error['requestedLoanAmount']}
            </span>
          ) : (
            <MinmaxText>
              <span>{`от ${calculatorParams?.minLoanAmount.toLocaleString('ru')}`}</span>
              <span>{`до ${calculatorParams?.maxLoanAmount.toLocaleString('ru')}`}</span>
            </MinmaxText>
          )}
          {takeMore.isShowMore ? (
            <span
              css={{fontSize: '0.875rem', color: 'var(--color-text)', paddingTop: '4px'}}
            >{`Если вы возьмете кредит на ${takeMore.takeAmount.toLocaleString(
              'ru',
            )} рублей больше, то ставка будет ниже`}</span>
          ) : null}
        </FormField>
        <FormField>
          <Label>Cрок кредита</Label>
          <Range
            value={values.requestedLoanTermMonths}
            min={calculatorParams?.minLoanTermMonths}
            step={12}
            max={calculatorParams?.maxLoanTermMonths}
            onChange={handleChangeTerm}
            onBlur={() => validateLoanTerm(values?.requestedLoanTermMonths)}
            aria-label="Cрок кредита"
            hasError={hasError('requestedLoanTermMonths')}
          />
          {hasError('requestedLoanTermMonths') ? (
            <span css={{fontSize: 14, color: 'var(--color-error)', paddingTop: 4}} role="alert">
              {error.requestedLoanTermMonths}
            </span>
          ) : (
            <MinmaxText>
              <span>{`${calculatorParams?.minLoanTermMonths} мес.`}</span>
              <span>{`${calculatorParams?.maxLoanTermMonths} мес.`}</span>
            </MinmaxText>
          )}
        </FormField>
      </div>
      <ConditionsCard>
        <H2 css={{marginBottom: '1rem'}}>Условия кредита</H2>
        <List>
          <ListItem>
            <Span css={{width: '50%', fontSize: 16, fontWeight: 600, color: '#939393'}}>
              Ежемесячный платеж
            </Span>
            <H2
              css={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '50%',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                color: 'var(--color-primary)',
              }}
            >
              {Number((payment?.monthlyPayment ?? 0).toFixed(0)).toLocaleString('ru')} ₽
            </H2>
          </ListItem>
          <ListItem>
            <Span css={{width: '50%', fontSize: 16, fontWeight: 600, color: '#939393'}}>
              Ставка по кредиту *
            </Span>
            <H2
              css={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '50%',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                color: 'var(--color-primary)',
              }}
            >
              {payment?.rate} %
            </H2>
          </ListItem>
          {isStaff ? (
            <ListItem>
              <Span css={{width: '50%', fontSize: 16, fontWeight: 600, color: '#939393'}}>
                Непрерывный стаж ***
              </Span>
              <H2
                css={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '50%',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  color: 'var(--color-primary)',
                }}
              >
                {values.workExperience} мес.
              </H2>
            </ListItem>
          ) : null}
        </List>
        <List>
          <ListItem>
            <Checkbox
              width="24px"
              height="24px"
              boxStyles={{borderRadius: '8px'}}
              onChangeHandler={checked => handleSetCheck('smsInforming', checked)}
              checked={values.smsInforming}
            >
              <LinkButton
                data-modal="smsService"
                css={{color: 'var(--color-primary)', fontSize: 16}}
                onClick={handleOpenModal}
              >
                SMS информирование
              </LinkButton>
            </Checkbox>
          </ListItem>
          <ListItem>
            <Checkbox
              width="24px"
              height="24px"
              boxStyles={{borderRadius: '8px'}}
              onChangeHandler={checked => handleSetCheck('jobLossProtection', checked)}
              checked={values.jobLossProtection}
            >
              <LinkButton
                data-modal="job"
                css={{color: 'var(--color-primary)', fontSize: 16}}
                onClick={handleOpenModal}
              >
                Защита от потери работы
              </LinkButton>
            </Checkbox>
          </ListItem>
          <ListItem>
            <Checkbox
              width="24px"
              height="24px"
              boxStyles={{borderRadius: '8px'}}
              onChangeHandler={checked => handleSetCheck('lifeAndHealthProtection', checked)}
              checked={values.lifeAndHealthProtection}
            >
              <LinkButton
                data-modal="life"
                css={{color: 'var(--color-primary)', fontSize: 16}}
                onClick={handleOpenModal}
              >
                Защита жизни и здоровья
              </LinkButton>
            </Checkbox>
          </ListItem>
          {showDifferenceHave ? (
            <ListItem>
              <Checkbox
                width="24px"
                height="24px"
                boxStyles={{borderRadius: '8px'}}
                onChangeHandler={handleSetDifferenceHave}
                checked={values.campaignParticipant}
              >
                <LinkButton
                  data-modal="diffHave"
                  css={{color: 'var(--color-primary)', fontSize: 16}}
                  onClick={handleOpenModal}
                >
                  Акция "Разница есть"
                </LinkButton>
              </Checkbox>
            </ListItem>
          ) : null}
        </List>
      </ConditionsCard>
      <FormField>
        <Button variant="primary" flat css={{width: 288, height: 48, borderRadius: 28}} type="submit">
          Все данные верны
        </Button>
      </FormField>
      <FormField css={{height: 48, justifyContent: 'center'}}>
        <SecuritySign />
      </FormField>
      <FormField css={{gridColumn: '1/3', '@media (min-width: 704px)': {maxWidth: 608}}}>
        <span>
          * Расчет носит предварительный характер. Точная сумма ежемесячного платежа будет определена Банком
          по результатам рассмотрения заявки
        </span>
        <span css={{paddingTop: 8}}>
          ** После выполнения{' '}
          <a
            href={DIFFERENCE_HAVE_RULES}
            target="_blank"
            rel="noopener noreferrer"
            css={{color: 'var(--color-primary)'}}
          >
            условий
          </a>
          , в конце срока кредита мы пересчитаем его проценты по ставке 8,5%, и вернем переплату на ваш счет
        </span>
        {isStaff ? (
          <span css={{paddingTop: 8}}>
            *** Перевод внутри организации через увольнение разрывает непрерывный трудовой стаж
          </span>
        ) : null}
      </FormField>
      <AdditionsModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        modalTitle={modalState.modalTitle}
        modalType={modalState.modalType as TAdditionsModalType}
        payment={readPayment(modalState.modalType)}
      />
    </Form>
  );
}

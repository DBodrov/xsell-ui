import React from 'react';
import {Span, Checkbox, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {Form, Label, FormField, H2, SecuritySign} from 'components/lib';
import {useCampaign} from 'utils/use-campaign';
import {INSURANCE_DOCS, DIFFERENCE_HAVE_RULES} from 'utils/externals';
import {Range} from './components/Range';
import {useCalcClient} from './use-calc-client';
import {usePayment} from './use-payment';
import {MinmaxText, ConditionsCard, List, ListItem} from './styles';

export function CalculatorForm() {
  const {STAFF_CAMPAIGN, campaignParams} = useCampaign();
  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;
  const {step, updateAnketa} = useAnketa();
  const maxAmount = isStaff ? 3000000 : 1000000;

  const {
    getWorkExperience,
    values,
    dispatch,
    validateLoanAmount,
    validateLoanTerm,
    error,
    validateAllFields,
  } = useCalcClient(maxAmount);
  const {payment, updateLoanParams} = usePayment(isStaff);
  const showDifferenceHave = !isStaff || (isStaff && values?.workExperience < 25);

  const handleChangeAmount = React.useCallback(
    (amount: number) => {
      dispatch({type: 'CHANGE_VALUE', fieldName: 'requestedLoanAmount', payload: amount});
    },
    [dispatch],
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
        updateAnketa(step, values);
      }
    },
    [step, updateAnketa, validateAllFields, values],
  );

  React.useEffect(() => {
    if (isStaff && !values.workExperience) {
      getWorkExperience();
    }
  }, [getWorkExperience, isStaff, updateLoanParams, validateAllFields, values, values.workExperience]);

  React.useEffect(() => {
    const timer = window.setTimeout(async () => {
      const formIsValid = (await validateAllFields()).every(Boolean);
      if (formIsValid) {
        updateLoanParams(values);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [updateLoanParams, validateAllFields, values]);

  const hasError = (fieldName: string) => {
    return Boolean(error[fieldName]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div css={{width: '100%'}}>
        <FormField>
          <Label>Желаемая сумма кредита</Label>
          <Range
            showCurrency
            value={values.requestedLoanAmount}
            min={30000}
            step={1000}
            max={maxAmount}
            onChange={handleChangeAmount}
            onBlur={() => validateLoanAmount(values?.requestedLoanAmount)}
            formatter={val => val.toLocaleString('ru')}
            aria-label="Желаемая сумма кредита"
            hasError={hasError('requestedLoanAmount')}
          />
          {hasError('requestedLoanAmount') ? (
            <span css={{fontSize: 14, color: 'var(--color-error)', paddingTop: 4}}>
              {error['requestedLoanAmount']}
            </span>
          ) : (
            <MinmaxText>
              <span>от 30 000</span>
              <span>{`до ${maxAmount.toLocaleString('ru')}`}</span>
            </MinmaxText>
          )}
        </FormField>
        <FormField>
          <Label>Cрок кредита</Label>
          <Range
            value={values.requestedLoanTermMonths}
            min={values.campaignParticipant ? 24 : 12}
            step={12}
            max={60}
            onChange={handleChangeTerm}
            onBlur={() => validateLoanTerm(values?.requestedLoanTermMonths)}
            aria-label="Cрок кредита"
            hasError={hasError('requestedLoanTermMonths')}
          />
          {hasError('requestedLoanTermMonths') ? (
            <span css={{fontSize: 14, color: 'var(--color-error)', paddingTop: 4}}>
              {error.requestedLoanTermMonths}
            </span>
          ) : (
            <MinmaxText>
              <span>{`${values.campaignParticipant ? '24 мес.' : '12 мес.'}`}</span>
              <span>60 мес.</span>
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
              {Number((payment || 0).toFixed(0)).toLocaleString('ru')} ₽
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
              {values.rate} %
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
              <a
                href={INSURANCE_DOCS.smsService}
                target="_blank"
                rel="noopener noreferrer"
                css={{color: 'var(--color-primary)'}}
              >
                SMS информирование
              </a>
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
              <a
                href={INSURANCE_DOCS.job}
                target="_blank"
                rel="noopener noreferrer"
                css={{color: 'var(--color-primary)'}}
              >
                Защита от потери работы
              </a>
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
              <a
                href={INSURANCE_DOCS.life}
                target="_blank"
                rel="noopener noreferrer"
                css={{color: 'var(--color-primary)'}}
              >
                Защита жизни и здоровья
              </a>
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
                <a
                  href={DIFFERENCE_HAVE_RULES}
                  target="_blank"
                  rel="noopener noreferrer"
                  css={{color: 'var(--color-primary)'}}
                >
                  Акция "Разница есть"
                </a>
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
    </Form>
  );
}

import React, {useState, useCallback} from 'react';
import {Checkbox, Button} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1, H2, H3, Card, FormField, SecuritySign, Form} from 'components/lib';
import {useAnketa, IAnketa} from 'context/Anketa';

import {toRuLocalNumber, correctRusCase} from 'utils/string.utils';
import {useCampaign} from 'utils/use-campaign';
import {COMMON_RULES, DIFFERENCE_HAVE_RULES} from 'utils/externals';

import {getMonthlyPayment} from 'services/creditCalc.service';
import {CampaignVariant} from './CampaignVariant';

interface IAgreementLinkFormProps {
  agreementLink: string;
}

const AgreementLink = ({agreementLink}: IAgreementLinkFormProps) => (
  <p css={{margin: 0}}>
    Я ознакомлен{' '}
    <a
      css={{color: 'var(--color-primary)'}}
      href={agreementLink}
      type="download"
      target="_blank"
      rel="noopener noreferrer"
    >
      с условиями кредита и со всеми документами
    </a>
    {', '}а так же с{' '}
    <a
      css={{color: 'var(--color-primary)'}}
      href={COMMON_RULES}
      type="download"
      target="_blank"
      rel="noopener noreferrer"
    >
      Общими условиями
    </a>{' '}
    банковского обслуживания. Вводя код из СМС я подтверждаю выдачу мне кредита
  </p>
);

export function ResultScoringPage() {
  const [agreement, setAgreement] = useState<boolean>(false);

  const {
    step,
    anketa: {
      approvedInterestRate = 0,
      approvedLoanAmount = 0,
      approvedLoanTermMonths = 0,
      approvedMonthlyPayment = 0,
      batchDocumentLink = undefined,
      campaignParticipant,
    },
    updateAnketa,
  } = useAnketa();

  const {campaignParams, CURRENT_CAMPAIGN} = useCampaign();
  const isCampaign = campaignParams?.campaignName === CURRENT_CAMPAIGN;

  const resultScoring: Partial<IAnketa> = {
    approvedInterestRate,
    approvedLoanAmount,
    approvedLoanTermMonths,
    approvedMonthlyPayment,
    campaignParticipant,
  };

  const monthlyPayment =
    getMonthlyPayment(approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount) || 0;

  const fullAmount = monthlyPayment * approvedLoanTermMonths || 0;

  const onSignCredit = useCallback(() => updateAnketa(step, {flag: agreement}), [
    agreement,
    step,
    updateAnketa,
  ]);

  return (
    <AppPage>
      <Screen>
        <H1 css={{marginBottom: 24}}>Заявка одобрена на {toRuLocalNumber(approvedLoanAmount)} рублей</H1>
        <span>Для получения кредита подпишите пакет документов кодом из СМС</span>
        <Card css={{padding: 24, marginBottom: '1rem'}}>
          <H2>Условия кредита</H2>
          <CampaignVariant.Payment anketa={resultScoring} />
          <H3>Подробнее</H3>
          <ul css={{listStyle: 'none', padding: 0, margin: 0, color: '#000'}}>
            <li css={{lineHeight: '24px'}}>Полная сумма: {toRuLocalNumber(fullAmount)} руб.</li>
            <li css={{lineHeight: '24px'}}>Ставка: {approvedInterestRate}% годовых</li>
            <li css={{lineHeight: '24px'}}>
              Срок: <strong>{approvedLoanTermMonths}</strong>{' '}
              {correctRusCase(approvedLoanTermMonths, 'месяц', 'месяца', 'месяцев')}
            </li>
            {campaignParticipant ? (
              <li css={{lineHeight: '24px'}}>
                <span>Ставка при выполнении условий акции**: 8,5%</span>
              </li>
            ) : null}
          </ul>
        </Card>
        <Form>
          <FormField css={{gridColumn: '1/3', marginBottom: 0, '@media (min-width: 704px)': {maxWidth: 608}}}>
            <Checkbox
              boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
              onChangeHandler={setAgreement}
              id="agreement"
              checked={agreement}
            >
              <AgreementLink agreementLink={`/gateway/doc${batchDocumentLink}`} />
            </Checkbox>
          </FormField>
          <FormField css={{gridColumn: '1/3', marginBottom: 0, '@media (min-width: 704px)': {maxWidth: 608}}}>
            {isCampaign ? (
              <p css={{fontSize: 12}}>
                * Сегодня, при оформлении онлайн, для вас действует сниженная ставка. Успейте получить кредит
                на выгодных условиях.
              </p>
            ) : null}
            {campaignParticipant ? (
              <p css={{paddingTop: 0, fontSize: 12}}>
                ** ставка 8.5% устанавливается в рамках и при соблюдении{' '}
                <a
                  href={DIFFERENCE_HAVE_RULES}
                  css={{color: 'var(--color-primary)'}}
                  type="download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  условий
                </a>{' '}
                акции "разница есть"
              </p>
            ) : null}
          </FormField>
          <FormField>
            <Button
              css={{width: '100%'}}
              onClick={onSignCredit}
              type="button"
              variant="primary"
              flat
              disabled={!agreement}
            >
              Подписать
            </Button>
          </FormField>
          <FormField>
            <SecuritySign />
          </FormField>
        </Form>
      </Screen>
    </AppPage>
  );
}

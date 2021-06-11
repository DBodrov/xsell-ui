import React, {useState, useCallback} from 'react';
import {Checkbox, Button} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1, H2, H3, Card} from 'components/lib';
import {useAnketa, IAnketa} from 'context/Anketa';

import {toRuLocalNumber, correctRusCase} from 'utils/string.utils';
import {useCampaign} from 'utils/use-campaign';
import {COMMON_RULES} from 'utils/externals';

import {getMonthlyPayment} from 'services/creditCalc.service';


import cx from 'classnames';
import {BasicButton} from 'lib/components/buttons/BasicButton';
//import {Checkbox} from 'lib/components/data-entry/Checkbox';
import {LayoutPage} from 'components/Layout';
import {CampaignVariant} from './CampaignVariant';
import css from './ResultScoringPage.module.scss';
import {AutoStepper} from 'components/AutoStepper';

interface IAgreementLinkFormProps {
  agreementLink: string;
}
// Я ознакомлен с условиями кредита и со всеми документами, вводя код из СМС я подтверждаю выдачу мне кредита
const AgreementLink = ({agreementLink}: IAgreementLinkFormProps) => (
  <p>
    Я ознакомлен{' '}
    <a css={{color: 'var(--color-primary)'}} href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
      с условиями кредита и со всеми документами
    </a>
    {', '}
    а так же с {' '}
    <a css={{color: 'var(--color-primary)'}} href={COMMON_RULES} type="download" target="_blank" rel="noopener noreferrer">Общими условиями</a>
    {' '}
    банковского обслуживания.
    Вводя код из СМС я подтверждаю выдачу мне кредита
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
        <H1 css={{marginBottom: 24}}>
          Заявка одобрена на{' '}
          {toRuLocalNumber(approvedLoanAmount)} рублей
        </H1>
        <span>Для получения кредита подпишите пакет документов кодом из СМС</span>
        <Card css={{padding: 24}}>
          <H2>Условия кредита</H2>
          <CampaignVariant.Payment anketa={resultScoring} />
          <H3>Подробнее</H3>

          <ul css={{listStyle: 'none', padding: 0, margin: 0, color: '#000'}}>
            <li>
              Полная сумма:{' '} {toRuLocalNumber(fullAmount)} руб.
            </li>
            <li>
              Ставка:{' '} {approvedInterestRate}% годовых
            </li>
            {/* <li>
              <CampaignVariant.Rate anketa={resultScoring} />
            </li> */}
            <li>
              Срок: <strong>{approvedLoanTermMonths}</strong>{' '}
              {correctRusCase(approvedLoanTermMonths, 'месяц', 'месяца', 'месяцев')}
            </li>
          </ul>
        </Card>
        <div className={css.FormFields}>
          <div className={cx(css.Checkbox, css.FormField)}>
            <Checkbox
              className={css.FormField}
              onChangeHandler={setAgreement}
              name="agreement"
              checked={agreement}
            />
            <AgreementLink agreementLink={`/gateway/doc${batchDocumentLink}`} />
          </div>
          <BasicButton
            className={css.FormButton}
            onClick={onSignCredit}
            type="button"
            theme="primary"
            flat
            value="Подписать"
            disabled={!agreement}
          />
          {isCampaign ? (
            <p className={css.TextWithStar}>
              * Сегодня, при оформлении онлайн, для вас действует сниженная ставка. Успейте получить кредит на
              выгодных условиях.
            </p>
          ) : null}
          {campaignParticipant ? (
            <p className={css.TextWithStar} css={{paddingTop: 0}}>
              ** ставка 8.5% устанавливается в рамках и при соблюдении{' '}
              <a
                href="https://cash.otpbank.ru/public/rule.pdf"
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
          <span css={{color: 'var(--color-text-label)', paddingTop: 8}}>
            В случае неизменности данных, предоставленных заемщиком при подаче заявки на кредит, положительное
            решение по заявке действует в течении пяти рабочих дней с даты первичного предоставления Заемщику
            документов по одобренному кредиту на ознакомление
          </span>
        </div>
      </Screen>
    </AppPage>
  );
}

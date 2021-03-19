import React, {useState, useCallback} from 'react';
import cx from 'classnames';
import {useAnketa, IAnketa} from 'context/Anketa';
import {BasicButton} from 'lib/components/buttons/BasicButton';
import {Checkbox} from 'lib/components/data-entry/Checkbox';
import {LayoutPage} from 'components/Layout';
import {getMonthlyPayment} from 'services/creditCalc.service';
import {toRuLocalNumber, correctRusCase} from 'utils/string.utils';
import {useCampaign} from 'utils/use-campaign';
import {COMMON_RULES} from 'utils/externals';
import {CampaignVariant} from './CampaignVariant';
import css from './ResultScoringPage.module.scss';
import {AutoStepper} from 'components/AutoStepper';

interface IAgreementLinkFormProps {
  agreementLink: string;
}
// Я ознакомлен с условиями кредита и со всеми документами, а так же с Общими условиями банковского обслуживания. Вводя код из СМС я подтверждаю выдачу мне кредита
const AgreementLink = ({agreementLink}: IAgreementLinkFormProps) => (
  <p>
    Я ознакомлен{' '}
    <a className="as-link" href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
      с условиями кредита и со всеми документами
    </a>
    {', '}
    а так же с {' '}
    <a className="as-link" href={COMMON_RULES} type="download" target="_blank" rel="noopener noreferrer">Общими условиями</a>
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
    <LayoutPage>
      <AutoStepper className={css.Stepper} status={step} />
      <div className={css.ResultScoringPage}>
        <h2 className={cx(css.Centering, css.FormTitle)}>
          Заявка одобрена на
          <br />
          {toRuLocalNumber(approvedLoanAmount)} рублей
        </h2>
        <div className={cx(css.Centering, css.PaymentBlock)}>
          <h3 className={cx(css.FormFields, css.FormHeader)}>Ежемесячный платёж:</h3>
          <CampaignVariant.Payment anketa={resultScoring} />

          <ul className={css.DetailsBlock}>
            <li className={css.DetailsItem}>
              Полная сумма: <strong>{toRuLocalNumber(fullAmount)}</strong> руб.
            </li>
            <li>
              <CampaignVariant.Rate anketa={resultScoring} />
            </li>
            <li>
              Срок: <strong>{approvedLoanTermMonths}</strong>{' '}
              {correctRusCase(approvedLoanTermMonths, 'месяц', 'месяца', 'месяцев')}
            </li>
          </ul>
        </div>
        <svg
          className={css.Triangle}
          shapeRendering="geometricPrecision"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path d="M 0 0 L 100 0 L 50 100" />
        </svg>
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
      </div>
    </LayoutPage>
  );
}

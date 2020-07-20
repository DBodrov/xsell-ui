import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import { useAnketa, IAnketa } from 'context/Anketa';
import { BasicButton } from 'lib/components/buttons/BasicButton';
import { Checkbox } from 'lib/components/data-entry/Checkbox';
import { LayoutPage } from 'components/Layout';
import { getMonthlyPayment } from 'services/creditCalc.service';
import { toRuLocalNumber, correctRusCase } from 'utils/string.utils';
import { CampaignVariant } from './CampaignVariant';
import css from './ResultScoringPage.module.scss';
import { AutoStepper } from 'components/AutoStepper';

interface IAgreementLinkFormProps {
  agreementLink: string;
}

const AgreementLink = ({ agreementLink }: IAgreementLinkFormProps) => (
  <p>
    Я ознакомлен{' '}
    <a className="as-link" href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
      с условиями кредита и со всеми документами
    </a>
    {', '}
    вводя код из СМС я подтверждаю выдачу мне кредита
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
    },
    updateAnketa,
  } = useAnketa();

  const resultScoring: Partial<IAnketa> = {
    approvedInterestRate,
    approvedLoanAmount,
    approvedLoanTermMonths,
    approvedMonthlyPayment,
  };

  const monthlyPayment =
    getMonthlyPayment(approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount) || 0;

  const fullAmount = monthlyPayment * approvedLoanTermMonths || 0;

  const onSignCredit = useCallback(() => updateAnketa(step, { flag: agreement }), [
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
          viewBox="0 0 100 100">
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
          <p className={css.TextWithStar}>
            * Сегодня, при оформлении онлайн, для вас действует сниженная ставка. Успейте получить кредит на
            выгодных условиях.
          </p>
        </div>
      </div>
    </LayoutPage>
  );
}

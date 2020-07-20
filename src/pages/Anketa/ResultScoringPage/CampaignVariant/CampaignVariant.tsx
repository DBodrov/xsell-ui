import React, { Fragment } from 'react';
import { IAnketa } from 'context/Anketa';
import { useCampaign } from 'utils/use-campaign';
import { toRuLocalNumber } from 'utils/string.utils';
import { calcOldPayment, calcOldRate } from './utils';
import css from './CampaignVariant.module.scss';

interface IVariantProps {
  anketa: Partial<IAnketa>;
}

function Payment({ anketa }: IVariantProps) {
  const { approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount, approvedMonthlyPayment } = anketa;
  const { campaignParams, CURRENT_CAMPAIGN } = useCampaign();
  const isCampaign = campaignParams.campaignName === CURRENT_CAMPAIGN;
  const oldPayment = calcOldPayment(approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount);

  return (
    <div className={css.PaymentAmount}>
      {isCampaign ? (
        <Fragment>
          <span className={css.OldPayment}>{toRuLocalNumber(oldPayment)}*</span>
          <span className={css.NewPayment}>{toRuLocalNumber(approvedMonthlyPayment)} руб</span>
        </Fragment>
      ) : (
        <span className={css.Payment}>{toRuLocalNumber(approvedMonthlyPayment)} руб</span>
      )}
    </div>
  );
}

function Rate({ anketa }: IVariantProps) {
  const { approvedInterestRate } = anketa;
  const { campaignParams, CURRENT_CAMPAIGN } = useCampaign();
  const isCampaign = campaignParams.campaignName === CURRENT_CAMPAIGN;
  const oldRate = calcOldRate(approvedInterestRate);
  return (
    <span className={css.Rate}>
      {isCampaign ? (
        <Fragment>
          Ставка: <span className={css.OldRate}>{oldRate.toFixed(2)}*</span>
          <span className={css.NewRate}>{approvedInterestRate}%</span> годовых
        </Fragment>
      ) : (
        <span className={css.Rate}>Ставка: {approvedInterestRate}% годовых</span>
      )}
    </span>
  );
}

export const CampaignVariant = {
  Payment,
  Rate,
};

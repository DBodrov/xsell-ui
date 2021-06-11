import React, {Fragment} from 'react';
import {H2} from 'components/lib';
import {IAnketa} from 'context/Anketa';
import {useCampaign} from 'utils/use-campaign';
import {toRuLocalNumber} from 'utils/string.utils';
import {calcOldPayment, calcOldRate} from './utils';
import {PaymentAmount} from './styles';

import css from './CampaignVariant.module.scss';

interface IVariantProps {
  anketa: Partial<IAnketa>;
}

function Payment({anketa}: IVariantProps) {
  const {approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount, approvedMonthlyPayment} = anketa;
  const {campaignParams, CURRENT_CAMPAIGN} = useCampaign();
  const isCampaign = campaignParams?.campaignName === CURRENT_CAMPAIGN;
  const oldPayment = calcOldPayment(approvedInterestRate, approvedLoanTermMonths, approvedLoanAmount);

  return (
    <PaymentAmount>
      <span css={{color: 'var(--color-text-label)', fontWeight: 'bold'}}>Ежемесячный платеж</span>
      {isCampaign ? (
        <Fragment>
          <span className={css.OldPayment}>{toRuLocalNumber(oldPayment)}*</span>
          <span className={css.NewPayment}>{toRuLocalNumber(approvedMonthlyPayment)} руб</span>
        </Fragment>
      ) : (
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
          {toRuLocalNumber(approvedMonthlyPayment)} ₽
        </H2>
      )}
    </PaymentAmount>
  );
}

function Rate({anketa}: IVariantProps) {
  const {approvedInterestRate, campaignParticipant} = anketa;
  const {campaignParams, CURRENT_CAMPAIGN} = useCampaign();
  const isCampaign = campaignParams?.campaignName === CURRENT_CAMPAIGN;
  const oldRate = calcOldRate(approvedInterestRate);

  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap'}}>
      <span className={css.Rate}>
        {isCampaign ? (
          <div>
            Ставка: <span className={css.OldRate}>{oldRate.toFixed(2)}*</span>
            <span className={css.NewRate}>{approvedInterestRate}%</span> годовых
          </div>
        ) : (
          <span css={{color: '#000', }}>Ставка: {approvedInterestRate}% годовых</span>
        )}
      </span>
      {campaignParticipant ? <span>Ставка при выполнении условий акции**: 8,5%</span> : null}
    </div>
  );
}

export const CampaignVariant = {
  Payment,
  Rate,
};

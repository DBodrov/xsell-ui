import React, {Fragment} from 'react';
import {H2} from 'components/lib';
import {IAnketa} from 'context/Anketa';
import {useCampaign} from 'utils/use-campaign';
import {toRuLocalNumber} from 'utils/string.utils';
import {calcOldPayment, calcOldRate} from './utils';
import {PaymentAmount, NewPayment, OldPayment, NewRate} from './styles';

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
          <OldPayment>{toRuLocalNumber(oldPayment)}*</OldPayment>
          <NewPayment>{toRuLocalNumber(approvedMonthlyPayment)} руб</NewPayment>
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
      <div>
        {isCampaign ? (
          <div>
            Ставка: <span css={{color: 'var(--color-text-label)', textDecoration: 'line-through'}}>{oldRate.toFixed(2)}*</span>
            <NewRate>{approvedInterestRate}%</NewRate> годовых
          </div>
        ) : (
          <span css={{color: '#000', }}>Ставка: {approvedInterestRate}% годовых</span>
        )}
      </div>
      {campaignParticipant ? <span>Ставка при выполнении условий акции**: 8,5%</span> : null}
    </div>
  );
}

export const CampaignVariant = {
  Payment,
  Rate
};

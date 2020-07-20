import { randomInteger } from 'utils/numeric.utils';
import { getMonthlyPayment } from 'services/creditCalc.service';

const cachedRate = localStorage.getItem('rate');

export const calcOldRate = (currentRate: number) => {
  if (cachedRate) {
    return Number(cachedRate);
  }
  const percent = randomInteger(4, 8);

  const increasePercent = (percent / 100) * currentRate;
  const oldRate = currentRate + increasePercent;
  localStorage.setItem('rate', String(oldRate));
  return oldRate;
};

export const calcOldPayment = (rate: number, loanTerm: number, loanAmount: number) => {
  const oldRate = calcOldRate(rate);
  return getMonthlyPayment(oldRate, loanTerm, loanAmount);
};

import { AxiosRequestConfig } from 'axios';

export const monthlyPaymentResponse = (config: AxiosRequestConfig) => {
  const {
    requestedLoanAmount,
    requestedLoanTermMonths,
    jobLossProtection,
    lifeAndHealthProtection,
    smsInforming,
  } = JSON.parse(config.data);

  const monthlyPayment =
    requestedLoanAmount / requestedLoanTermMonths +
    (jobLossProtection ? 400 : 0) +
    (lifeAndHealthProtection ? 240 : 0) +
    (smsInforming ? 49 : 0);

  return [200, { monthlyPayment }];
};

export interface ICalcData {
  requestedLoanAmount: number;
  requestedLoanTermMonths: number;
  customerTimezoneOffset: number; // Отправляем часовой пояс (+3) для мидл-офиса
  jobLossProtection?: boolean;
  lifeAndHealthProtection?: boolean;
  smsInforming?: boolean;
  workExperience?: number;
}

export type TPaymentValues = {
  allCampaignPayment: number;
  allJobLossProtectionPayment: number;
  allLifeAndHealthProtectionPayment: number;
  allSmsPayment: number;
  monthlyCampaignPayment: number;
  monthlyJobLossProtectionPayment: number;
  monthlyLifeAndHealthProtectionPayment: number;
  monthlyPayment: number;
  monthlySmsPayment: number;
  rate?: number;
};

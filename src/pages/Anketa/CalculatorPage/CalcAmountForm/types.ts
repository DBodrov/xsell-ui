export interface ICalcData {
  requestedLoanAmount: number;
  requestedLoanTermMonths: number;
  customerTimezoneOffset: number; // Отправляем часовой пояс (+3) для мидл-офиса
  jobLossProtection?: boolean;
  lifeAndHealthProtection?: boolean;
  smsInforming?: boolean;
  workExperience?: number;
}

export const anketa = {
  accountNumber: 'string',
  additionalMonthlyIncomeAmount: 0,
  additionalPhone: 'string',
  agreementFormLink: '/string',
  approvedInterestRate: 13,
  approvedLoanAmount: 100_000,
  approvedLoanTermMonths: 20,
  approvedMonthlyPayment: 10_000,
  bankIdCode: 'string',
  batchDocumentLink: '/download-document?resource=customers&storageKey=779436/documents.pdf',
  birthDate: '2020-11-27',
  campaignParticipant: false,
  dboActivated: true,
  email: 'string',
  firstName: 'string',
  jobLossProtection: true,
  lastName: 'string',
  lastWorkExperienceMonths: 0,
  lifeAndHealthProtection: true,
  mainMonthlyIncomeAmount: 0,
  middleName: 'string',
  mobilePhone: 'string',
  passportIssueAuthorityCode: 'string',
  passportIssueAuthorityName: 'string',
  passportIssueDate: '2020-11-27',
  passportNumber: 'string',
  passportSeries: 'string',
  registrationAddress: 'Финляндия, Хельсинки, улица Мира, 107',
  requestedLoanAmount: 0,
  requestedLoanTermMonths: 0,
  smsInforming: true,
  status: 'EXECUTION',
  workIndustry: 'string',
  workInn: 'string',
  workPlace: 'string',
};

export const getAnketa = (changes: Partial<typeof anketa>) => {
  const updatedAnketa = {...anketa, ...changes};
  return updatedAnketa;
}

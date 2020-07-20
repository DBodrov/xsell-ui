import { TSessionStatus } from 'typings';

const baseSession = {
  accountNumber: '190123',
  additionalMonthlyIncomeAmount: 30000,
  additionalPhone: '89993334455',
  agreementFormLink: '//agreementFormLink',
  approvedInterestRate: 19.9,
  approvedLoanAmount: 100000,
  approvedLoanTermMonths: 12,
  bankIdCode: '092193213',
  batchDocumentLink: '//batchDocumentLink',
  birthDate: '11.20.1933',
  email: 'string@mail.com',
  firstName: 'Joe',
  jobLossProtection: true,
  lastName: 'Doe',
  lastWorkExperienceMonths: 12,
  lifeAndHealthProtection: true,
  mainMonthlyIncomeAmount: 100000,
  middleName: 'Ex',
  mobilePhone: 89993332211,
  passportIssueAuthorityCode: '2233',
  passportIssueAuthorityName: 'УФМС 11 г. Москва',
  passportIssueAuthority: 'passportIssueAuthority', // depricated?
  passportIssueDate: '03.04.2011',
  passportNumber: '7878',
  passportSeries: '118205',
  registrationAddress: 'Example Reg city',
  requestedLoanAmount: 120000,
  requestedLoanTermMonths: 12,
  smsInforming: true,
  workPlace: 'workPlace',
};

export const sessionResponse = (sessionStatus: TSessionStatus | null) => {
  if (sessionStatus) {
    // Потом сделаю конкретные моки для статусов

    return {
      ...baseSession,
      status: sessionStatus,
    };
  }

  return {};
};

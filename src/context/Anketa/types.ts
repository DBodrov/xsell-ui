export interface IAnketaState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data?: {
    anketa?: Partial<IAnketa>;
    step?: TAnketaStep;
  };
}

type AnketaHandlers = {
  updateAnketa: (step?: TAnketaStep, anketa?: Partial<IAnketa> | Record<string, unknown>) => void;
  archivingAnketa: (step: TAnketaStep) => void;
  refusePhotoPassport: () => void;
  verifySignature: (step: TAnketaStep, payload: Record<string, unknown>) => void;
  fetchCustomerCards: () => void;
};

export type TAnketaContext = IAnketaState['data'] & AnketaHandlers;

export interface IAnketa {
  accountNumber: string;
  additionalMonthlyIncomeAmount: number;
  additionalPhone: string;
  agreementFormLink: string;
  approvedInterestRate: number;
  approvedLoanAmount: number;
  approvedLoanTermMonths: number;
  approvedMonthlyPayment: number;
  bankIdCode: string;
  batchDocumentLink: string;
  birthDate: string;
  email: string;
  firstName: string;
  jobLossProtection: boolean;
  lastName: string;
  lastWorkExperienceMonths: number;
  lifeAndHealthProtection: boolean;
  mainMonthlyIncomeAmount: number;
  middleName: string;
  mobilePhone: string;
  // passportIssueAuthorityCode: string;
  // passportIssueAuthorityName: string;
  // passportIssueAuthority: string; // depricated?
  // passportIssueDate: string;
  number: number; // паспорт
  series: number; // паспорт
  registrationAddress: string;
  requestedLoanAmount: number;
  requestedLoanTermMonths: number;
  smsInforming: boolean;
  workPlace: string;
  workIndustry: string;
  workInn: number;
  registrationAddressChanged: boolean;
  creditBureauConsentAgree: boolean;
  creditBureauConsentDistanceAgree: boolean;
  agreementSignatureIsVerified: boolean;
  documentsSignatureIsVerified: boolean;
  // requiredPhoto: boolean; // ad-hoc for photo a/b testing
  customerOtpCards: {
    bankCardId: string;
    bankCardNumber: string;
    cardExpirationDt: string;
  }[];
}

export type TLoanParams = { customerTimezoneOffset: number } & Pick<
  IAnketa,
  | 'requestedLoanAmount'
  | 'requestedLoanTermMonths'
  | 'jobLossProtection'
  | 'lifeAndHealthProtection'
  | 'smsInforming'
  | 'smsInforming'
>;

export type TJobInfo = Pick<
  IAnketa,
  | 'workPlace'
  | 'lastWorkExperienceMonths'
  | 'mainMonthlyIncomeAmount'
  | 'creditBureauConsentAgree'
  | 'workIndustry'
  | 'workInn'
>;

export type TContacts = Pick<
  IAnketa,
  'additionalPhone' | 'creditBureauConsentAgree' | 'creditBureauConsentDistanceAgree'
>;

export type TAccountRequisites = Pick<IAnketa, 'accountNumber' | 'bankIdCode'>;

export type TAnketaStep =
  // Необходимо ввести запрашиваемые параметры кредита(размер и срок)
  | 'LOAN_PARAMS'
  // Необходимо заполнить серию и номер паспорта
  | 'PASSPORT'
  // Необходимо подтверждение адреса регистрации, который есть у банка
  | 'REGISTRATION_ADDRESS'
  // Адрес регистрации клиента не соответствует тому, что есть у банка. Финальный статус
  | 'CHANGED_REGISTRATION_ADDRESS'
  // PHOTO
  | 'PASSPORT_PHOTO'
  // Необходимо ввести анкетные данные клиента (работа, стаж, заработная плата и тд)
  | 'DETAILS'
  // Необходимо получить код клиента из отправленного нами смс для подтверждения согласия на проверку в БКИ
  | 'AGREEMENT_SMS_CODE'
  // Выбираем способ перевода
  | 'TRANSFER_DETAILS'
  // только для фронта - отправка карты
  | 'TRANSFER_DETAILS_CARDS'
  // Необходимо заполнить реквизиты для перевода (номер счета, БИК)
  // | 'TRANSFER_CHOSEN'
  // скоринг: одобрение или нет решения
  | 'PENDING_SCORING'
  // прескоринг - ждем
  | 'PENDING_ADVANCE_SCORING'
  // прескоринг - ОТКАЗ
  | 'ADVANCE_SCORING_REFUSAL'
  // Заявка доставлена роботу. Ждем результаты скоринга.
  | 'SCORING'
  // Заявка одобрена. Показываем клиенту одобренные параметры кредита
  | 'APPROVED'
  // В получении кредита отказано
  | 'REJECTED'
  // Ожидается код, подтверждающий подпись клиента под документами на кредит
  | 'SIGNATURE_SMS_CODE'
  // Документы необходимо прикрепить к заявке в Siebel'е
  | 'PENDING_DOCUMENTS'
  // Подписанные клиентов документы на кредит обрабатываются банком (происходит авторизация договора)
  | 'EXECUTION'
  // Договор по какой-то причине не был авторизован
  | 'EXECUTION_FAILED'
  // Деньги отправлены клиенту
  | 'COMPLETED';

export type TAnketaRoutes = Record<TAnketaStep, string>;

export interface IAnketaActions {
  payload?: any;
  status?: TAnketaStep;
}

export interface IAnketaContext extends IAnketaState {
  anketaStatus: TAnketaStep;
}

export interface IAnketaUpdatersContext {
  handleUpdateAnketa: (status: TAnketaStep, anketaData: Partial<IAnketa> | any) => void;
  handleSignAgreement: (signData: TContacts) => void;
  handleVerifySignature: (code: { verificationCode: string }) => void;
  handleDocumentsSigning: (isSigned: boolean) => void;
  handleDocumentsVerifySignature: (verificationCode: { code: string }) => void;
  handleGetCustomerCards: () => void;
  handleSendCustomerCard: (cardNumber: string, cardExpirationDate: string) => void;
  handleArchivingAnketa: () => void;
  handlePhotoRefuse: () => void;
}

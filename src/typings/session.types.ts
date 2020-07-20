export interface ISession {
  accountNumber: string;
  additionalMonthlyIncomeAmount: number;
  additionalPhone: string;
  agreementFormLink: string;
  approvedInterestRate: number;
  approvedLoanAmount: number;
  approvedLoanTermMonths: number;
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
  passportIssueAuthorityCode: string;
  passportIssueAuthorityName: string;
  passportIssueAuthority: string; // depricated?
  passportIssueDate: string;
  passportNumber: string;
  passportSeries: string;
  registrationAddress: string;
  requestedLoanAmount: number;
  requestedLoanTermMonths: number;
  smsInforming: boolean;
  status: TSessionStatus;
  workPlace: string;
}

export type TSessionStatus =
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
  // PHOTO_TAKING
  | 'PHOTO_TAKING'
  // Необходимо ввести анкетные данные клиента (работа, стаж, заработная плата и тд)
  | 'DETAILS'
  // Необходимо получить согласие клиента на его проверку в БКИ
  | 'PROCESSING_AGREEMENT'
  // Необходимо получить код клиента из отправленного нами смс для подтверждения согласия на проверку в БКИ
  | 'AGREEMENT_SMS_CODE'
  // Выбираем способ перевода
  | 'TRANSFER_DETAILS'
  // Необходимо заполнить реквизиты для перевода (номер счета, БИК)
  | 'TRANSFER_CHOSEN'
  // скоринг: одобрение или нет решения
  | 'PENDING_SCORING'
  | 'PENDING_ADVANCE_SCORING'
  // скоринг - ОТКАЗ
  | 'ADVANCE_SCORING_REFUSAL'
  // Заявка доставлена роботу. Ждем результаты скоринга.
  | 'SCORING'
  // Заявка одобрена. Показываем клиенту одобренные параметры кредита
  | 'APPROVED'
  // В получении кредита отказано
  // | 'REJECTED'
  // Ожидается код, подтверждающий подпись клиента под документами на кредит
  | 'SIGNATURE_SMS_CODE'
  // Документы необходимо прикрепить к заявке в Siebel'е
  | 'PENDING_DOCUMENTS'
  // Подписанные клиентов документы на кредит обрабатываются банком (происходит авторизация договора)
  | 'EXECUTION'
  // Договор по какой-то причине не был авторизован
  // | 'EXECUTION_FAILED'
  // Деньги отправлены клиенту
  | 'COMPLETED';

export type TAnketaRoutes = Record<TSessionStatus, string>;

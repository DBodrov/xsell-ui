import { TAnketaStatus } from './types';

const BASE_URL = '/gateway/credit-application';
const PROFILE_URL = '/gateway/customer-profile';

export const anketaUpdateAPI: Partial<Record<TAnketaStatus, string>> = {
  LOAN_PARAMS: `${BASE_URL}/update-session-app-loan-params`,
  PASSPORT: `${BASE_URL}/update-session-app-passport`,
  REGISTRATION_ADDRESS: `${BASE_URL}/update-session-app-registration-address`,
  DETAILS: `${BASE_URL}/submit-form`,
  PASSPORT_PHOTO: `${BASE_URL}/update-session-app-confirm-upload-passport-photo`,
  // DETAILS: `${BASE_URL}/update-session-app-details`,
  // PROCESSING_AGREEMENT: `${BASE_URL}/sign-agreement`,
  TRANSFER_DETAILS: `${BASE_URL}/update-session-app-account-transfer-details`,
  // AGREEMENT_SMS_CODE: `/anketa/agreementsms`,
  // TRANSFER_CHOSEN: `/anketa/transferchosen`,
  // PENDING_SCORING: `/anketa/pendingscoring`,
  // PENDING_ADVANCE_SCORING: `/anketa/pendingscoring`,
  // ADVANCE_SCORING_REFUSAL: `/anketa/scoringrefusal`,
  // SCORING: `/anketa/pendingscoring`,
  // APPROVED: `/anketa/approved`,
  // SIGNATURE_SMS_CODE: `/anketa/signaturesms`,
  // PENDING_DOCUMENTS: `/anketa/pendingdocuments`,
  // EXECUTION: `/anketa/executing`,
  // COMPLETED: `/anketa/completed`,
};

export const anketaAPI = {
  GET_STATUS: `${BASE_URL}/get-session-app`,
  SIGN_AGREEMENT: `${BASE_URL}/sign-agreement`,
  VERIFY_AGREEMENT: `${BASE_URL}/verify-agreement-signature`,
  SIGN_DOCUMENTS: `${BASE_URL}/agree-to-sign-documents`,
  DOCUMENTS_VERIFY_SIGNATURE: `${BASE_URL}/verify-signature-code`,
  CARD_TRANSFER_DETAILS: `${BASE_URL}/update-session-app-card-transfer-details`,
  CUSTOMER_CARDS: `${PROFILE_URL}/get-otp-cards`,
  ARCHIVING: `${BASE_URL}/archive-app`,
  PHOTO_REFUSE: `${BASE_URL}/update-session-app-refuse-upload-passport-photo`,
};

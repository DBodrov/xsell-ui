import { onlyDigit, toISODateString } from 'utils/string.utils';
import { Cookies } from 'utils/cookies';
import { IAuth1Params } from './types';

export const prepareAuth1Args = ({
  consentAgree,
  birthDate,
  phoneNumber,
  distanceAgreement,
}: IAuth1Params): IAuth1Params => ({
  consentAgree,
  distanceAgreement,
  birthDate: toISODateString(birthDate),
  phoneNumber: onlyDigit(phoneNumber),
});

export const hasUserData = () => Cookies.getCookie('userData').length > 0;

export const phoneWasConfirmed = localStorage.getItem('phoneIsVerified') || ''; // клиент уже приходил и подтверждал телефон

export const getStoredPhone = () => localStorage.getItem('tel') || '';

export const clientIsComeback = () => hasUserData() && Boolean(getStoredPhone());

export const logoff = () => {
  localStorage.removeItem('tel');
  localStorage.removeItem('phoneIsVerified');
  Cookies.deleteCookie('userData');
};

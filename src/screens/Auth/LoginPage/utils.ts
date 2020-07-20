import { onlyDigit, toISODateString } from 'utils/string.utils';
import { IAuth1Params } from 'context/Auth';

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

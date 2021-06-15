import {Cookies} from 'utils/cookies';
import {isEmptyString} from 'utils/string.utils';

export const maskedPhoneNumber = () => {
  const storedPhone = Cookies.getCookie(Cookies.PHONE_NUMBER);
  if (isEmptyString(storedPhone)) return '';
  const part1 = storedPhone.substring(storedPhone.length - 4, storedPhone.length - 2);
  const part2 = storedPhone.substring(storedPhone.length - 2);
  return `+7 (***) ***-${part1}-${part2}`;
};

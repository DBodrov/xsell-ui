export function unmask(value: string) {
  if (!value || value.trim().length === 0) return '';
  const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
  return output;
}
//9999999999
export function mobilePhoneValidator (value: string) {
  const unmaskedValueLength = unmask(value).length;
  return unmaskedValueLength === 10;
};

export const errorValidation = {
  phoneNumber: 'Введите номер мобильного телефона',
  birthDate: {
    maxDate: 'Вам должно быть больше 18 лет',
    minDate: 'Укажите вашу реальную дату рождения',
    isDate: 'Введите дату в формате ДД.ММ.ГГГГ',
  }
}

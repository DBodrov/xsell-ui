export function unmask(value: string) {
  if (!value || value.trim().length === 0) return '';
  const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
  return output;
}
//9999999999
export function mobilePhoneValidator(value: string) {
  const unmaskedValueLength = unmask(value).length;
  if (unmaskedValueLength === 10) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: errorValidation.phoneNumber});
  }
}

export function date18plus() {
  const now = new Date();
  const initYear = now.getFullYear() - 18;
  const initMonth = now.getMonth();
  const initDay = now.getDate();
  const initDate = new Date(initYear, initMonth, initDay).toLocaleDateString('ru');
  return initDate;
};

export function isDateValidator(value: string) {
  const [day, month, year] = value.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  const monthIsValid = month > 0 && month <= 12;
  const yearFormatIsValid = String(year).length === 4;
  const result = Boolean(Number(date)) && date.getDate() === day && monthIsValid && yearFormatIsValid;
  if (result) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: errorValidation.birthDate.isDate});
  }
  // return Promise  Boolean(Number(date)) && date.getDate() === day && monthIsValid && yearFormatIsValid;
}

export function minDateValidator(value: string) {
  const [day, month, year] = value.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  const minDate = new Date(1919, 0, 1);

  if (date >= minDate) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: errorValidation.birthDate.minDate});
  }
};

export function maxDateValidator(value: string) {
  const [day, month, year] = value.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  const [maxDay, maxMonth, maxYear] = date18plus().split('.').map(Number);
  const maxDate = new Date(maxYear, maxMonth - 1, maxDay);

  if (date <= maxDate) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: errorValidation.birthDate.maxDate});
  }
};

export const errorValidation = {
  phoneNumber: 'Введите номер мобильного телефона',
  birthDate: {
    maxDate: 'Вам должно быть больше 18 лет',
    minDate: 'Укажите вашу реальную дату рождения',
    isDate: 'Введите дату в формате ДД.ММ.ГГГГ',
  },
};

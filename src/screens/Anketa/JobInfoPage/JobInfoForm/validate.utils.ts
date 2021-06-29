import {mobilePhoneValidator} from 'screens/Auth/LoginPage/SigninForm/utils';

const validationSchema = {
  workPlace: {
    isRequired: {error: 'Место работы не может быть пустым'},
  },
  workInn: {
    isRequired: {error: 'ИНН обязателен к заполнению'},
    length: {
      options: (value: string) => value?.length === 10 || value?.length === 12,
      error: 'ИНН должен быть длиной 10 или 12 цифр',
    },
  },
  workIndustry: {
    isRequired: {error: 'Выберите отрасль занятости'},
  },
  lastWorkExperienceMonths: {
    min: {options: 3, error: 'Стаж должен быть больше 3 месяцев'},
  },
  mainMonthlyIncomeAmount: {
    min: {
      options: 1000,
      error: 'Доход не может быть менее 1 000 рублей',
    },
    max: {options: 1000000, error: 'Доход не может быть более 1 000 000 рублей'},
  },
  creditBureauConsentAgree: {
    isEqual: {options: true, error: ''},
  },
};

export function requiredFieldValidator(fieldName: string, value?: string | number) {
  if (value) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: validationSchema[fieldName].isRequired.error});
  }
}

export function innLengthValidator(inn: string) {
  const result = inn.length === 10 || inn.length === 12;
  const schema = validationSchema.workInn;
  if (result) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: schema.length.error});
  }
}

export function minValueValidator(fieldName: string, value: number) {
  const schema = validationSchema[fieldName];
  const isValid = value >= schema.min.options;
  if (isValid) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: schema.min.error});
  }
}

export function maxValueValidator(fieldName: string, value: number) {
  const schema = validationSchema[fieldName];
  const isValid = value <= schema.max.options;
  if (isValid) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: schema.max.error});
  }
}

export {mobilePhoneValidator}

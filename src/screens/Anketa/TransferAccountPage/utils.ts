import {TBicSuggestion} from './types';
import {HUMAN_FACTOR_BIC_URL} from 'utils/externals';

export function validateBicLength(value: string) {
  const lengthMessage = 'БИК должен быть не менее 9 символов';
  if (!value || value.length < 9) {
    return Promise.reject({message: lengthMessage});
  }
  return Promise.resolve();
}

export function notFoundedBic(value: string, searchResult: TBicSuggestion[]) {
  if (value.length === 9 && searchResult.length === 0) {
    return Promise.reject({message: 'Банк с таким БИК не найден'});
  }
  return Promise.resolve();
}

export function validateAccountLength(value: string) {
  const lengthMessage = 'Номер счёта должен быть не менее 20 символов';
  if (!value || value.length < 20) {
    return Promise.reject({message: lengthMessage});
  }
  return Promise.resolve();
}

export function validateAccountStartWith(value: string) {
  if (value.length >= 5 && !value.startsWith('40817')) {
    return Promise.reject({message: 'Номер счета должен начинаться с 40817'});
  }
  return Promise.resolve();
}

export function validateAccountAndBic(accountNumber: string, bic: string) {
  const bicAndAccount = bic.slice(-3) + accountNumber;
  let checksum = 0;
  const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];

  for (const i in coefficients) {
    checksum += coefficients[i] * (Number(bicAndAccount[i]) % 10);
  }
  if (checksum % 10 === 0) {
    return Promise.resolve();
  }
  return Promise.reject({message: 'Проверьте правильность ввода счета и БИК или введите другой'});
}

export async function searchBank(value: string) {
  const body = JSON.stringify({query: value});
  const searchResponse = await window.fetch(HUMAN_FACTOR_BIC_URL, {method: 'post', body, headers: {'Content-Type': 'application/json'}});
  const results = await searchResponse.json();
  const suggestions: TBicSuggestion[] = results?.suggestions?.map((item: any) => {
    return {
      bic: item?.data?.bic,
      description: `${item.value ?? ''}, ${item?.data?.address?.data?.region_with_type ?? ''}`,
    };
  });
  return suggestions;
}

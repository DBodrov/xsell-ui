export const getDigitals = (val: any) => {
  if (!val) return '';
  const arr = val.match(/\d+/g);
  return arr ? arr.join('') : '';
};

export const getDigitals2 = (val: any) => {
  if (!val) return '';
  const arr = val.match(/\d+/g);
  return arr || '';
};

export const toISODateString = (date: string) => {
  if (!date) return '';
  const isoDate = date.split('.').reverse().join('-');
  return isoDate;
};

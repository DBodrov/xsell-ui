type rateOptions = {
  experience: number | number[];
  rate: number;
  operator: 'moreThan' | 'between';
};

export const experienceRateMap: rateOptions[] = [
  { experience: [60, Infinity], rate: 9, operator: 'moreThan' },
  { experience: [37, 60], rate: 10.4, operator: 'between' },
  { experience: [25, 36], rate: 11.4, operator: 'between' },
  { experience: [13, 24], rate: 12.4, operator: 'between' },
  { experience: [6, 12], rate: 15.4, operator: 'between' },
];

export function getRate(expMonth: number) {
  const filteredRate = experienceRateMap.filter((option) => {
    const min = option.experience[0];
    const max = option.experience[1];
    return expMonth >= min && expMonth <= max;
  })[0]?.rate;
  return filteredRate || 19.9;
}

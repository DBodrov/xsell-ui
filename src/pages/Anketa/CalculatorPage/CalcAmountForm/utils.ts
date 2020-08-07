type TRateOptions = {
  experience: number | number[];
  rate: number;
  operator: 'moreThan' | 'between';
};

export const experienceRateMap: TRateOptions[] = [
  {experience: [60, Infinity], rate: 8.5, operator: 'moreThan'},
  {experience: [37, 60], rate: 10.0, operator: 'between'},
  {experience: [25, 36], rate: 11.0, operator: 'between'},
  {experience: [13, 24], rate: 12.0, operator: 'between'},
  {experience: [1, 12], rate: 19.9, operator: 'between'},
];

export function getRate(expMonth: number = 13) {
  const filteredRate = experienceRateMap.filter(option => {
    console.log(expMonth);
    const min = option.experience[0];
    const max = option.experience[1];
    return expMonth >= min && expMonth <= max;
  })[0]?.rate;
  return filteredRate || 19.9;
}

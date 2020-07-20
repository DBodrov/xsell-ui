export const fromDateString = (value: string) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date;
};

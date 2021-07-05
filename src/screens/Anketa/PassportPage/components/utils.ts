export function removeMask(value: string) {
  const result = value
    .split('')
    .filter(char => {
      return char !== ' ' && isFinite(Number(char));
    })
    .join('');
  return result;
}

export function createMaskedValue(value: string, mask: string) {
  const val = value.split('');
  const result = mask
    .split('')
    .map(ch => {
      if (ch === '9' && val.length > 0) {
        return val.shift();
      } else if (val.length === 0) {
        return false;
      }
      return ch;
    })
    .filter(Boolean)
    .join('');
  return result;
}

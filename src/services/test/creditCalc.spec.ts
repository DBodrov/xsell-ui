import { getMonthlyPayment } from '../creditCalc.service';

describe('Credit Calc Service', () => {
  test('should calculate payment', () => {
    expect(getMonthlyPayment(19.9, 36, 300000)).toBe(11134);
  });
});

/**
 * @param rate Ставка / 12 / 100 | The interest rate for the loan
 * @param nper Срок (месяцы) | The total number of payments for the loan
 * @param pv Сумма кредита | The present value, or the total amount that a series of future payments is worth now; also known as the principal.
 * @param fv The future value, or a cash balance you want to attain after the last payment is made
 *
 * If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0
 * @param type The number 0 (zero) or 1 and indicates when payments are due
 *
 * Set type equal to:
 * - 0 or omitted If payments are due At the end of the period
 * - 1 If payments are due At the beginning of the period
 *
 * @returns A value.
 */

export function PMT(rate: number, nper: number, pv: number, fv = 0, type = 0): number {
  let pmt = 0;

  if (rate === 0) return -(pv + fv) / nper;

  const pvif = (1 + rate) ** nper;
  pmt = (rate * pv * (pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + rate;

  return pmt;
}

/**
 * @param rate Ставка (%)
 * @param numOfMonths Срок (месяцы)
 * @param amount Сумма кредита (Вычитаем первоначальный взнос)
 */

export function getMonthlyPayment(rate: number, numOfMonths: number, amount: number) {
  return Math.round(PMT(rate / 12 / 100, numOfMonths, amount));
}

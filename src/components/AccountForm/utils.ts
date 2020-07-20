export const validateRS = (accountNumber: string, bic: string) => {
    const bicAndAccount = bic.slice(-3) + accountNumber;
    let checksum = 0;
    const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];

    for (const i in coefficients) {
        checksum += coefficients[i] * (Number(bicAndAccount[i]) % 10);
    }
    return checksum % 10 === 0;
};

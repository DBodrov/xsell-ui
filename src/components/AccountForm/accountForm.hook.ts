import { useCallback, useState, useRef } from 'react';
import { FoundedValue } from 'lib/components/data-entry';
import { isEmptyString } from 'utils/string.utils';
import { validateRS } from './utils';

const initialFormData = {
    accountNumber: '',
    bankIdCode: { bic: '', isFound: false },
};

const fieldLengthValidation = (fieldValue: string, fieldLength: number) =>
    !isEmptyString(fieldValue) && fieldValue.length === fieldLength;
const correctBicValue = ({ bic, isFound }: FoundedValue) => bic.length === 9 && isFound;
const accountCheckSumValidation = ({ accountNumber, bankIdCode: { bic } }: typeof initialFormData) =>
    validateRS(accountNumber, bic);

export const useAccountForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({ bicError: '', accountError: '', pairError: '' });
    const [touched, setTouched] = useState({ bic: false, account: false });
    const formStatus = useRef('isDirty');

    const handleChangeField = useCallback((fieldName: string, value: any) => {
        formStatus.current = 'isDirty';
        setFormData((data) => ({ ...data, [fieldName]: value }));
    }, []);

    const validatePair = useCallback(() => {
        if (!isEmptyString(formData.accountNumber) && !accountCheckSumValidation(formData)) {
            setErrors((e) => ({
                ...e,
                pairError: 'Проверьте правильность ввода счета и БИК или введите другой',
            }));
        } else {
            setErrors((e) => ({ ...e, pairError: '' }));
        }
    }, [formData]);

    const handleValidateBic = useCallback(() => {
        setTouched((t) => ({ ...t, bic: true }));
        if (!fieldLengthValidation(formData.bankIdCode.bic, 9)) {
            setErrors((e) => ({ ...e, bicError: 'БИК должен быть не менее 9 символов' }));
        } else if (!correctBicValue(formData.bankIdCode)) {
            setErrors((e) => ({ ...e, bicError: 'Банк с таким БИК не существует' }));
        } else {
            setErrors((e) => ({ ...e, bicError: '' }));
        }

        validatePair();
    }, [formData.bankIdCode, validatePair]);

    const handleValidateAccount = useCallback(() => {
        setTouched((t) => ({ ...t, account: true }));
        if (!fieldLengthValidation(formData.accountNumber, 20)) {
            setErrors((e) => ({ ...e, accountError: 'Номер счёта должен быть не менее 20 символов' }));
        } else if (!formData.accountNumber.startsWith('40817')) {
            setErrors((e) => ({ ...e, accountError: 'Номер счета должен начинаться с 40817' }));
        } else {
            setErrors((e) => ({ ...e, accountError: '' }));
        }

        validatePair();
    }, [formData.accountNumber, validatePair]);

    return {
        formData,
        touched,
        handleChangeField,
        handleValidateAccount,
        handleValidateBic,
        errors,
        formStatus,
    };
};

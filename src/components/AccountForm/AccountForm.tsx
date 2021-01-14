import React, {useCallback} from 'react';
import {Button} from 'neutrino-ui';
import {Label, ErrorText} from 'lib/components/Forma2';
import {BicSearch, FoundedValue} from 'lib/components/data-entry';
import {MaskInput} from 'lib/components/MaskInput';
import {ACCOUNT} from 'utils/masks';
import {isEmptyString} from 'utils/string.utils';
import {InfoSection} from './InfoSection';
import {useAccountForm} from './accountForm.hook';
import {IAccountFormProps} from './types';
import css from './AccountForm.module.scss';

export function AccountForm({onUpdateAccount, onArchivingAnketa}: IAccountFormProps) {
  const {
    formData,
    handleChangeField,
    handleValidateAccount,
    handleValidateBic,
    touched,
    errors,
  } = useAccountForm();

  const handleChangeBic = useCallback(
    (value: FoundedValue) => {
      handleChangeField('bankIdCode', value);
    },
    [handleChangeField],
  );

  const handleChangeAccount = useCallback(
    (value: string) => {
      handleChangeField('accountNumber', value);
    },
    [handleChangeField],
  );

  const handleUpdateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account = {
      accountNumber: formData.accountNumber,
      bankIdCode: formData.bankIdCode.bic,
    };

    formIsValid() && onUpdateAccount(account);
  };

  const bicHasError = !isEmptyString(errors.bicError);
  const accountHasError = !isEmptyString(errors.accountError);
  const pairHasError = !isEmptyString(errors.pairError);

  const formIsValid = () => {
    const bicFieldIsValid = touched.bic && !bicHasError;
    const accountFieldIsValid = touched.account && !accountHasError;
    return bicFieldIsValid && accountFieldIsValid && !pairHasError;
  };

  return (
    <form className={css.AccountForm} onSubmit={handleUpdateAccount}>
      <div className={css.FormSection}>
        <div className={css.FormField}>
          <Label text="БИК банка" htmlFor="bankIdCode" />
          <BicSearch
            name="bankIdCode"
            onChangeHandler={handleChangeBic}
            onBlurHandler={handleValidateBic}
            autoComplete="off"
            placeholder="БИК банка"
            value={formData.bankIdCode.bic}
            hasError={bicHasError}
          />
          {bicHasError && <ErrorText errorMessage={errors.bicError} />}
        </div>
        <div className={css.FormField}>
          <Label text="ВАШ СЧЁТ" htmlFor="bankIdCode" />
          <MaskInput
            name="accountNumber"
            placeholder="Рублёвый счёт"
            autoComplete="off"
            mask={ACCOUNT}
            onChangeHandler={handleChangeAccount}
            onBlurHandler={handleValidateAccount}
            value={formData.accountNumber}
            hasError={accountHasError}
          />
          {accountHasError && <ErrorText errorMessage={errors.accountError} />}
          {!accountHasError && pairHasError && <ErrorText errorMessage={errors.pairError} />}
        </div>
      </div>
      <InfoSection />
      <div className={css.FormButtons}>
        <Button
          type="button"
          onClick={onArchivingAnketa}
          variant="primary"
          outline
          flat
          css={{
            padding: 0,
            marginBottom: '1rem',
            width: '100%',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Переоформить заявку
        </Button>
        <Button
          variant="primary"
          flat
          type="submit"
          disabled={!formIsValid()}
          css={{
            padding: 0,
            marginBottom: '1rem',
            width: '100%',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Отправить заявку
        </Button>
      </div>
    </form>
  );
}

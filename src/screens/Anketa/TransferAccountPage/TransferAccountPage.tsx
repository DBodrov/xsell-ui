import React, {useCallback} from 'react';
import {Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {AppPage, Screen} from 'components/Layout';
import {H1, H2, Form, FormField, SecuritySign} from 'components/lib';
import {AccountInput, BicSearch} from './components';
import {useAccountForm} from './useAccountForm';

export function TransferAccountPage() {
  const [wasSubmitted, setWasSubmitted] = React.useState(false);
  const {step, updateAnketa} = useAnketa();
  const {
    changeAccount,
    changeBic,
    error,
    touched,
    values,
    validateAccountName,
    setFoundedBic,
    validateBankIdCode,
    validateBeforeSubmit,
  } = useAccountForm();

  const handleSubmitAccount = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formIsValid = await validateBeforeSubmit();
      setWasSubmitted(true);
      if (formIsValid) {
        const {accountNumber, bankIdCode} = values;
        updateAnketa(step, {accountNumber, bankIdCode});
      }
    },
    [step, updateAnketa, validateBeforeSubmit, values],
  );

  const handleTouchAccount = React.useCallback(() => {
    validateAccountName();
  }, [validateAccountName]);

  const handleTouchBic = React.useCallback(() => {
    validateBankIdCode();
  }, [validateBankIdCode]);

  return (
    <AppPage>
      <Screen>
        <H1>Реквизиты для перевода</H1>
        <Form onSubmit={handleSubmitAccount}>
          <FormField>
            <div
              css={{
                backgroundColor: '#fff',
                borderRadius: 32,
                boxShadow: '0px 16px 48px rgba(73, 92, 136, 0.15)',
                padding: '32px 16px',
                margin: '14px 0',
                width: '100%',
              }}
            >
              <H2>Куда перевести?</H2>
              <AccountInput
                wasSubmitted={wasSubmitted}
                onChange={changeAccount}
                value={values.accountNumber}
                touched={touched.accountNumber}
                onTouch={handleTouchAccount}
                errorMessage={error.accountNumber}
              />
              <BicSearch
                wasSubmitted={wasSubmitted}
                searchResults={values.searchResult}
                onChange={changeBic}
                onTouch={handleTouchBic}
                onSelect={setFoundedBic}
                touched={touched.bankIdCode}
                errorMessage={error.bankIdCode}
                value={values.bankIdCode}
              />
            </div>
          </FormField>
          <FormField></FormField>
          <FormField>
            <Button
              css={{
                width: '100%',
                height: 44,
                borderRadius: 28,
                alignSelf: 'center',
                fontWeight: 700,
                fontSize: 14,
              }}
              type="submit"
              variant="primary"
              flat
            >
              Далее
            </Button>
          </FormField>
          <FormField css={{alignItems: 'center', justifyContent: 'center'}}>
            <SecuritySign />
          </FormField>
        </Form>
      </Screen>
    </AppPage>
  );
}

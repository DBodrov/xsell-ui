import React from 'react';
import { MaskInput } from 'lib/components/data-entry/MaskInput';
import { BasicButton } from 'lib/components/buttons';
import css from './PassportForm.module.scss';

interface IPassportFormProps {
  onSubmitPassport: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangePassport: (passportValue: string[]) => void;
  onArchivingAnketa: () => void;
  formIsValid: boolean;
  value: string;
  hasError: boolean;
}

export const PassportForm = ({
  formIsValid,
  value,
  onChangePassport,
  onSubmitPassport,
  onArchivingAnketa,
  hasError,
}: IPassportFormProps) => (
  <form onSubmit={onSubmitPassport} className={css.PassportForm}>
    <label htmlFor="passport" className={css.Label}>
      ПАСПОРТ, СЕРИЯ И НОМЕР
      <MaskInput
        name="passport"
        mask="9999 999999"
        data-testid="passport-input"
        placeholder="____ ______"
        onChangeHandler={onChangePassport}
        value={value}
        styles={{ marginTop: '4px' }}
        hasError={hasError}
      />
    </label>
    <p>Введите серию и номер вашего действующего паспорта</p>
    <div className={css.FormFooter}>
      <BasicButton
        type="button"
        onClick={onArchivingAnketa}
        theme="secondary"
        flat
        value="Переоформить заявку"
        className={css.FormButton}
        styles={{ marginBottom: '1rem' }}
      />
      <BasicButton
        type="submit"
        theme="primary"
        flat
        value="Отправить данные паспорта"
        disabled={!formIsValid}
        className={css.FormButton}
      />
    </div>
  </form>
);

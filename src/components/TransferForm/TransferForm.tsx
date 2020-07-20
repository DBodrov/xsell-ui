import React, { useCallback, Fragment } from 'react';
import cx from 'classnames';
import { Forma, Form, Field } from 'lib/components/Forma';
import { BasicButton } from 'lib/components/buttons';
import { ITransfer } from 'typings';
import { Card } from 'components/Card';
import { List } from 'components/List';
import MoneyAtmIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';
import InfoIcon from 'lib/ui-kit/assets/icons/otp/icon-info.svg';
import css from './TransferForm.module.scss';

export interface ITransferFormProps {
  onSave: (contacts: Partial<ITransfer>) => void;
  hasInfoBlock?: boolean;
}

const initTransferForm: ITransfer = {
  bankIdCode: '',
  accountNumber: '',
};

const schema = {
  accountNumber: { length: { params: 20, error: 'Номер счёта должен быть менее 20 символов' } },
  bankIdCode: { length: { param: 9, error: 'БИК не должен быть пустым' } },
};

const Island = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Card className={cx(css.FormCard, className)}>
    <Card.Body className={css.FormCardBody}>{children}</Card.Body>
  </Card>
);

export function TransferForm(props: ITransferFormProps) {
  const { onSave, hasInfoBlock } = props;
  const handleSaveContacts = useCallback(
    ({ accountNumber, bankIdCode }: ITransfer) => {
      onSave({
        accountNumber: String(accountNumber),
        bankIdCode: String(bankIdCode),
      });
    },
    [onSave]
  );

  const isComplete = (values: ITransfer) => {
    const { bankIdCode, accountNumber } = values;
    return bankIdCode && accountNumber;
  };

  return (
    <Forma
      initialValues={initTransferForm}
      validationSchema={schema}
      validateOnBlur
      onSubmit={handleSaveContacts}>
      <Form direction="vertical" className={css.TransferForm}>
        {(ctx) => (
          <Fragment>
            <div className={css.FormFields}>
              {hasInfoBlock && (
                <Island className={css.InfoBlock}>
                  <List>
                    <h3 className={css.FormField}>Извините сервис временно недоступен</h3>
                    <List.ListItem>
                      <img src={InfoIcon} alt="X" />
                      <span>Вы можете получить перевод на реквизиты счёта</span>
                    </List.ListItem>
                  </List>
                </Island>
              )}

              <h2 className={cx(css.FormHeader)}>Реквизиты для перевода</h2>

              <Island>
                <Field
                  type="mask"
                  mask="99999999999999999999"
                  name="accountNumber"
                  label="ВАШ СЧЁТ В ДРУГОМ БАНКЕ"
                  placeholder="Рублёвый счёт"
                  required
                />
                <Field
                  type="mask"
                  mask="999999999"
                  name="bankIdCode"
                  label="БИК"
                  placeholder="БИК вашего банка"
                  required
                />
              </Island>

              <Island>
                <List>
                  <List.ListItem>
                    <img src={MoneyAtmIcon} alt="X" />
                    <span>
                      Деньги будут отправлены на ваше имя по указанным реквизитам{' '}
                      <b>после подписания вами кредитного договора</b>
                    </span>
                  </List.ListItem>
                  <List.ListItem>
                    <img src={InfoIcon} alt="X" />
                    <span>
                      В случае ошибки в реквизитах, деньги не пропадут, а вернутся на ваш счет в ОТП Банк
                    </span>
                  </List.ListItem>
                </List>
              </Island>
            </div>

            <div className={css.FormFooter}>
              <BasicButton
                className={css.FormButton}
                type="submit"
                theme="primary"
                flat
                value="Отправить заявку"
                disabled={!isComplete(ctx.values as ITransfer) || !ctx.isValid}
              />
            </div>
          </Fragment>
        )}
      </Form>
    </Forma>
  );
}

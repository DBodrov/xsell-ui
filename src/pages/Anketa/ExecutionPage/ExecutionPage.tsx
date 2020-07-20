import React, { useState, useCallback } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { BasicModal } from 'lib/components/BasicModal';
import { BasicInput } from 'lib/components/data-entry/BasicInput';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { List } from 'components/List';
import { auditService, UI } from 'services';
import { useAnketa } from 'context/Anketa';
import { toCapitalize } from 'utils/string.utils';
import { OPROSSO_FORM } from 'utils/externals';

import personIcon from 'assets/images/person.svg';
import docsCheckIcon from 'assets/images/docs-check.svg';
import billIcon from 'ui-kit/assets/icons/otp/bill.svg';
import hourglassIcon from 'ui-kit/assets/icons/otp/hourglass.svg';

import css from './ExecutionPage.module.scss';
import { useSendDocs } from './send-docs.hook';
import { AutoStepper } from 'components/AutoStepper';

interface IFormScreen {
  isLoading: boolean;
  currentEmail: string;
  handleChange: (email: string) => void;
  handleSendDocs: () => void;
}

const toPoll = () => {
  auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to poll' }, { toBE: true });
  window.location.href = OPROSSO_FORM;
};

const SuccessScreen = () => (
  <React.Fragment>
    <img className={css.DocsIcon} src={docsCheckIcon} alt="docs check" />
    <h3 className={css.PageTitle}>Документы Отправлены!</h3>
    <div className={css.Description}>Запрошеные вами документы отправлены на электронную почту</div>
  </React.Fragment>
);

const FormScreen = ({ isLoading, currentEmail, handleChange, handleSendDocs }: IFormScreen) => (
  <React.Fragment>
    <h3 className={css.PageTitle}>Документы на электронную почту</h3>
    <div className={css.Description}>
      <b>EMAIL</b>
    </div>
    <div className={css.EmailBlock}>
      <BasicInput
        className={css.EmailInput}
        type="email"
        data-testid="email-input"
        name="email"
        disabled={isLoading}
        onChangeHandler={handleChange}
        value={currentEmail}
        placeholder="email@email.ru"
      />

      <BasicButton
        className={css.EmailButton}
        type="button"
        theme="hero"
        disabled={isLoading}
        onClick={handleSendDocs}
        value="Отправить"
      />
    </div>
    <div className={css.Description}>
      Напоминаем, что вы в любой момент можете получить свой комплект документов на email.
    </div>
  </React.Fragment>
);

export function ExecutionPage() {
  const {
    step,
    anketa: { firstName, middleName, batchDocumentLink, email },
  } = useAnketa();

  const { submitForm, pageState } = useSendDocs();

  const [isModalOpen, setModalState] = useState(false);
  const [currentEmail, setEmail] = useState(email || '');

  const onOpenModal = useCallback(() => setModalState(true), []);
  const onCloseModal = useCallback(() => setModalState(false), []);
  const handleChange = useCallback((value: string) => setEmail(value), []);

  const handleSendDocs = useCallback(() => {
    submitForm({ email: currentEmail });
  }, [currentEmail, submitForm]);

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  const downloadAllDocs = useCallback(() => {
    auditService.userEvent({ category: 'FE_REDIRECT', action: 'Download batched documents' }, { toBE: true });
    UI.downloadFile(`/gateway/doc${batchDocumentLink}`, 'otpbank_documents');
  }, [batchDocumentLink]);

  return (
    <LayoutPage>
      <div className={css.Page}>
        <AutoStepper className={css.Stepper} status={step} />
        <h2 className={css.PageTitle}>{customerName}</h2>
        <Card>
          <Card.Header>
            <img src={personIcon} alt="person" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Спасибо, что выбрали нас!</h3>
            <List>
              <List.ListItem>
                <img src={billIcon} alt="X" />
                <span>Оформление вашего кредита успешно завершено.</span>
              </List.ListItem>
              <List.ListItem>
                <img src={hourglassIcon} alt="X" />
                <span>
                  Напоминаем, что срок перевода денежных средств на счет в сторонней кредитной организации
                  составляет до 3 рабочих дней.
                </span>
              </List.ListItem>
            </List>
          </Card.Body>
        </Card>
        <BasicButton
          className={css.Button}
          type="button"
          onClick={downloadAllDocs}
          theme="primary"
          flat
          value="Скачать документы"
        />
        <BasicButton
          className={css.Button}
          onClick={toPoll}
          type="button"
          theme="secondary"
          flat
          value="Есть что сказать? Расскажите нам!"
        />
        <BasicButton
          className={css.Button}
          onClick={onOpenModal}
          type="button"
          theme="secondary"
          flat
          value="Документы на email"
        />
        <BasicModal
          className={css.Modal}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          clickClose
          escClose
          showClose
          placement="bottom">
          {!pageState.data && !pageState.hasError && (
            <FormScreen
              isLoading={pageState.isFetching}
              currentEmail={currentEmail}
              handleChange={handleChange}
              handleSendDocs={handleSendDocs}
            />
          )}
          {/* Пока что ошибку показываем как успех */}
          {(pageState.isSuccess || pageState.hasError) && <SuccessScreen />}
        </BasicModal>
      </div>
    </LayoutPage>
  );
}

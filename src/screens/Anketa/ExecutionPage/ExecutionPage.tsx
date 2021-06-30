import React, {useState, useCallback} from 'react';
import {Button} from 'neutrino-ui';
import {AppPage, Screen} from 'components/Layout';
import {H1} from 'components/lib';
import {BankingBillIcon, HourglassIcon} from 'icons';
import {EmailModal} from './EmailModal';
import {List, ListItem} from './styles';
import {auditService, UI} from 'services';
import {useAnketa} from 'context/Anketa';
import {OPROSSO_FORM} from 'utils/externals';


const toPoll = () => {
  auditService.userEvent({category: 'FE_REDIRECT', action: 'Redirect to poll'}, {toBE: true});
  window.location.href = OPROSSO_FORM;
};

export function ExecutionPage() {
  const {
    anketa: {batchDocumentLink, email},
  } = useAnketa();

  const [isModalOpen, setModalState] = useState(false);
  const onOpenModal = useCallback(() => setModalState(true), []);
  const onCloseModal = useCallback(() => setModalState(false), []);

  const downloadAllDocs = useCallback(() => {
    auditService.userEvent({category: 'FE_REDIRECT', action: 'Download batched documents'}, {toBE: true});
    UI.downloadFile(`/gateway/doc${batchDocumentLink}`, 'otpbank_documents');
  }, [batchDocumentLink]);

  return (
    <AppPage>
      <Screen>
        <H1 css={{margin: '24px 0 16px'}}>Деньги переводятся</H1>
        <span css={{marginBottom: '1.5rem'}}>Спасибо, что выбрали нас!</span>
        <div css={{display: 'flex', flexFlow: 'row wrap', width: '100%'}}>
          <List css={{'@media (min-width: 704px)': {width: '50%'}}}>
            <ListItem>
              <BankingBillIcon css={{minWidth: 24, minHeight: 24}} />
              <span>Ожидайте СМС с подтверждением договора в течении 20 минут.</span>
            </ListItem>
            <ListItem>
              <HourglassIcon fill="var(--color-primary)" css={{minWidth: 24, minHeight: 24}} />
              <span>
                Напоминаем, что срок перевода денежных средств на счет в сторонней кредитной организации
                составляет до 3 рабочих дней.
              </span>
            </ListItem>
          </List>
          <div
            css={{
              display: 'flex',
              flexFlow: 'column nowrap',
              gap: '1rem',
              '@media (min-width: 704px)': {width: '50%'},
              maxWidth: '288px',
              width: '100%'
            }}
          >
            <Button css={{width: '100%'}} type="button" onClick={downloadAllDocs} variant="primary" flat>
              Скачать документы
            </Button>
            <Button css={{width: '100%'}} onClick={toPoll} type="button" variant="primary" flat outline>
              Есть что сказать? Расскажите нам!
            </Button>
            <Button css={{width: '100%'}} onClick={onOpenModal} type="button" variant="primary" flat outline>
              Документы на email
            </Button>
          </div>
        </div>
        <EmailModal isOpen={isModalOpen} onClose={onCloseModal} storedEmail={email} />
      </Screen>
    </AppPage>
  );
}

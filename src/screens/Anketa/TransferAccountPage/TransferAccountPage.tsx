import React, { useCallback } from 'react';
import {Button} from 'neutrino-ui';
import { useAnketa } from 'context/Anketa';
import { AppPage } from 'components/Layout';
import {H1, H2} from 'components/lib'
import { AccountForm } from 'components/AccountForm';
import {Page} from './styles';
import { ArchiveModal } from 'components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';


type Props = {
  hasCards: boolean;
  hasDbo: boolean;
  onChangePage: (page: string) => void;
}

export function TransferAccountPage({hasCards, hasDbo, onChangePage}: Props) {
  const { step, updateAnketa, archivingAnketa } = useAnketa();
  const { isShowModal, handleOpenModal, handleCloseModal } = useModalState();
  // const { handleUpdateAnketa, handleArchivingAnketa } = useAnketaUpdaters();

  const handleSubmitAccount = useCallback(
    (data: any) => {
      updateAnketa(step, data);
    },
    [step, updateAnketa]
  );

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  return (
    <AppPage>
      <Page css={{backgroundColor: '#f0f0f0'}}>
        <ArchiveModal
          isOpen={isShowModal}
          handleArchivingAnketa={handleArchivingAnketa}
          onClose={handleCloseModal}
        />
        <H1>Реквизиты для перевода</H1>
        <AccountForm onUpdateAccount={handleSubmitAccount} onArchivingAnketa={handleOpenModal} />
        <H2 css={{marginTop: 10, fontSize: 30}}>Альтернативные способы</H2>
        {hasCards ? (
          <Button
            css={{
              width: '100%',
              height: 44,
              borderRadius: 4,
              alignSelf: 'center',
              marginTop: 10,
              fontWeight: 700,
              fontSize: 14,
            }}
            onClick={() => onChangePage('cards')}
            type="button"
            variant="primary"
            outline
            flat
          >
            Перевод на карту
          </Button>
        ) : null}
        {hasDbo ? (
          <Button
            css={{
              width: '100%',
              height: 44,
              borderRadius: 4,
              alignSelf: 'center',
              marginTop: 10,
              fontWeight: 700,
              fontSize: 14,
            }}
            onClick={() => onChangePage('sbp')}
            type="button"
            variant="primary"
            outline
            flat
          >
            Перевод по номеру телефона
          </Button>
        ) : null}
      </Page>
    </AppPage>
  );
}

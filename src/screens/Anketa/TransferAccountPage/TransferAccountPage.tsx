import React, { useCallback } from 'react';
import { useAnketa } from 'context/Anketa';
import { AppPage } from 'components/Layout';
import {H1} from 'components/lib'
import { AccountForm } from 'components/AccountForm';
import {Page} from './styles';
import { ArchiveModal } from 'components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';


export function TransferAccountPage() {
  const { step, updateAnketa, archivingAnketa } = useAnketa();
  const { isShowModal, handleOpenModal, handleCloseModal } = useModalState();

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
      </Page>
    </AppPage>
  );
}

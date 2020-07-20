import React, { useCallback } from 'react';
import { useAnketa } from 'context/Anketa';
import { LayoutPage } from 'components/Layout';
import { AccountForm } from 'components/AccountForm';
import css from './AccountPage.module.scss';
import { AutoStepper } from '../../../components/AutoStepper';
import { ArchiveModal } from '../../../components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';

export function AccountPage() {
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
    <LayoutPage>
      <div className={css.Page}>
        <AutoStepper className={css.Stepper} status={step} />
        <ArchiveModal
          isOpen={isShowModal}
          handleArchivingAnketa={handleArchivingAnketa}
          onClose={handleCloseModal}
        />
        <h2 className={css.PageTitle}>Реквизиты для перевода</h2>
        <AccountForm onUpdateAccount={handleSubmitAccount} onArchivingAnketa={handleOpenModal} />
      </div>
    </LayoutPage>
  );
}

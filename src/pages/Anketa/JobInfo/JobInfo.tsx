import React, { useCallback } from 'react';
import { LayoutPage } from 'components/Layout';
import { JobInfoForm } from 'components/JobInfoForm';
import { useAnketa } from 'context/Anketa';
import css from './JobInfo.module.scss';
import { AutoStepper } from 'components/AutoStepper';
import { ArchiveModal } from 'components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';

export function JobInfo() {
  const { step, archivingAnketa } = useAnketa();
  const { isShowModal, handleOpenModal, handleCloseModal } = useModalState();

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  return (
    <LayoutPage>
      <AutoStepper className={css.Stepper} status={step} />
      <ArchiveModal
        isOpen={isShowModal}
        handleArchivingAnketa={handleArchivingAnketa}
        onClose={handleCloseModal}
      />
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Проверьте свои данные</h2>
        <JobInfoForm onConfirmArchiving={handleOpenModal} />
      </div>
    </LayoutPage>
  );
}

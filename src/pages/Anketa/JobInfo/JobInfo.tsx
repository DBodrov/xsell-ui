import React, { useCallback } from 'react';
import { LayoutPage, AppPage } from 'components/Layout';
import { JobInfoForm } from 'components/JobInfoForm';
import { useAnketa } from 'context/Anketa';
import css from './JobInfo.module.scss';
import { ArchiveModal } from 'components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';

export function JobInfo() {
  const { step, archivingAnketa } = useAnketa();
  const { isShowModal, handleOpenModal, handleCloseModal } = useModalState();

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  return (
    <AppPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Проверьте свои данные</h2>
        <JobInfoForm onConfirmArchiving={handleOpenModal} />
      </div>
      <ArchiveModal
        isOpen={isShowModal}
        handleArchivingAnketa={handleArchivingAnketa}
        onClose={handleCloseModal}
      />
    </AppPage>
  );
}

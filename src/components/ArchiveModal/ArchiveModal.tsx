import React, {useCallback} from 'react';
import {BasicButton} from 'lib/components/buttons';
import {BasicModal} from 'lib/components/BasicModal';
import css from './ArchiveModal.module.scss';

interface IStepperProps {
  isOpen?: boolean;
  handleArchivingAnketa: () => void;
  onClose: () => void;
}

export const ArchiveModal = ({isOpen, onClose, handleArchivingAnketa}: IStepperProps) => {
  const handleClose = useCallback(
    e => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  const handleArchive = useCallback(() => {
    handleArchivingAnketa();
    onClose();
  }, [handleArchivingAnketa, onClose]);

  return (
    <BasicModal
      className={css.Modal}
      isOpen={isOpen}
      clickClose
      escClose
      showClose
      placement="bottom"
      onClose={onClose}
    >
      <h3 className={css.PageTitle}>Отменить заявку на кредит?</h3>
      <div className={css.Description}>
        Ваша текущая заявка будет закрыта. Новую заявку потребуется заполнить сначала
      </div>
      <div className={css.ButtonBlock}>
        <span onClick={handleClose} className={css.CancelLink}>
          Нет, продолжить
        </span>
        <BasicButton
          className={css.ResetButton}
          onClick={handleArchive}
          flat
          type="button"
          theme="secondary"
          value="Да, сбросить"
        />
      </div>
    </BasicModal>
  );
};

import React, { useCallback } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { useAnketa } from 'context/Anketa';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { DeclineOptions } from 'components/DeclineOptions';
import { auditService } from 'services';
import tabletIcon from 'assets/images/tablet.svg';
import css from './RegistrationChanged.module.scss';
import { ArchiveModal } from '../../../components/ArchiveModal/ArchiveModal';
import { useModalState } from '../../../hooks/modal.hook';

function toMap() {
  auditService.userEvent({
    category: 'FE_REDIRECT',
    action: 'Redirect to office map from registration changed',
  });
  window.location.href = 'https://www.otpbank.ru/maps/points/';
}

export function RegistrationChanged() {
  const { archivingAnketa, step } = useAnketa();
  const { isShowModal, handleOpenModal, handleCloseModal } = useModalState();

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  return (
    <LayoutPage>
      <div className={css.Page}>
        <ArchiveModal
          isOpen={isShowModal}
          handleArchivingAnketa={handleArchivingAnketa}
          onClose={handleCloseModal}
        />
        <Card>
          <Card.Header>
            <img src={tabletIcon} alt="tablet" />
          </Card.Header>
          <Card.Body>
            <h2 className={css.PageTitle}>Похоже, что место вашей прописки изменилось</h2>
            <DeclineOptions />
          </Card.Body>
        </Card>
        <BasicButton
          type="button"
          data-testid="btn-to-map"
          theme="primary"
          value="Найти ближайший офис банка"
          styles={{ width: '100%', maxWidth: '450px', minHeight: '3rem', marginTop: '1rem' }}
          onClick={toMap}
        />
        <BasicButton
          type="button"
          onClick={handleOpenModal}
          value="Переоформить заявку"
          theme="secondary"
          style={{ padding: 0, marginTop: '1rem', width: '100%' }}
        />
      </div>
    </LayoutPage>
  );
}

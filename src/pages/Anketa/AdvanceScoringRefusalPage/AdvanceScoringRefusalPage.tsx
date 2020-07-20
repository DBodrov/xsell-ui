import React, { useState, useCallback } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { BasicModal } from 'lib/components/BasicModal';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { useAnketa } from 'context/Anketa';
import { toCapitalize } from 'utils/string.utils';
import sadnessmaskIcon from 'assets/images/mask.svg';
import { RejectReason } from './RejectReason';
import css from './AdvanceScoringRefusalPage.module.scss';

export function AdvanceScoringRefusalPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    anketa: { firstName, middleName },
  } = useAnketa();

  const customerName = `${toCapitalize(firstName)} ${toCapitalize(middleName)}`;

  const handleOpenModal = useCallback(() => setModalIsOpen(true), []);
  const handleCloseModal = useCallback(() => setModalIsOpen(false), []);

  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>{customerName}</h2>
        <Card>
          <Card.Header>
            <img src={sadnessmaskIcon} alt="" />
          </Card.Header>
          <Card.Body>
            <h3 className={css.PageTitle}>Принято отрицательное решение</h3>
            <span style={{ marginBottom: '2rem' }}>
              По результатам детальной проверки по вашей заявке принято отрицательное решение.
            </span>
          </Card.Body>
        </Card>
        <BasicButton
          className={css.Button}
          onClick={handleOpenModal}
          type="button"
          theme="primary"
          flat
          value="Что ещё можно сделать?"
        />
      </div>
      <BasicModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        clickClose
        escClose
        showClose
        placement="bottom"
        styles={{ minHeight: '370px', width: '100%' }}>
        <RejectReason onCloseModal={handleCloseModal} />
      </BasicModal>
    </LayoutPage>
  );
}

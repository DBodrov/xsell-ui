/* eslint-disable  */
import React, { useCallback, useState } from 'react';
import { BasicButton } from 'lib/components/buttons';
import { BasicModal } from 'lib/components/BasicModal';
import { BicSearch } from 'lib/components/data-entry';
import { useBreakpoint } from 'providers';
import css from './TestBlock.module.scss';

export function Block() {
  const pageRef = React.useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bik, setBik] = useState('');
  const bp = useBreakpoint();

  const modalStyle: React.CSSProperties = {
    width: bp.sm ? '100%' : '80%',
  };
  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleSelectBik = (data: string) => {
    console.log(data);
    setBik(data);
  };

  return (
    <div className={css.Page} ref={pageRef}>
      <div className={css.Header}>Header</div>
      <div className={css.Form}>
        <BicSearch name="bik" onChangeHandler={handleSelectBik} value={bik} />
      </div>
      <BasicButton type="button" onClick={handleOpenModal} value="Show modal" />
      <BasicModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        escClose
        showClose
        styles={modalStyle}
        placement="bottom">
        <h3>Modal window</h3>
        <ul>
          <li>Step 1</li>
          <li>Step 2</li>
          <li>Step 3</li>
        </ul>
        <BasicButton type="button" theme="hero" onClick={handleCloseModal} value="Close modal" />
      </BasicModal>
      <div style={{ position: 'absolute', bottom: 0, width: '350px', padding: '1rem' }}>
        {/* <BikSearch name="bik2" onChangeHandler={console.log} /> */}
      </div>
    </div>
  );
}

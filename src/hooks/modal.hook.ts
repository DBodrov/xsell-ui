import { useState, useCallback } from 'react';

export const useModalState = (defaultValue = false) => {
  const [isShowModal, setShowModal] = useState(defaultValue);

  const handleOpenModal = useCallback(() => setShowModal(true), [setShowModal]);

  const handleCloseModal = useCallback(() => setShowModal(false), [setShowModal]);

  const handleToggleModal = useCallback(() => setShowModal(!isShowModal), [setShowModal, isShowModal]);

  return {
    isShowModal,
    handleOpenModal,
    handleCloseModal,
    handleToggleModal,
  };
};

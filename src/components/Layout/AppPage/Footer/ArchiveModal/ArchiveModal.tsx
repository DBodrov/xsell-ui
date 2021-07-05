import React from 'react';
import {css} from '@emotion/react';
import {Modal, Span, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {H2} from 'components/lib';
import {CloseIcon} from 'icons';
import {useMedia} from 'utils/use-media';
import {ArchiveForm, ArchiveFormHeader, CloseButton} from './style';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function ArchiveModal({isOpen, onClose}: Props) {
  const isMobile = useMedia('(max-width: 575px)');
  const {archivingAnketa, step} = useAnketa();

  const handleResetAnketa = React.useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  return (
    <Modal
      isOpen={isOpen}
      placement={isMobile ? 'bottom' : 'center'}
      onOverlayClick={onClose}
      onClose={onClose}
      overlayCss={css({
        backgroundColor: 'rgba(110, 116, 130, 0.85)',
      })}
    >
      <ArchiveForm>
        <ArchiveFormHeader>
          <H2>Начать новую заявку на кредит?</H2>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ArchiveFormHeader>
        <div>
          <Span css={{margin: '32px 0', display: 'block'}}>
            Вы сможете заполнить заявку заново. Ваша текущая заявка будет отменена и весь прогресс будет
            утерян.
          </Span>
          <Button css={{width: '252px'}} variant="primary" flat onClick={handleResetAnketa}>
            Да, создать новую заявку
          </Button>
        </div>
      </ArchiveForm>
    </Modal>
  );
}

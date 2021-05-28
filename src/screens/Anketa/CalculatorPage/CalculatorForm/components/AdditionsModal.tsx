import React from 'react';
import {css} from '@emotion/react';
import {Modal} from 'neutrino-ui';
import {H2} from 'components/lib';
import {CloseIcon} from 'icons';
import {useMedia} from 'utils/use-media';
import {INSURANCE_DOCS, DIFFERENCE_HAVE_RULES} from 'utils/externals';
import {TAdditionsModalType} from '../types';
import {AdditionsForm, ButtonLink} from './styles';

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalType?: TAdditionsModalType;
  modalTitle: string;
  payment?: number;
};

const ConditionsDocsUrls = {
  ...INSURANCE_DOCS,
  diffHave: DIFFERENCE_HAVE_RULES,
};

export function AdditionsModal(props: TModalProps) {
  const {isOpen, onClose, modalTitle, modalType, payment} = props;
  const isMobile = useMedia('(max-width: 575px)');
  const handleModalClose = () => onClose();

  return (
    <Modal
      isOpen={isOpen}
      placement={isMobile ? 'bottom' : 'center'}
      onOverlayClick={handleModalClose}
      overlayCss={css`
        background: rgba(110, 116, 130, 0.5);
        backdrop-filter: blur(10px);
        height: 100%;
      `}
      onClose={onClose}
    >
      <AdditionsForm
        css={{
          margin: isMobile ? 'auto auto 0' : 'auto',
          maxWidth: isMobile ? '100%' : '464px',
          borderRadius: isMobile ? '0px' : '32px',
          minHeight: '340px',
          padding: `2rem 0 0 ${isMobile ? '24px' : '44px'}`,
        }}
      >
        <div
          css={{
            maxWidth: 24,
            height: 24,
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            cursor: 'pointer',
          }}
          role="button"
          onClick={handleModalClose}
          title="Закрыть"
        >
          <CloseIcon />
        </div>
        <H2 css={{marginBottom: 34}}>{modalTitle}</H2>
        <div
          css={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem'}}
        >
          <p css={{width: '60%'}}>Ориентировочная стоимость услуги, рублей в месяц</p>
          <p css={{width: '40%', fontSize: 24, color: 'var(--color-primary)', fontWeight: 600}}>
            {isNaN(payment) ? '' : Number(payment).toLocaleString('ru')}
          </p>
        </div>
        <footer css={{position: 'absolute', bottom: 32, left: 0, paddingLeft: isMobile ? '24px' : '44px'}}>
          <ButtonLink download target="_blank" href={ConditionsDocsUrls[modalType]} rel="noopener noreferrer">
            Скачать условия
          </ButtonLink>
        </footer>
      </AdditionsForm>
    </Modal>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {Modal, H5, Button, Span} from 'neutrino-ui';
import {useMedia} from 'utils/use-media';
import {CloseIcon} from 'icons';

type RejectModalProps = {
  modalState: {
    showModal: boolean;
    showThanks: boolean;
  };
  setState: React.Dispatch<React.SetStateAction<{showModal: boolean; showThanks: boolean}>>;
  sendAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function QuestionForm({isMobile, onAnswer}: any) {
  return (
    <div css={{padding: '34px 0'}}>
      <H5 css={{marginBottom: 34, padding: `0 56px 0 ${isMobile ? '24px' : '44px'}`}}>
        Почему предложение не заинтересовало?
      </H5>
      <div css={{display: 'flex', flexFlow: 'column nowrap', margin: 'auto', width: 272}}>
        <Button
          autoFocus
          variant="primary"
          outline
          flat
          css={{marginBottom: '1rem', width: '100%', height: 48}}
          onClick={onAnswer}
        >
          Уже взял кредит
        </Button>
        <Button
          variant="primary"
          outline
          flat
          css={{marginBottom: '1rem', width: '100%', height: 48}}
          onClick={onAnswer}
        >
          Сейчас не интересно
        </Button>
        <Button variant="primary" outline flat css={{width: '100%', height: 48}} onClick={onAnswer}>
          Не подходят условия
        </Button>
      </div>
    </div>
  );
}

function ThanksForm({isMobile}: any) {
  return (
    <div css={{padding: '34px 0'}}>
      <H5 css={{marginBottom: 34, padding: `0 56px 0 ${isMobile ? '24px' : '44px'}`}}>
        Спасибо за вашу обратную связь!
      </H5>
      <div
        css={{
          display: 'flex',
          flexFlow: 'column nowrap',
          width: '100%',
          padding: isMobile ? '0 24px' : '0 44px',
        }}
      >
        <Span css={{marginBottom: 16}}>Мы сожалеем, что наше предложение не актуально для вас.</Span>
        <Span css={{marginBottom: 16}}>Если вы оставите отзыв, то мы сможем стать лучше для вас.</Span>
        <Span css={{marginBottom: 16}}>Спасибо!</Span>
      </div>
    </div>
  );
}

const RejectForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background-color: #fff;
  position: relative;
`;

export function RejectModal({modalState, setState, sendAnswer}: RejectModalProps) {
  const isMobile = useMedia('(max-width: 575px)');
  const handleModalClose = () => {
    setState(s => ({...s, showModal: false}));
  };

  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendAnswer(e);
    setState(s => ({...s, showThanks: true}));
  };

  return (
    <Modal
      placement={isMobile ? 'bottom' : 'center'}
      isOpen={modalState.showModal}
      onOverlayClick={handleModalClose}
      overlayCss={css`
        background: rgba(110, 116, 130, 0.5);
        backdrop-filter: blur(10px);
        height: 100%;
      `}
    >
      <RejectForm
        css={{
          margin: isMobile ? 'auto auto 0' : 'auto',
          maxWidth: isMobile ? '100%' : '464px',
          borderRadius: isMobile ? '0px' : '32px',
          minHeight: '340px',
        }}
        role="dialog"
      >
        <div
          css={{maxWidth: 24, height: 24, position: 'absolute', top: 34, right: 34, cursor: 'pointer'}}
          role="button"
          onClick={handleModalClose}
          title="Закрыть"
        >
          <CloseIcon />
        </div>
        {modalState.showThanks ? (
          <ThanksForm isMobile={isMobile} />
        ) : (
          <QuestionForm isMobile={isMobile} onAnswer={handleAnswer} />
        )}
      </RejectForm>
    </Modal>
  );
}

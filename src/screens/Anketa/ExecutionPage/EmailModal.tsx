import React from 'react';
import {css} from '@emotion/react';
import {Modal, Button} from 'neutrino-ui';
import {CloseIcon} from 'icons';
import {FormField, H2, Label, Input} from 'components/lib';
import {useMedia} from 'utils/use-media';
import {useFetch} from 'utils/use-fetch';
import {ModalCloseButton} from './styles';

type TEmailModalProps = {
  isOpen: boolean;
  onClose(): void;
  storedEmail?: string;
};

export function EmailModal({isOpen, onClose, storedEmail}: TEmailModalProps) {
  const [email, setEmail] = React.useState(storedEmail || '');
  const [error, setError] = React.useState('')
  const isMobile = useMedia('(max-width: 575px)');
  const fetchClient = useFetch();


  const handleChangeEmail = React.useCallback((value: string) => {
    if (error) {
      setError('');
    }
    setEmail(value);
  }, [error]);

  const handleSubmitEmail = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isEmail = new RegExp(/\S+@\S+\.\S+/).test(email);
      if (isEmail) {
        fetchClient('/gateway/credit-application/send-documents', {
          method: 'post',
          body: {email},
        }).then(() => {
          onClose();
        }, () => {
          setError('Что-то пошло не так!')
        });
      }
    },
    [email, fetchClient, onClose],
  );

  return (
    <Modal
      placement={isMobile ? 'bottom' : 'center'}
      isOpen={isOpen}
      onOverlayClick={onClose}
      onClose={onClose}
      overlayCss={css`
        background: rgba(110, 116, 130, 0.5);
        backdrop-filter: blur(10px);
        height: 100%;
      `}
    >
      <div
        css={{
          display: 'flex',
          flexFlow: 'column nowrap',
          margin: isMobile ? 'auto auto 0' : 'auto',
          maxWidth: isMobile ? '100%' : '464px',
          borderRadius: isMobile ? '0px' : '32px',
          minHeight: '340px',
          backgroundColor: '#fff',
          padding: '2rem',
        }}
      >
        <div css={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', width: '100%'}}>
          <H2>Документы на электронную почту</H2>
          <ModalCloseButton onClick={onClose}>
            <CloseIcon />
          </ModalCloseButton>
        </div>
        <form
          css={{display: 'flex', flexFlow: 'column nowrap', paddingTop: '2rem'}}
          onSubmit={handleSubmitEmail}
        >
          <FormField>
            <Label>EMAIL</Label>
            <Input
              css={{height: '3rem', borderRadius: 8, fontWeight: 'bold'}}
              type="email"
              name="email"
              onChangeHandler={handleChangeEmail}
              value={email}
            />
            {error && <span css={{color: 'var(--color-error)'}} role="alert">{error}</span>}
            <Button variant="secondary" flat css={{width: '100%', marginTop: '1rem'}} type="submit">
              Отправить
            </Button>
          </FormField>
          <span css={{marginTop: '3rem'}}>
            Напоминаем, что вы в любой момент можете получить свой комплект документов на email.
          </span>
        </form>
      </div>
    </Modal>
  );
}

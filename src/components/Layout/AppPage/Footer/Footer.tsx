import React from 'react';
import {Span} from 'neutrino-ui';
import {useAuth} from 'context/Auth';
import {LinkButton} from 'components/lib';
import {ArchiveModal} from './ArchiveModal';
import {FooterSection,  FooterDisclaimer} from './styles';

export function Footer() {
  const [isOpenArchiveModal, setModalState] = React.useState(false);
  const insideAnketa = window.location.pathname.includes('anketa');
  const handleToggleArchiveModal = () => setModalState(s => !s);

  return (
    <FooterSection>
      {insideAnketa ? (
        <LinkButton
          css={{color: 'var(--color-primary)', fontSize: 14, marginBottom: '1rem'}}
          onClick={handleToggleArchiveModal}
        >
          Начать новую заявку
        </LinkButton>
      ) : null}
      <FooterDisclaimer>
        <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
        <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
      </FooterDisclaimer>
      <LinkButton css={{color: 'var(--color-primary)', fontSize: 14}} onClick={() => {}}>
        Ваше мнение об онлайн-кредите
      </LinkButton>
      {insideAnketa ? (
        <ArchiveModal
          isOpen={isOpenArchiveModal}
          onToggle={handleToggleArchiveModal}
          onClose={() => setModalState(false)}
        />
      ) : null}
    </FooterSection>
  );
}

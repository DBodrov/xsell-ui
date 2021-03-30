import React from 'react';
import {Span} from 'neutrino-ui';
import {LinkButton} from 'components/lib';
import {useAnketa} from 'context/Anketa';
import {OPROSSO} from 'utils/externals';
import {ArchiveModal} from './ArchiveModal';
import {FooterSection, FooterDisclaimer} from './styles';

export function Footer() {
  const {step} = useAnketa();
  const [isOpenArchiveModal, setModalState] = React.useState(false);

  const handleToggleArchiveModal = () => setModalState(s => !s);
  const oprossoLink = OPROSSO[step] ?? null;

  return (
    <FooterSection>
      <LinkButton
        css={{color: 'var(--color-primary)', fontSize: 14, marginBottom: '1rem'}}
        onClick={handleToggleArchiveModal}
      >
        Начать новую заявку
      </LinkButton>
      <FooterDisclaimer>
        <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
        <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
      </FooterDisclaimer>
      {oprossoLink ? (
        <LinkButton
          css={{color: 'var(--color-primary)', fontSize: 14}}
          onClick={() => {
            window.location.assign(oprossoLink);
          }}
        >
          Ваше мнение об онлайн-кредите
        </LinkButton>
      ) : null}
      <ArchiveModal
        isOpen={isOpenArchiveModal}
        onToggle={handleToggleArchiveModal}
        onClose={() => setModalState(false)}
      />
    </FooterSection>
  );
}

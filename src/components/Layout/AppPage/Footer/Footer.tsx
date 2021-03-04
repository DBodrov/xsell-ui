import React from 'react';
import {useAnketa} from 'context/Anketa';
import {LinkButton} from 'components/lib';
import {ArchiveModal} from './ArchiveModal';
import {FooterSection} from './styles';

export function Footer() {
  const [isOpenArchiveModal, setModalState] = React.useState(false);
  // const {anketa} = useAnketa();
  const hasReset = true;
  const handleToggleArchiveModal = () => setModalState(s => !s);

  return (
    <FooterSection>
      {hasReset ? (
        <LinkButton css={{color: 'var(--color-primary)', fontSize: 14}} onClick={handleToggleArchiveModal}>Сброс заявки</LinkButton>
      ) : null}
      <ArchiveModal isOpen={isOpenArchiveModal} onToggle={handleToggleArchiveModal} onClose={() => setModalState(false)}/>
    </FooterSection>
  );
}

import React from 'react';
import styled from '@emotion/styled';
import {Modal} from 'neutrino-ui';
import {CloseIcon} from 'icons';
import {H1} from 'components/lib';

const RulesForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background-color: #fff;
  position: relative;
  border-radius: 8px;
  padding: 14px 8px 0;
`;

const RuleItem = styled.li`
  &::marker {
    color: var(--color-primary);
    font-size: 1.5rem;
  }
`;

type Props = {
  isOpen: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RaznitcaModal({isOpen, setOpenState}: Props) {
  const handleClose = () => setOpenState(false);
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      css={{width: '95%', height: '95%', margin: 'auto', maxWidth: 704}}
      onOverlayClick={handleClose}
    >
      <RulesForm role="dialog" aria-labelledby="rule-title">
        <div
          css={{maxWidth: 24, height: 24, position: 'absolute', top: 14, right: 14, cursor: 'pointer'}}
          role="button"
          onClick={handleClose}
          title="Закрыть"
        >
          <CloseIcon />
        </div>
        <H1 id="rule-title" css={{paddingRight: 48}}>
          Простые условия акции «Разница есть!»
        </H1>
        <ul>
          <RuleItem>Возьмите кредит до 1 млн рублей в период с 19.08.2020 по 31.01.2021</RuleItem>
          <RuleItem>Срок кредита от 24 месяцев</RuleItem>
          <RuleItem>
            Подключите защиту от рисков, связанных с жизнью и здоровьем, и услугу «Мультисервис»*
          </RuleItem>
          <RuleItem>Оплачивайте кредит по графику</RuleItem>
        </ul>
        <p
          css={{fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: '16px', textAlign: 'justify'}}
        >
          *Комплексное предложение: для дома, в случае повреждения инженерных систем или потери ключей,
          телемедицина, для подбора клиник и онлайн консультаций. Финансовый помощник, для решения вопросов со
          сбережениями, кредитами и инвестициями. Вирусолог для онлайн консультации по вирусным болезням.
          Личный юрист – круглосуточная помощь. Ветеринар – вызов, лечение и консультации по уходу и питанию
        </p>

        <p css={{fontWeight: 'bold', lineHeight: '24px', paddingTop: 16}}>
          После выполнения условий, в конце срока кредита мы пересчитаем его проценты по ставке 8,5%, и вернем
          переплату на вашу карту реальными деньгами.
        </p>
      </RulesForm>
    </Modal>
  );
}

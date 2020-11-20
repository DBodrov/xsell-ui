import React, {useCallback, useMemo, useState} from 'react';
import cx from 'classnames';
import {useAnketa} from 'context/Anketa';
import {CardSelect} from './CardSelect';
import {AppPage} from 'components/Layout';
import {Island} from 'components/Card';
import {List} from 'components/List';
import MoneyAtmIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';
import css from './TransferCardPage.module.scss';
import {BasicButton} from 'lib/components/buttons';

export function TransferCardPage() {
  const {
    anketa: {customerOtpCards = []},
    updateAnketa,
  } = useAnketa();

  const options = useMemo(
    () =>
      customerOtpCards.map(card => ({
        label: card.bankCardNumber,
        value: card.bankCardNumber,
        bankCardId: card.bankCardId,
        cardExpirationDate: card.cardExpirationDt,
      })),
    [customerOtpCards],
  );

  const [currentCardId, setCardId] = useState(undefined);

  const handleSetCard = React.useCallback((cardId: string) => {
    setCardId(cardId);
  }, []);

  const handleChooseCard = useCallback(() => {
    // const { value, cardExpirationDate } = currentCard;
    // updateAnketa('TRANSFER_DETAILS_CARDS', { cardNumber: value, cardExpirationDate });
  }, []);

  // const handleTransferAccount = useCallback(() => {
  //   onChangeView(true);
  // }, [onChangeView]);

  return (
    <AppPage>
      <div className={css.Page}>
        <Island>
          <span>НА СУЩЕСТВУЮЩУЮ КАРТУ</span>
          <CardSelect
            cardsList={customerOtpCards}
            onSelectCard={handleSetCard}
            currentCardId={currentCardId}
          />

          <List className={css.Block}>
            <List.ListItem>
              <img src={MoneyAtmIcon} alt="X" />
              <span>Деньги будут отправлены на ваше имя по указанным реквизитам</span>
            </List.ListItem>
          </List>
        </Island>
        <BasicButton
          className={css.Button}
          onClick={handleChooseCard}
          type="button"
          theme="primary"
          flat
          value="Далее"
        />
        <h2 className={cx(css.Header)}>Альтернативные способы</h2>
        <BasicButton
          className={css.Button}
          onClick={() => console.info('open account')}
          type="button"
          theme="secondary"
          flat
          value="Перевод на счёт в другой банк"
        />
      </div>
    </AppPage>
  );
}

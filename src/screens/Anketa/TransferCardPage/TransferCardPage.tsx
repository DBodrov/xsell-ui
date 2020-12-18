import React, {useCallback, useMemo, useState} from 'react';
import {Span, Button} from 'neutrino-ui';
import {useAnketa, TCustomerCard} from 'context/Anketa';
import {useFetch} from 'utils/use-fetch';
import {CardSelect} from './CardSelect';
import {AppPage} from 'components/Layout';
import {H1, H2} from 'components/lib';
import {Page} from './styles';
import {MoneyATM} from 'icons';
//
import cx from 'classnames';
import {Island} from 'components/Card';
import {List} from 'components/List';
import MoneyAtmIcon from 'lib/ui-kit/assets/icons/otp/money-atm-2.svg';
import css from './TransferCardPage.module.scss';
import {BasicButton} from 'lib/components/buttons';

type Props = {
  cards?: TCustomerCard[];
  hasDbo?: boolean;
};

export function TransferCardPage({cards, hasDbo}: Props) {
  const {anketa, updateAnketa} = useAnketa();

  // const options = useMemo(
  //   () =>
  //     customerOtpCards.map(card => ({
  //       label: card.bankCardNumber,
  //       value: card.bankCardNumber,
  //       bankCardId: card.bankCardId,
  //       cardExpirationDate: card.cardExpirationDt,
  //     })),
  //   [customerOtpCards],
  // );

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
      <Page css={{backgroundColor: '#f0f0f0'}}>
        <H1>Способ получения денег на карту</H1>
        <div
          css={{
            backgroundColor: '#fff',
            border: '1px #c5c5c5 solid',
            borderRadius: 4,
            padding: '1rem',
            marginBottom: 8,
            width: '100%',
          }}
        >
          <Span css={{fontWeight: 600}}>НА СУЩЕСТВУЮЩУЮ КАРТУ</Span>
          <CardSelect cardsList={cards} onSelectCard={handleSetCard} currentCardId={currentCardId} />
          <div css={{display: 'flex', marginTop: '1rem'}}>
            <MoneyATM fill="var(--color-primary)" />
            <Span css={{paddingLeft: 16}}>Деньги будут отправлены на вашу карту в банке ОТП.</Span>
          </div>
        </div>
        <Button
          css={{
            width: '100%',
            height: 44,
            borderRadius: 4,
            alignSelf: 'center',
            fontWeight: 700,
            fontSize: 14,
          }}
          onClick={handleChooseCard}
          type="button"
          variant="primary"
          flat
          disabled={!currentCardId}
        >
          Далее
        </Button>

        <H2 css={{marginTop: 10, fontSize: 30}}>Альтернативные способы</H2>
        <Button
          css={{
            width: '100%',
            height: 44,
            borderRadius: 4,
            alignSelf: 'center',
            fontWeight: 700,
            fontSize: 14,
          }}
          onClick={() => console.info('open account')}
          type="button"
          variant="primary"
          outline
          flat
        >
          Перевод на счёт в другой банк
        </Button>
        {hasDbo ? (
          <Button
            css={{
              width: '100%',
              height: 44,
              borderRadius: 4,
              alignSelf: 'center',
              marginTop: 10,
              fontWeight: 700,
              fontSize: 14,
            }}
            onClick={() => console.info('open account')}
            type="button"
            variant="primary"
            outline
            flat
          >
            Перевод по номеру телефона
          </Button>
        ) : null}
      </Page>
    </AppPage>
  );
}

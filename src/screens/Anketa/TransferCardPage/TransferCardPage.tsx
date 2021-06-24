import React, {useCallback, useState} from 'react';
import {Button} from 'neutrino-ui';
import {useAnketa, TCustomerCard} from 'context/Anketa';
import {CardSelect} from './CardSelect';
import {AppPage, Screen} from 'components/Layout';
import {H1, H2, Form, FormField, LinkButton, SecuritySign} from 'components/lib';

type Props = {
  cards?: TCustomerCard[];
  hasDbo?: boolean;
  onChangePage: (page: string) => void;
};

export function TransferCardPage({cards, hasDbo, onChangePage}: Props) {
  const {updateAnketa} = useAnketa();
  const [currentCardId, setCardId] = useState(undefined);

  const handleSetCard = React.useCallback((cardId: string) => {
    setCardId(cardId);
  }, []);

  const handleChooseCard = useCallback(() => {
    const card = cards.find(c => c.bankCardId === currentCardId);

    const {bankCardNumber, cardExpirationDt} = card;
    updateAnketa('TRANSFER_DETAILS_CARDS', {
      cardExpirationDate: cardExpirationDt,
      cardNumber: bankCardNumber,
    });
  }, [cards, currentCardId, updateAnketa]);

  const handleChangePage = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const pageType = e.currentTarget.dataset.page;
      onChangePage(pageType);
    },
    [onChangePage],
  );

  return (
    <AppPage>
      <Screen>
        <H1>Способ получения денег на карту</H1>
        <Form>
          <FormField>
            <div
              css={{
                backgroundColor: '#fff',
                borderRadius: 32,
                boxShadow: '0px 16px 48px rgba(73, 92, 136, 0.15)',
                padding: '32px 16px',
                margin: '14px 0',
                width: '100%',
              }}
            >
              <H2>Куда перевести?</H2>
              <CardSelect cardsList={cards} onSelectCard={handleSetCard} currentCardId={currentCardId} />
            </div>
          </FormField>
          <FormField>
            <div
              css={{
                backgroundColor: '#fff',
                borderRadius: 32,
                boxShadow: '0px 16px 48px rgba(73, 92, 136, 0.15)',
                padding: '32px 25px',
                margin: '14px 0',
                width: '100%',
              }}
            >
              <H2>Другие способы</H2>
              <LinkButton
                data-page="account"
                onClick={handleChangePage}
                css={{color: 'var(--color-primary)'}}
              >
                Перевод на счёт в другой банк
              </LinkButton>
              {hasDbo ? (
                <LinkButton data-page="sbp" onClick={handleChangePage} css={{color: 'var(--color-primary)'}}>
                  Перевод по номеру телефона
                </LinkButton>
              ) : null}
            </div>
          </FormField>
          <FormField>
            <Button
              css={{
                width: '100%',
                height: 44,
                borderRadius: 28,
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
          </FormField>
          <FormField css={{alignItems: 'center', justifyContent: 'center'}}>
            <SecuritySign />
          </FormField>
        </Form>
      </Screen>
    </AppPage>
  );
}

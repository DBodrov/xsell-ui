import React from 'react';
import {Span, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {AppPage, Screen} from 'components/Layout';
import {H1, H2, Form, FormField, LinkButton, SecuritySign} from 'components/lib';
import {BanksLogosBlock} from './BanksLogosBlock';

type Props = {
  hasCards: boolean;
  onChangePage: (page: string) => void;
};

export function TransferSBPPage({onChangePage, hasCards}: Props) {
  const {updateAnketa} = useAnketa();

  const handleChangePage = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const pageType = e.currentTarget.dataset.page;
      onChangePage(pageType);
    },
    [onChangePage],
  );

  const handleSendSBPTransfer = () => {
    updateAnketa('TRANSFER_DETAILS_SBP', {});
  };

  return (
    <AppPage>
      <Screen>
        <H1>Перевод по номеру телефона</H1>
        <Form>
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
              <H2>Куда перевести?</H2>
              <Span
                css={{
                  display: 'block',
                  marginTop: 16,
                  fontSize: 18,
                  lineHeight: '24px',
                  fontWeight: 700,
                  color: '#000',
                }}
              >
                СБП работает в больше чем 180 крупнейших банков РФ
              </Span>
              <BanksLogosBlock />
              <Span>
                Для перевода применяется СБП (сервис быстрых платежей). Деньги будут зачислены на карту ОТП
                Банка. Далее в мобильном приложении вы сможете перевести деньги в любой банк, где у вас есть
                счёт, по номеру вашего телефона.
              </Span>
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
              {hasCards ? (
                <LinkButton
                  data-page="cards"
                  onClick={handleChangePage}
                  css={{color: 'var(--color-primary)'}}
                >
                  Перевод на карту
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
              onClick={handleSendSBPTransfer}
              type="button"
              variant="primary"
              flat
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

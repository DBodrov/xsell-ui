import React from 'react';
import {Span, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {AppPage} from 'components/Layout';
import {H1, H2} from 'components/lib';
import {BanksLogosBlock} from './BanksLogosBlock';
import {Page} from './styles';


type Props = {
  hasCards: boolean;
  onChangePage: (page: string) => void;
}

export function TransferSBPPage({onChangePage, hasCards}: Props) {
  const {updateAnketa} = useAnketa();

  const handleSendSBPTransfer = () => {
    updateAnketa('TRANSFER_DETAILS_SBP', {});
  }

  return (
    <AppPage>
      <Page css={{backgroundColor: '#f0f0f0'}}>
        <H1>Перевод по номеру телефона</H1>
        <div
          css={{
            backgroundColor: '#fff',
            border: '1px #c5c5c5 solid',
            borderRadius: 4,
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
            Для перевода применяется СБП (сервис быстрых платежей). Деньги будут зачислены на карту ОТП Банка.
            Далее в мобильном приложении вы сможете перевести деньги в любой банк, где у вас есть счёт, по
            номеру вашего телефона.
          </Span>
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
          onClick={handleSendSBPTransfer}
          type="button"
          variant="primary"
          flat
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
          onClick={() => onChangePage('account')}
          type="button"
          variant="primary"
          outline
          flat
        >
          Перевод на счёт в другой банк
        </Button>
        {hasCards ? (
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
            onClick={() => onChangePage('cards')}
            type="button"
            variant="primary"
            outline
            flat
          >
            Перевод на карту
          </Button>
        ) : null}
      </Page>
    </AppPage>
  );
}

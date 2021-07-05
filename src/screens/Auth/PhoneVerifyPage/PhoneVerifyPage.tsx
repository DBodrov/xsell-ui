import React from 'react';
import {P, Span} from 'neutrino-ui';
import {AppPage} from 'components/Layout';
import {FooterDisclaimer, FooterSection} from 'components/Layout/AppPage/Footer/styles';
import {H1, SecuritySign, LinkButton} from 'components/lib';
import {OPROSSO} from 'utils/externals';
import {SMSForm} from './SMSForm';
import {Page} from './styles';

export function PhoneVerifyPage() {

  const openOprosso = () => window.location.assign(OPROSSO.AUTH2_REQUIRED);

  return (
    <AppPage noStepper>
      <Page>
        <H1 css={{margin: '24px 0 16px'}}>Подтвердите вход</H1>
        <P>Введите СМС которая придёт на ваш номер.</P>
        <SMSForm />
        <div css={{paddingTop: '2rem', '@media (max-width: 575px)': {alignSelf: 'center'}}}>
          <SecuritySign />
        </div>
      </Page>
      <FooterSection>
        <FooterDisclaimer>
          <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
          <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
        </FooterDisclaimer>
        <LinkButton css={{color: 'var(--color-primary)', fontSize: 14}} onClick={openOprosso}>
          Ваше мнение об онлайн-кредите
        </LinkButton>
        </FooterSection>
    </AppPage>
  );
}

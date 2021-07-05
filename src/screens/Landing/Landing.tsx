import React, {useCallback, useState} from 'react';
import {Span} from 'neutrino-ui';
import {PageLayout} from 'components/Layout';
import {LinkButton} from 'components/lib';
import {FooterSection, FooterDisclaimer} from 'components/Layout/AppPage/Footer/styles';
import {useFetch} from 'utils/use-fetch';
import {OPROSSO} from 'utils/externals';
import {usePageView, userEvents} from 'utils/use-page-view';
import {HeroLanding3} from './HeroLandings';
import {Offer} from './Offer';
import {RejectModal} from './RejectModal';
import {LandingProps} from './types';

export function Landing({onNextPage}: LandingProps) {
  const [modalState, setModalState] = useState({showModal: false, showThanks: false});
  usePageView('/landing');
  const fetchClient = useFetch();

  const handleOfferReject = useCallback(
    (reason: string) => {
      userEvents({category: 'LANDING', action: reason});
      fetchClient('/gateway/reject-offer', {body: {offerRejectedReason: reason}});
    },
    [fetchClient],
  );

  const handleNotInterested = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!modalState.showModal) {
        setModalState(s => ({...s, showModal: true, showThanks: false}));
      }
      const reason = e.currentTarget.innerText;
      handleOfferReject(reason);
    },
    [handleOfferReject, modalState.showModal],
  );

  const openOprosso = () => window.location.assign(OPROSSO.LANDING);

  return (
    <PageLayout>
      <HeroLanding3 onNextPage={onNextPage} notInterested={handleNotInterested} />
      <Offer />
      <RejectModal modalState={modalState} setState={setModalState} sendAnswer={handleNotInterested} />
      <FooterSection css={{marginTop: 32}}>
        <FooterDisclaimer>
          <Span css={{fontSize: 14}}>Заявка оформлется через АО «ОТП Банк» </Span>
          <Span css={{fontSize: 14}}> (Ген.лицензия № 2766 от 27.11.2014г).</Span>
        </FooterDisclaimer>
        <LinkButton css={{color: 'var(--color-primary)', fontSize: 14}} onClick={openOprosso}>
          Ваше мнение об онлайн-кредите
        </LinkButton>
      </FooterSection>
    </PageLayout>
  );
}

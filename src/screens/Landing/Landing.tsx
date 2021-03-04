import React, {useCallback, useState} from 'react';
import {PageLayout} from 'components/Layout/PageLayout';
import {useFetch} from 'utils/use-fetch';
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

  return (
    <PageLayout>
      <HeroLanding3 onNextPage={onNextPage} notInterested={handleNotInterested} />
      <Offer />
      <RejectModal modalState={modalState} setState={setModalState} sendAnswer={handleNotInterested} />
    </PageLayout>
  );
}

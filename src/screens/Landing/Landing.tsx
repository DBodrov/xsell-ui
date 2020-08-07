import React, {useCallback, useState} from 'react';
import {PageLayout} from 'components/Layout/PageLayout';
import {useFetch} from 'utils/use-fetch';
import {HeroLanding1, HeroLanding2, HeroLanding3, HeroLanding4} from './HeroLandings';
import {Offer} from './Offer';
import {RejectModal} from './RejectModal';
import {LandingProps} from './types';

export function Landing({landingCode, onNextPage}: LandingProps) {
  const [modalState, setModalState] = useState({showModal: false, showThanks: false});

  const fetchClient = useFetch();

  const handleOfferReject = useCallback(
    (reason: string) => {
      fetchClient(' /gateway/reject-offer', {body: {offerRejectedReason: reason}});
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

  const renderHeroLanding = () => {
    switch (landingCode) {
      case 'LANDING_TEST_1':
      default:
        return <HeroLanding1 onNextPage={onNextPage} notInterested={handleNotInterested} />;
      case 'LANDING_TEST_2': {
        return <HeroLanding2 onNextPage={onNextPage} notInterested={handleNotInterested} />;
      }
      case 'LANDING_TEST_3': {
        return <HeroLanding3 onNextPage={onNextPage} notInterested={handleNotInterested} />;
      }
      case 'LANDING_TEST_4': {
        return <HeroLanding4 onNextPage={onNextPage} notInterested={handleNotInterested} />;
      }
    }
  };
  return (
    <PageLayout>
      {renderHeroLanding()}
      <Offer />
      <RejectModal modalState={modalState} setState={setModalState} sendAnswer={handleNotInterested} />
    </PageLayout>
  );
}

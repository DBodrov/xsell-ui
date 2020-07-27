import React from 'react';
import { PageLayout } from 'components/Layout/PageLayout';
import { HeroLanding1, HeroLanding2, HeroLanding3, HeroLanding4 } from './HeroLandings';
import { Offer } from './Offer';
import { LandingProps } from './types';

export function Landing({ landingCode, onNextPage }: LandingProps) {
  const renderHeroLanding = () => {
    switch (landingCode) {
      case 'LANDING_TEST_1':
      default:
        return <HeroLanding1 onNextPage={onNextPage} />;
      case 'LANDING_TEST_2': {
        return <HeroLanding2 onNextPage={onNextPage} />;
      }
      case 'LANDING_TEST_3': {
        return <HeroLanding3 onNextPage={onNextPage} />;
      }
      case 'LANDING_TEST_4': {
        return <HeroLanding4 onNextPage={onNextPage} />;
      }
    }
  };
  return (
    <PageLayout>
      {renderHeroLanding()}
      <Offer />
    </PageLayout>
  );
}

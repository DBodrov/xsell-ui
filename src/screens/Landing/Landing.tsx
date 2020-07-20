import React from 'react';
import { PageLayout } from 'components/Layout/PageLayout';
import { HeroLanding } from './HeroLanding';
import { Offer } from './Offer';
import { LandingProps } from './types';

export function Landing(props: LandingProps) {
  return (
    <PageLayout>
      <HeroLanding {...props} />
      <Offer />
    </PageLayout>
  );
}

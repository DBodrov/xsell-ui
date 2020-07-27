import React from 'react';
import { Button } from 'neutrino-ui';
import { HeroText } from 'components/lib';
import {LandingContent} from '../styles';
import { LandingHeader } from './LandingHeader';
import { baseStyles, landing1Styles, landing1ImageStyles } from './styles';
import { getImageUrlFromBucket } from './utils';

type Props = {
  onNextPage: () => void;
}
export function HeroLanding1({ onNextPage }: Props) {
  const imageSrc = getImageUrlFromBucket('girl');
  return (
    <div css={[baseStyles, landing1Styles]}>
      <LandingContent>
        <LandingHeader />
        <HeroText css={{ width: '60%' }}>Кредит наличными</HeroText>
        <span css={{ fontSize: 18, width: '50%' }}>Получить онлайн на любые цели</span>
        <Button
          onClick={onNextPage}
          variant="primary"
          flat
          css={{ width: 284, position: 'absolute', bottom: 55, zIndex: 1 }}>
          Получить онлайн
        </Button>
        <img src={imageSrc} alt="picture" aria-hidden css={landing1ImageStyles} />
      </LandingContent>
    </div>
  );
}

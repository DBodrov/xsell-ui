import React from 'react';
import { Button } from 'neutrino-ui';
import { HeroText, LinkButton } from 'components/lib';
import { LandingContent } from '../styles';
import { LandingHeader } from './LandingHeader';
import { baseStyles, landing1Styles, landing1ImageStyles } from './styles';
import { getImageUrlFromBucket } from './utils';
import { HeroLandingProps } from './types';

const imageSrc = getImageUrlFromBucket('girl');

export function HeroLanding1({ onNextPage, notInterested }: HeroLandingProps) {

  return (
    <div css={[baseStyles, landing1Styles]}>
      <LandingContent>
        <LandingHeader />
        <HeroText css={{ width: '60%' }}>Кредит наличными</HeroText>
        <span css={{ fontSize: 18, width: '50%' }}>Получить онлайн на любые цели</span>
        <div
          css={{ display: 'flex', flexFlow: 'column nowrap', position: 'absolute', bottom: 55, zIndex: 1 }}>
          <Button onClick={onNextPage} variant="primary" flat css={{ width: 284, marginBottom: 16 }}>
            Получить онлайн
          </Button>
          <LinkButton css={{ alignSelf: 'center' }} onClick={notInterested}>
            Не интересно
          </LinkButton>
        </div>
        <img src={imageSrc} alt="picture" aria-hidden css={landing1ImageStyles} />
      </LandingContent>
    </div>
  );
}

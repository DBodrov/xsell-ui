import React from 'react';
import { Button } from 'neutrino-ui';
import { HeroText } from 'components/lib';
import { LandingHeader } from './LandingHeader';
import { baseStyles, StylesMap, LandingContent } from './styles';
import { getImageUrlFromBucket } from './utils';
import { LandingProps } from './types';

export function HeroLanding({ landingCode, onNextPage }: LandingProps) {
  const imageSrc = getImageUrlFromBucket(StylesMap.get(landingCode).imageName);

  return (
    <div css={[baseStyles, StylesMap.get(landingCode).heroStyles]}>
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
        <img src={imageSrc} alt="picture" aria-hidden css={StylesMap.get(landingCode).imageStyles} />
      </LandingContent>
    </div>
  );
}

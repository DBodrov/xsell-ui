import React from 'react';
import { css } from '@emotion/core';
import { Button } from 'neutrino-ui';
import { HeroText } from 'components/lib';
import { LandingHeader } from './LandingHeader';
import {LandingContent} from '../styles';
import { baseStyles, landing4HeroStyles, landing4GirlImageStyles, PlankShadow, doorStyles, plankStyles } from './styles';
import { getImageUrlFromBucket } from './utils';

type Props = {
  onNextPage: () => void;
};

const imageSrc = getImageUrlFromBucket('girl_4');
const doorSrc = getImageUrlFromBucket('door');
const furnSrc = getImageUrlFromBucket('furn');

export function HeroLanding4({ onNextPage }: Props) {
  return (
    <div
      css={[
        baseStyles,
        landing4HeroStyles,
        css`
          position: relative;
        `,
      ]}>
      <LandingContent>
        <LandingHeader />
        <HeroText css={{ width: '60%' }}>Кредит наличными</HeroText>
        <span css={{ fontSize: 16, lineHeight: '20px', width: '50%', zIndex: 1 }}>
          Получить онлайн на любые цели
        </span>
        <Button
          onClick={onNextPage}
          variant="primary"
          flat
          css={{ width: 284, position: 'absolute', bottom: 55, zIndex: 1 }}>
          Получить онлайн
        </Button>
        <img src={doorSrc} alt="picture" aria-hidden css={doorStyles} />
        <div css={plankStyles}>
          <PlankShadow />
          <img src={furnSrc} alt="picture" aria-hidden css={{ height: '100%' }} />
        </div>
        <img src={imageSrc} alt="picture" aria-hidden css={landing4GirlImageStyles} />
      </LandingContent>
    </div>
  );
}

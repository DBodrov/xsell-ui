import React from 'react';
import { css } from '@emotion/core';
import { Button } from 'neutrino-ui';
import { HeroText, LinkButton } from 'components/lib';
import { LandingContent } from '../styles';
import { LandingHeader } from './LandingHeader';
import { baseStyles, landing2ImageStyles } from './styles';
import { getImageUrlFromBucket } from './utils';
import { HeroLandingProps } from './types';

const imageSrc = getImageUrlFromBucket('family');
const bgSrc = getImageUrlFromBucket('tilefamily');

export function HeroLanding2({ onNextPage, notInterested }: HeroLandingProps) {
  return (
    <div
      css={[
        baseStyles,
        css`
          position: relative;
        `,
      ]}>
      <img
        src={bgSrc}
        alt="background"
        css={{ width: '100%', height: '390px', position: 'absolute', top: 0, left: 0 }}
      />
      <LandingContent>
        <LandingHeader />
        <HeroText css={{ width: '60%' }}>Кредит наличными</HeroText>
        <span css={{ fontSize: 16, lineHeight: '20px', width: '50%', zIndex: 1 }}>
          Получить онлайн на любые цели
        </span>
        <div
          css={{ display: 'flex', flexFlow: 'column nowrap', position: 'absolute', bottom: 55, zIndex: 1 }}>
          <Button onClick={onNextPage} variant="primary" flat css={{ width: 284, marginBottom: 16 }}>
            Получить онлайн
          </Button>
          <LinkButton css={{ alignSelf: 'center', color: '#fff' }} onClick={notInterested}>
            Не интересно
          </LinkButton>
        </div>
        <img src={imageSrc} alt="picture" aria-hidden css={landing2ImageStyles} />
      </LandingContent>
    </div>
  );
}

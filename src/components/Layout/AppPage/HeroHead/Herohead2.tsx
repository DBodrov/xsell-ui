import React from 'react';
import {css} from '@emotion/react';
import {HeroText} from 'components/lib';
import {LandingHeader} from 'screens/Landing/HeroLandings/LandingHeader';
import {LandingContent} from 'screens/Landing/styles';
import {getImageUrlFromBucket} from 'screens/Landing/HeroLandings/utils';

import {baseStyles, landing2ImageStyles} from 'screens/Landing/HeroLandings/styles';

const imageSrc = getImageUrlFromBucket('family');
const bgSrc = getImageUrlFromBucket('tilefamily');

export function Herohead2() {
  return (
    <div
      css={[
        baseStyles,
        css`
          position: relative;
        `,
      ]}
    >
      <img
        src={bgSrc}
        alt="background"
        css={{width: '100%', height: '390px', position: 'absolute', top: 0, left: 0}}
      />
      <LandingContent>
        <LandingHeader />
        <HeroText css={{width: '60%'}}>Кредит наличными</HeroText>
        <span css={{fontSize: 16, lineHeight: '20px', width: '50%', zIndex: 1}}>
          Получить онлайн на любые цели
        </span>
        <img src={imageSrc} alt="Кредит наличными" aria-hidden css={landing2ImageStyles} />
      </LandingContent>
    </div>
  );
}

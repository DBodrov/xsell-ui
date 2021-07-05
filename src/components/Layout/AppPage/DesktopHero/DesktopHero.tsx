import React from 'react';
import {css} from '@emotion/react';
import {HeroText} from 'components/lib';
import {HERO_IMG_URL} from 'utils/externals';
import {LandingHeader} from 'screens/Landing/HeroLandings/LandingHeader';
import {LandingContent} from 'screens/Landing/styles';
import {getImageUrlFromBucket} from 'screens/Landing/HeroLandings/utils';

import {baseStyles, landing2ImageStyles} from 'screens/Landing/HeroLandings/styles';
import {HeroHeader} from './HeroHeader';
import {HeroSection, HeroContent, HeroImage} from './styles';



export function DesktopHero() {
  return (
    <HeroSection>
      <HeroContent>
        <HeroHeader color="#CCC" />
        <HeroText css={{width: '60%'}}>Кредит наличными</HeroText>
        <span css={{fontSize: 18, width: '50%', zIndex: 1}}>Получить онлайн на любые цели</span>
        <HeroImage src={HERO_IMG_URL} alt="Кредит наличными" aria-hidden />
      </HeroContent>
    </HeroSection>
  )
}

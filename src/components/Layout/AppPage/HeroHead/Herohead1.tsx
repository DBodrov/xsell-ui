import React from 'react';
import {HeroText} from 'components/lib';
import {LandingHeader} from 'screens/Landing/HeroLandings/LandingHeader';
import {LandingContent} from 'screens/Landing/styles';
import {getImageUrlFromBucket} from 'screens/Landing/HeroLandings/utils';

import {baseStyles, landing1Styles, landing1ImageStyles} from 'screens/Landing/HeroLandings/styles';

const imageSrc = getImageUrlFromBucket('girl');

export function Herohead1() {
  return (
    <div css={[baseStyles, landing1Styles]}>
      <LandingContent>
        <LandingHeader />
        <HeroText css={{width: '60%'}}>Кредит наличными</HeroText>
        <span css={{fontSize: 18, width: '50%'}}>Получить онлайн на любые цели</span>
        <img src={imageSrc} alt="Кредит наличными" aria-hidden css={landing1ImageStyles} />
      </LandingContent>
    </div>
  );
}

import React from 'react';
import {useMedia} from 'utils/use-media';
import {AppPageHeader} from './AppPageHeader';
import {Stepper} from './Stepper';
import {DesktopHero} from './DesktopHero';
import {Footer} from './Footer';
import {AppPageLayout, Content} from './styles';

type Props = {
  children: React.ReactNode;
  noStepper?: boolean;
};

export function AppPage({children, noStepper}: Props) {
  const isMobile = useMedia('(max-width: 575px)');

  return (
    <AppPageLayout noStepper={noStepper}>
      {isMobile ? <AppPageHeader /> : <DesktopHero />}
      <Content>
        {noStepper ? null : <Stepper css={{width: 288, margin: isMobile ? 0 : '32px 0 0 48px'}} />}
        {children}
        <Footer />
      </Content>
    </AppPageLayout>
  );
}

import React from 'react';
import {useMedia} from 'utils/use-media';
import {useAuth} from 'context/Auth';
import {AppPageHeader} from './AppPageHeader';
import {Stepper} from './Stepper';
import {Herohead1, Herohead2} from './HeroHead';
import {
  AppPageMobileLayout,
  AppPageDesktopLayout,
  ContentDesktop,
  ContentDesktopAndFooter,
  ContentDesktopSection,
  Footer,
} from './styles';

type Props = {
  children: React.ReactNode;
  noStepper?: boolean;
};

export function AppPage({children, noStepper}: Props) {
  const isMobile = useMedia('(max-width: 575px)');
  const {clientSettings} = useAuth();
  const landingCode = clientSettings?.landingCode ?? 'LANDING_TEST_1';

  const renderHeroHead = React.useCallback((landingCode: string) => {
    switch (landingCode) {
      case 'LANDING_TEST_1':
      default:
        return <Herohead1 />;
      case 'LANDING_TEST_2':
        return <Herohead2 />;
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <AppPageMobileLayout noStepper={noStepper}>
          <AppPageHeader />
          {!noStepper && <Stepper />}
          {children}
        </AppPageMobileLayout>
      ) : (
        <AppPageDesktopLayout>
          {renderHeroHead(landingCode)}
          <ContentDesktopSection>
            <ContentDesktopAndFooter>
              <ContentDesktop>
                {noStepper ? null : <Stepper css={{width: 288, margin: '32px 0 0 48px'}} />}
                {children}
              </ContentDesktop>
              <Footer>Footer</Footer>
            </ContentDesktopAndFooter>
          </ContentDesktopSection>
        </AppPageDesktopLayout>
      )}
    </>
  );
}

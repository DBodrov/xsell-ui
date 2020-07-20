import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { AppPageHeader } from './AppPageHeader';

const AppPageMobileLayout = styled.div`
  display: grid;
  grid-template: auto 1fr / 1fr;
  max-width: 704px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: auto;
  background-color: #fff;
`;

const Step = styled.div`
  display: inline-block;
  width: 100%;
  height: 4px;
  margin-right: 10px;
  &::last-of-type {
    margin-right: 0;
  }
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive ? 'var(--color-primary)' : '#8e939f'};
`;

function Stepper() {
  const { state: { step = 1 } = {} } = useLocation<{ step: number }>();

  return (
    <div
      css={{
        display: 'grid',
        gridTemplate: '4px / repeat(5, 1fr)',
        columnGap: 10,
        placeItems: 'center',
        padding: '5px 10px',
      }}>
      <Step isActive={step >= 1} />
      <Step isActive={step >= 2} />
      <Step isActive={step >= 3} />
      <Step isActive={step >= 4} />
      <Step isActive={step >= 5} />
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  noStepper?: boolean;
};
export function AppPage({ children, noStepper }: Props) {
  return (
    <AppPageMobileLayout>
      <div>
        <AppPageHeader />
        {!noStepper && <Stepper />}
      </div>
      {children}
    </AppPageMobileLayout>
  );
}

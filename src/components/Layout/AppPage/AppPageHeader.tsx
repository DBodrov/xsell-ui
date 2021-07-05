import React from 'react';
import styled from '@emotion/styled';
import {OtpLogo} from 'icons';

const Header = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-height: 40px;
  justify-content: space-between;
  padding: 10px 10px 0;
  z-index: 1;
`;

const TopHead = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export function AppPageHeader() {
  return (
    <Header>
      <TopHead>
        <OtpLogo />
      </TopHead>
    </Header>
  );
}

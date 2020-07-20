import React from 'react';
import styled from '@emotion/styled';
import { OtpLogo, ShieldIcon } from 'icons';

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
        <div
          css={{
            display: 'flex',
            flexFlow: 'row nowrap',
            width: '55%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <ShieldIcon css={{ minWidth: 26 }} />
          <span css={{ color: '#C5C5C5', fontSize: 10, paddingLeft: 10 }}>
            Гарантируем безопасность ваших данных
          </span>
        </div>
      </TopHead>
    </Header>
  );
}

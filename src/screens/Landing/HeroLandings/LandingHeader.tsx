import React from 'react';
import styled from '@emotion/styled';
import { OtpLogo, ShieldIcon } from 'icons';

const Header = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 74px;
  justify-content: space-between;
  padding: 10px 0 0;
  margin-bottom: 15px;
  z-index: 1;
  @media (min-width: 768px) {
    margin-bottom: 32px;
  }
`;

const TagList = styled.ul`
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Tag = styled.li`
  display: block;
  border: 1px var(--color-primary) solid;
  border-radius: 4px;
  background-color: #fff;
  color: var(--color-primary);
  font-size: 14px;
  line-height: 14px;
  padding: 1px 6px 4px 4px;
  margin-right: 4px;
`;

const TopHead = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export function LandingHeader({ color = '#fff' }: { color?: string }) {
  return (
    <Header>
      <TopHead>
        <OtpLogo monocolor={color} />
        <div
          css={{
            display: 'flex',
            flexFlow: 'row nowrap',
            width: '55%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <ShieldIcon stroke={color} css={{ minWidth: 26 }} />
          <span css={{ color, fontSize: 10, paddingLeft: 10 }}>
            Гарантируем безопасность ваших данных
          </span>
        </div>
      </TopHead>
      <TagList>
        <Tag>кредит</Tag>
        <Tag>просто</Tag>
        <Tag>деньги</Tag>
        <Tag>онлайн</Tag>
      </TagList>
    </Header>
  );
}

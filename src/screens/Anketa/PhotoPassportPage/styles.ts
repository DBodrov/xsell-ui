import styled from '@emotion/styled';

export const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 24px 48px;
  @media (max-width: 575px) {
    padding: 24px 16px;
  }
`;

export const ConfirmForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 1rem;
  border: 1px var(--color-border) solid;
  border-radius: 4px;
`;

import styled from '@emotion/styled';

export const FooterSection = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100px;
`;

export const FooterDisclaimer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.25rem;
  @media (max-width: 575px) {
    flex-flow: column nowrap;
  }

`;

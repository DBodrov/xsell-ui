import styled from '@emotion/styled';

export const HeroText = styled.span`
  font-family: 'Squad Heavy';
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: 48px;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
  }
`;

export const HeroSubText = styled.span`
  font-family: Squad;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 32px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
  }
`;

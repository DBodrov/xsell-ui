import styled from '@emotion/styled';
import {css} from '@emotion/react';

const baseHeading = css`
  font-family: Squad, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: #000;
`;

export const H1 = styled.h1`
  ${baseHeading};
  font-size: 32px;
  line-height: 40px;
  /* @media (max-width: 768px) {
    font-size: 28px;
    line-height: 32px;
  } */
`;

export const H2 = styled.h2`
  ${baseHeading};
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
`;

export const H3 = styled.h3`
  ${baseHeading};
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
`;

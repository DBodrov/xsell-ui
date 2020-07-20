import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const StylesMap = new Map([
  [
    'LANDING_TEST_3',
    {
      imageName: 'girl',
      heroStyles: css`
        background: linear-gradient(
          180deg,
          #e6e7e9 0%,
          #eaebed 18.86%,
          #e4e5e7 69.27%,
          #dfe0e2 84.06%,
          #d2d3d5 100%
        );
      `,
      imageStyles: css`
        height: 350px;
        position: absolute;
        bottom: 0;
        right: -75px;
        @media (min-width: 375px) {
          right: 0;
        }
      `,
    },
  ],
]);

export const baseStyles = css`
  display: flex;
  width: 100%;
  height: 390px;
`;

export const LandingContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 704px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0 1rem;
  position: relative;
`;

export const OfferContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const OfferList = styled.div`
  flex: 1 1 320px;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 0 0 1rem;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const baseStyles = css`
  display: flex;
  width: 100%;
  min-height: 390px;
  overflow: hidden;
`;

export const landing1Styles = css`
  background: linear-gradient(
    180deg,
    #e6e7e9 0%,
    #eaebed 18.86%,
    #e4e5e7 69.27%,
    #dfe0e2 84.06%,
    #d2d3d5 100%
  );
`;

export const landing1ImageStyles = css`
  height: 350px;
  position: absolute;
  bottom: 0;
  right: -75px;
  transition: all 0.9s ease-in-out;
  @media (min-width: 375px) {
    right: 0;
  }
`;

export const landing2ImageStyles = css`
  max-width: 560px;
  height: 230px;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
  transition: all 0.9s ease-in-out;
  @media (max-width: 414px) {
    right: -70px;
  }
`;

export const landing3HeroStyles = css`
  background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 38.67%, #ededed 100%);
`;

export const landing3ImageStyles = css`
  height: 330px;
  max-width: 350px;
  position: absolute;
  bottom: 0;
  right: -75px;
  transition: all 0.9s ease-in-out;
  z-index: 0;
  @media (min-width: 768px) {
    right: 0;
  }
`;

export const landing4HeroStyles = css`
  background: linear-gradient(180deg, #dec0a3 0%, #e8d7c7 41.67%, #e8d7c7 70.31%, #e2c9b2 100%);
`;

export const landing4GirlImageStyles = css`
  max-width: 150px;
  height: 320px;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 10px;
  z-index: 0;
  transition: all 0.9s ease-in-out;
`;

export const doorStyles = css`
  position: absolute;
  top: 66px;
  max-width: 170px;
  height: 360px;
  z-index: 0;
  right: 100px;
  transition: all 0.9s ease-in-out;
  @media (max-width: 767px) {
    right: -130px;
  }
`;

export const plankStyles = css`
  position: absolute;
  top: 0;
  max-width: 155px;
  height: 100%;
  right: 160px;
  transition: all 0.9s ease-in-out;
  @media (max-width: 767px) {
    right: -10px;
  }
`;

export const PlankShadow = styled.div`
  position: absolute;
  top: -60px;
  left: -30px;
  width: 56px;
  height: 100%;
  background: linear-gradient(180deg, #363636 -5.41%, rgba(180, 157, 136, 0.3) 100%);
  opacity: 0.3;
  filter: blur(8px);
  transition: all 0.9s ease-in-out;
`;

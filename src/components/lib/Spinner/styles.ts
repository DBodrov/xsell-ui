// $width: 100px;
import styled from '@emotion/styled';
import {css, keyframes} from '@emotion/react';

export const SpinnerScreen = styled.div<{hasOverlay: boolean}>`
  margin: 0 auto;
  transform: translateY(50%);
  ${props => (props.hasOverlay ? overlayCss : noOverlayCss)}
`;

export const overlayCss = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  transform: translateY(0%);
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(171, 180, 189, 0.9);
`;

const noOverlayCss = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  transform: translateY(0%);
`;

export const defaultLoaderCss = css`
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;
`;

// export const SpinnerScreen = styled.div<{hasOverlay: boolean}>`
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   transform: translateY(0%);
//   top: 0;
//   left: 0;
//   z-index: 9999;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(171,180,189, 0.9);
// `;

// .Loader {
//   position: relative;
//   margin: 0 auto;
//   width: $width;
//   z-index: $layer-sticky;

//   &:before {
//     content: '';
//     display: block;
//     padding-top: 100%;
//   }
// }

// .Message {
//   @include font-base;

//   font-weight: 600;
//   font-size: 1.2rem;
//   margin: 0 auto;

//   .WithBackdrop & {
//     color: $white;
//   }
// }

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const color = keyframes`
  100%,
  0% {
    stroke: var(--color-primary);
  }
  40% {
    stroke: var(--color-secondary);
  }
  66% {
    stroke: var(--color-primary);
  }
  80%,
  90% {
    stroke: var(--color-secondary);
  }
`;

const rotate = keyframes`
  100% {
     transform: rotate(360deg);
    }
 `;

export const circularCss = css`
  animation: ${rotate} 1s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const pathCss = css`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite, ${color} 6s ease-in-out infinite;
  stroke-linecap: round;
`;


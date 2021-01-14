// $width: 100px;
import styled from '@emotion/styled';
import {css} from '@emotion/react';

export const Spinner = styled.div`
  margin: 0 auto;
  transform: translateY(50%);
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
  background-color: rgba(171,180,189, 0.9);
`;


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

// .Circular {
//   animation: rotate 1s linear infinite;
//   height: 100%;
//   transform-origin: center center;
//   width: 100%;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
// }

// .Path {
//   stroke-dasharray: 1, 200;
//   stroke-dashoffset: 0;
//   animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
//   stroke-linecap: round;
// }

// @keyframes rotate {
//   100% {
//     transform: rotate(360deg);
//   }
// }

// @keyframes dash {
//   0% {
//     stroke-dasharray: 1, 200;
//     stroke-dashoffset: 0;
//   }
//   50% {
//     stroke-dasharray: 89, 200;
//     stroke-dashoffset: -35px;
//   }
//   100% {
//     stroke-dasharray: 89, 200;
//     stroke-dashoffset: -124px;
//   }
// }

// @keyframes color {
//   100%,
//   0% {
//     stroke: $green-primary;
//   }
//   40% {
//     stroke: $yellow;
//   }
//   66% {
//     stroke: $otp-blue;
//   }
//   80%,
//   90% {
//     stroke: $orange-300;
//   }
// }

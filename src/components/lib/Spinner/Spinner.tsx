import React from 'react';
import {SerializedStyles} from '@emotion/react';
import {SpinnerScreen, defaultLoaderCss, circularCss, pathCss} from './styles';


interface ISpinnerProps {
  className?: string;

  loaderCss?: SerializedStyles;

  withBackdrop?: boolean;
  message?: string;
}

export function Spinner(props: ISpinnerProps) {
  const {withBackdrop = false, message, className, loaderCss} = props;


  return (
    <SpinnerScreen hasOverlay={withBackdrop} className={className}>
      <div css={[defaultLoaderCss, loaderCss]}>
        <svg css={circularCss} viewBox="25 25 50 50">
          <circle
            css={pathCss}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>

      {message && <span css={{fontSize: '1.5rem', fontWeight: 600}}>{message}</span>}
    </SpinnerScreen>
  );
}

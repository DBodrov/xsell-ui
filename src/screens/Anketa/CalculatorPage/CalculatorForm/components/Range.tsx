import React from 'react';
import styled from '@emotion/styled';

const RangeInput = styled.input<{hasError?: boolean}>`
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  border: 1px ${props => (props.hasError ? 'var(--color-error)' : 'var(--color-border)')} solid;
  border-radius: 12px;
  outline: 0;
  &:focus {
    border-color: ${props => (props.hasError ? 'var(--color-error)' : 'var(--color-primary)')};
  }
`;

const Slider = styled.input`
  position: absolute;
  bottom: -15px;
  left: 8px;
  width: calc(100% - 16px);
  height: 30px;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  background: transparent;


  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px !important;
    height: 24px !important;
    border: 4px #fff solid;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    box-shadow: 0px 5px 15px var(--color-border);
    margin-top: -11px;
  }

  &::-moz-range-thumb {
    appearance: none;
    max-width: 24px !important;
    max-height: 24px !important;
    border: 4px #fff solid;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    box-shadow: 0px 5px 15px var(--color-border);
  }


  &::-webkit-slider-runnable-track {
    box-sizing: border-box;
    border: none;
    width: 100%;
    height: 4px;
    background: var(--color-primary);
  }

  &::-moz-range-track {
    box-sizing: border-box;
    border: none;
    width: 100%;
    height: 4px;
    background: var(--color-primary);
  }
`;

interface IRangeProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (value: number) => void;
  showCurrency?: boolean;
  formatter?: (value: string | number | readonly string[]) => string | number | readonly string[];
  hasError?: boolean;
}

export function Range(props: IRangeProps) {
  const {value, min, max, step, onChange, showCurrency, formatter, onBlur, hasError = false} = props;
  const sliderRef = React.useRef<HTMLInputElement>(null);

  const handleChangeOnInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = e.currentTarget;
      const onlyDigits = value.replace(/\D/g, '');
      onChange(Number(onlyDigits));
    },
    [onChange],
  );

  const handleChangeOnSlider = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = e.currentTarget;
      onChange(Number(value));
    },
    [onChange],
  );

  const displayValue = () => {
    if (value === 0) return '';
    return formatter ? formatter(value) : value;
  };

  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap', position: 'relative', width: '100%', height: 56}}>
      <RangeInput
        type="tel"
        name="range-input"
        value={displayValue()}
        onChange={handleChangeOnInput}
        aria-label={props['aria-label']}
        onBlur={onBlur}
        hasError={hasError}
      />
      {showCurrency ? (
        <span
          css={{
            display: 'flex',
            flexFlow: 'row nowrap',
            position: 'absolute',
            top: 0,
            left: 'calc(100% - 56px)',
            width: 56,
            height: '100%',
            alignItems: 'center',
            padding: 4,
          }}
        >
          РУБ.
        </span>
      ) : null}
      <Slider
        type="range"
        name="slider"
        ref={sliderRef}
        value={value}
        min={min}
        step={step}
        max={max}
        onChange={handleChangeOnSlider}
      />
    </div>
  );
}

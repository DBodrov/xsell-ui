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
  bottom: -8px;
  left: 8px;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  align-self: 'center';
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

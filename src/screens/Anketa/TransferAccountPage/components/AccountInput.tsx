import React from 'react';
import {Input, Label} from 'components/lib';
import {onlyDigit} from 'utils/string.utils';

type TAccountInputProps = {
  wasSubmitted: boolean;
  onChange: (value: string) => void;
  onTouch: () => void;
  touched: boolean;
  value?: string;
  errorMessage?: string;
};

export function AccountInput(props: TAccountInputProps) {
  const {wasSubmitted, onChange, onTouch, errorMessage, value, touched} = props;
  const displayErrorMessage = (touched || wasSubmitted) && Boolean(errorMessage);

  const handleChange = React.useCallback((rawValue: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = onlyDigit(rawValue);
    if (val.length > 20) return;
    onChange(val);
  }, [onChange]);

  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap', marginBottom: '1rem'}}>
      <Label htmlFor="accountNumber">Ваш рублёвый счёт</Label>
      <Input
        id="accountNumber"
        css={{
          height: '3rem',
          fontWeight: 'bold',
          borderColor: displayErrorMessage ? 'var(--color-error)' : 'var(--color-border)',
          '&:hover, &:focus': {
            borderColor: displayErrorMessage ? 'var(--color-error)' : 'var(--color-primary)',
          },
        }}
        type="tel"
        name="accountNumber"
        onChangeHandler={handleChange}
        onBlur={onTouch}
        value={value}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label="Ваш рублёвый счёт"
      />
      {displayErrorMessage ? (
        <span role="alert" css={{color: 'var(--color-error)', fontSize: 12}}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

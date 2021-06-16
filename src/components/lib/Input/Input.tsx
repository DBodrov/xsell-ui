import React, {forwardRef} from 'react';
import {useTheme} from 'neutrino-ui';
import {StyledInput, createInputStyles} from './styles';
import {IInputProps} from './types';

export const Input = forwardRef((props: IInputProps, ref: React.RefObject<HTMLInputElement>) => {
  const {onChangeHandler, value, hasError, onFocusHandler, onBlurHandler, prefix, style, ...other} = props;

  const theme = useTheme();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const val = event.currentTarget.value;

    onChangeHandler(val, event);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    const val = event.target.value;
    onFocusHandler && onFocusHandler(val, event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    const val = event.target.value;
    if (typeof onBlurHandler === 'function') {
      onBlurHandler(val, event);
    }
  };

  return (
    <StyledInput
      ref={ref}
      type="text"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      css={createInputStyles(theme, props)}
      {...other}
    />
  );
});

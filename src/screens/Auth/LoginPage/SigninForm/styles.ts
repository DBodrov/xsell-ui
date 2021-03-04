import {css} from '@emotion/react';
import styled from '@emotion/styled';

export const ErrorText = styled.span`
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 0.5rem;
`;

export const placeholderStyles = css`
  &::placeholder {
    font-weight: normal;
    color: #ABABAB;
  }
`;

export const fieldStyles = css`
  width: 288px;
  height: 48px;
  transition: border 200ms ease-in;
  font: 600 1rem/24px 'Source Sans Pro';
  border-radius: 8px;
`;

export const birthDateFieldStyles = css`
  width: 288px;
  height: 48px;
  transition: border 200ms ease-in;
  font: 600 1rem/24px 'Source Sans Pro';
  border-radius: 8px;

  svg {
    stroke: var(--color-primary);
  }
`;

export const borderFieldStyles = css`
  border: 1px var(--color-border) solid;
  outline: 0;
  &:focus,
  &:hover {
    border-color: var(--color-primary);
  }
`;

export const countryCodeStyle = css`
  font: 600 1rem/24px 'Source Sans Pro';
`;

export const birthDateStyles = css([birthDateFieldStyles, placeholderStyles]);

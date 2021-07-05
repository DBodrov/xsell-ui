import styled from '@emotion/styled';

export const StyledInput = styled.input`
  width: 288px;
  height: 48px;
  padding: 12px 16px;
  transition: border 200ms ease-in;
  font: 600 1rem/24px 'Source Sans Pro';
  letter-spacing: 0.1em;
  border-radius: 8px;
  border: 1px var(--color-border) solid;
  outline: 0;
  &:focus,
  &:hover {
    border-color: var(--color-primary);
  }
`;

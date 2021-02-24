import styled from '@emotion/styled';
import {css} from '@emotion/react';

export const Form = styled.form`
  display: grid;
  grid-template: auto/1fr 1fr;
  column-gap: 32px;
  @media (max-width: 704px) {
    display: flex;
    flex-flow: column nowrap;
  }
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const fieldStyles = css`
  width: 288px;
  height: 48px;
  padding: 12px 16px;
  transition: border 200ms ease-in;
  font: 600 1rem/24px 'Source Sans Pro';
  border-radius: 8px;
`;

export const borderFieldStyles = css`
  border: 1px var(--color-border) solid;
  outline: 0;
  &:focus,
  &:hover {
    border-color: var(--color-primary);
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 288px;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  font: normal 400 14px/20px 'Source Sans Pro';
  color: var(--color-text-label);
  margin-bottom: 8px;
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: var(--color-text-error);
  margin-top: 8px;
`;

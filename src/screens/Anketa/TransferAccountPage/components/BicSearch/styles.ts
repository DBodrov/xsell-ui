import styled from '@emotion/styled';

export const BicInput = styled.input<{hasError: boolean}>`
  display: block;
  height: 3rem;
  padding: 0 0.5rem;
  border: 1px ${props => props.hasError ? 'var(--color-error)' : 'var(--color-border)'} solid;
  border-radius: 4px;
  outline: 0;
  font-size: 1rem;
  font-weight: bold;

  &:hover, &:focus {
    border: 1px ${props => props.hasError ? 'var(--color-error)' : 'var(--color-primary)'} solid;
  }
`;

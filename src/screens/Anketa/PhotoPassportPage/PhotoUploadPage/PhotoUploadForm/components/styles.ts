import styled from '@emotion/styled';

export const Field = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  min-width: 120px;
  max-width: 156px;
  width: 156px;
`;

export const PhotoButton = styled.button`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 128px;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 2px 6px 0 var(--color-border);

  &:hover {
    background-color: ${props => props.disabled ? '' : 'var(--color-border)'};
  }

  &:active {
    background-color: ${props => props.disabled ? '' : 'var(--color-text-label)' };
  }
`;

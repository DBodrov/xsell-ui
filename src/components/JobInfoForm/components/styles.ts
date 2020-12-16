import styled from '@emotion/styled';

export const SelectBox = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  height: 48px;
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  width: 100%;
  outline: 0;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    border-color: var(--color-primary);
    color: var(--color-text);
    background-color: var(--color-background);
`

import styled from '@emotion/styled';

export const SelectBox = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  height: 48px;
  padding: 12px 16px;
  font: 600 1rem/24px 'Source Sans Pro';
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  width: 288px;
  outline: 0;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    border-color: var(--color-primary);
    color: var(--color-text);
    background-color: var(--color-background);
  }
`;

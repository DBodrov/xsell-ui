import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  max-height: 300px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0px 16px 48px rgba(73, 92, 136, 0.15);

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px 4px;
  cursor: pointer;
`;

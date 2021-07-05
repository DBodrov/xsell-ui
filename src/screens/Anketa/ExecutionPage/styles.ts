import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const ModalCloseButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  align-self: flex-start;
`;

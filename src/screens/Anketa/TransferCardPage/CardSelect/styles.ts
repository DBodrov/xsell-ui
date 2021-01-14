import styled from '@emotion/styled';

export const CustomerCard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  width: 100%;
  min-width: 238px;
  padding: 12px;
`;

export const CardInputBox = styled(CustomerCard)`
  border: 1px var(--color-border) solid;
  border-radius: 4px;
  &:hover {
    border-color: var(--color-primary)};
    cursor: pointer;
  };
`;

export const CardsList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-height: 300px;
  overflow: auto;
  margin: 0;
  padding: 0;
  border: 1px var(--color-border) solid;
  border-radius: 4px;
  background-color: var(--color-background);
`;

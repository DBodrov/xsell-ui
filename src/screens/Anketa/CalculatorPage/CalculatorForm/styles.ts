import styled from '@emotion/styled';

export const MinmaxText = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  color: var(--color-text-label);
  padding-top: 4px;
`;

export const ConditionsCard = styled.article`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 288px;
  padding: 30px 25px 0px;
  margin-bottom: 24px;
  box-shadow: 0px 16px 48px rgba(73, 92, 136, 0.15);
  border-radius: 32px;
`;

export const PaymentDetails = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 0px;
  list-style: none;
`;

export const PaymentItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

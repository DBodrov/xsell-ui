import styled from '@emotion/styled';

export const PaymentAmount = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 2px 8px;
`;

export const OldPayment = styled.span`
  font-size: 20px;
  color: var(--color-text-label);
  text-decoration: line-through;
  line-height: 28px;
  padding-right: 8px;
`;

export const NewPayment = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: $primary;
  line-height: 28px;
`;

export const OldRate = styled.span`
  font-size: 14px;
  color: var(--color-text-label);
  text-decoration: line-through;
  padding-right: 4px;
`;

export const NewRate = styled(OldRate)`
  color: var(--color-primary);
  font-weight: 700;
`;

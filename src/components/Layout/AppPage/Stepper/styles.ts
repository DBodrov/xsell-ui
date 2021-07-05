import styled from '@emotion/styled';

export const Step = styled.div`
  display: inline-block;
  width: 100%;
  height: 4px;
  margin-right: 10px;
  &::last-of-type {
    margin-right: 0;
  }
  background-color: ${(props: {isActive: boolean}) => (props.isActive ? 'var(--color-primary)' : '#8e939f')};
`;

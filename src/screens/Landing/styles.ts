import styled from '@emotion/styled';

export const LandingContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 704px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0 1rem;
  position: relative;
`;

export const OfferContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 24px;
`;

export const OfferList = styled.div`
  flex: 1 1 320px;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 0 0 1rem;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

import styled from '@emotion/styled';

export const ArchiveForm = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background-color: #fff;
  position: relative;
  @media (max-width: 575px) {
    padding: 32px;
    margin: auto auto 0;
    max-width: 100%;
    border-radius: 0;
  }
  padding: 44px;
  margin: auto;
  min-height: 340px;
  max-width: 464px;
  border-radius: 32px;

`;

export const ArchiveFormHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  border: 0;
  outline: 0;
  max-width: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: transparent;
  align-self: flex-start;
`;

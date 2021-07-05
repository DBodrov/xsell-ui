import styled from '@emotion/styled';

export const Screen = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100% - 50px);
  background-color: #fff;
`;

export const Heading = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
  max-height: 450px;
  overflow: hidden;
`;

export const HeadImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const HeadText = styled.span`
  display: inline-block;
  position: absolute;
  width: 35%;
  max-width: 200px;
  top: 35%;
  left: 1rem;
  color: #fff;
  font-size: 28px;
  line-height: 35px;
  word-break: normal;
  background-color: rgba(0, 0, 0, 0.4);

  @media (min-width: 575px) {
    left: 10%;
  }
`;

export const Info = styled.article`
  display: block;
  width: 100%;
  padding: 1rem;

  @media (min-width: 575px) {
    padding: 1rem 10%;
  }

  p {
    line-height: 20px;
    padding-top: 8px;
  }
`;

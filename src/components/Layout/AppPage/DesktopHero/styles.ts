import styled from '@emotion/styled';

export const HeroSection = styled.section`
  display: flex;
  width: 100%;
  min-height: 390px;
  overflow: hidden;
  height: 390px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 38.67%, #ededed 100%);
`;

export const HeroContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 704px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

export const HeroImage = styled.img`
  height: 330px;
  max-width: 350px;
  position: absolute;
  bottom: 0;
  right: -75px;
  transition: all 0.9s ease-in-out;
  z-index: 0;
  @media (min-width: 768px) {
    right: 0;
  }
`;

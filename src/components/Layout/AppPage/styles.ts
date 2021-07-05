import styled from '@emotion/styled';

// const AppPageMobileLayout = styled.div<{noStepper: boolean}>`
//   display: grid;
//   grid-template: ${props => (props.noStepper ? 'auto 1fr / 1fr' : 'auto 4px 1fr / 1fr')};
//   max-width: 704px;
//   width: 100%;
//   height: 100%;
//   overflow-x: hidden;
//   overflow-y: auto;
//   margin: auto;
//   background-color: #fff;
// `;

// const AppPageDesktopLayout = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   width: 100%;
//   height: 100%;
//   position: relative;
// `;

export const AppPageLayout = styled.div<{noStepper: boolean}>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Content = styled.section`
  @media (max-width: 575px) {
    position: relative;
    top: 0;
    border-radius: 0;
  };

  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  position: absolute;
  width: 100%;
  top: 310px;
  max-width: 704px;
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: var(--border-radius);
`;

// const ContentDesktopSection = styled.section`
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   position: relative;
//   width: 100%;
//   height: calc(100% - 390px);
// `;

// const ContentDesktopAndFooter = styled.div`
//   position: absolute;
//   top: -64px;
//   width: 100%;
// `;

// const ContentDesktop = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   max-width: 704px;
//   width: 100%;
//   height: auto;
//   overflow-x: hidden;
//   overflow-y: auto;
//   margin: 0 auto;
//   background-color: #fff;
//   border-radius: var(--border-radius);
// `;

export const Footer = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100px;
`;

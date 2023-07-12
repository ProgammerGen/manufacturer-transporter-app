import styled from "@emotion/styled"
export const HomeSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: -72px;
  background: url("./assets/cover-page.jpg") center center no-repeat;
  background-size: cover;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, lightblue, rgba(0, 0, 0, 0.1));
    z-index: 1;
  }
`

export const HomeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

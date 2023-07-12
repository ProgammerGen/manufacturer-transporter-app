import styled from "@emotion/styled"

export const MessageSection = styled.section`
  position: relative;
  width: 100%;
  background: url("./assets/transporter-page.jpeg") no-repeat;
  background-size: cover;
  height: 100vh;
  margin-top: -85px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgb(173, 216, 230, 0.9),
      rgba(0, 0, 0, 0.1)
    );
    z-index: 1;
  }
`

export const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

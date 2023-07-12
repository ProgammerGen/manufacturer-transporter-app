import styled from "@emotion/styled"

export const SignupSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  @media (max-width: 768px) {
    transform: translate(-50%, -40%);
  }
`
export const LoginSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    transform: translate(-50%, -40%);
  }
`

export const RegisterForm = styled.form`
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`
export const SigninForm = styled.form`
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`

import { Container } from "react-bootstrap"
import { LoginSection } from "../../styles/Auth"
import LoginForm from "../../components/LoginForm"

const Login = () => {
  return (
    <>
      <LoginSection className="w-100">
        <Container>
          <div className="w-75 w-md-50  mx-auto">
            <LoginForm />
          </div>
        </Container>
      </LoginSection>
    </>
  )
}
export default Login

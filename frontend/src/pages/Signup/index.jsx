import { Container } from "react-bootstrap"
import { SignupSection } from "../../styles/Auth"
import SignupForm from "../../components/SignupForm"

const Signup = () => {
  return (
    <>
      <SignupSection className="w-100">
        <Container>
          <div className="w-75 mx-auto">
            <SignupForm />
          </div>
        </Container>
      </SignupSection>
    </>
  )
}
export default Signup

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import { Button } from "react-bootstrap"
import Alert from "react-bootstrap/Alert"

import { AuthContext } from "../../context//AuthReducer"

import { SigninForm } from "../../styles/Auth"

const LoginForm = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [message, setMessage] = useState("")
  const [loginError, setloginError] = useState()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post(`http://localhost:5000/auth/login`, formData)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate("/profile")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message })
      setloginError("Login Failed")
    }
  }

  return (
    <>
      {message ? (
        <Alert variant="success" dismissible>
          {message}
        </Alert>
      ) : loginError ? (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      ) : null}
      <SigninForm onSubmit={handleSubmit}>
        <h1 className="text-center mb-3 h1 fw-bold">Login</h1>
        <div className="row g-3 mb-3">
          <div className="col-">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                onChange={handleOnChange}
                placeholder="name@example.com"
              />
              <label for="email">Email</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                onChange={handleOnChange}
                placeholder="Password"
              />
              <label for="password">Password</label>
            </div>
          </div>
        </div>
        <Button type="submit" variant="outline-info">
          LOGIN
        </Button>
      </SigninForm>
    </>
  )
}
export default LoginForm

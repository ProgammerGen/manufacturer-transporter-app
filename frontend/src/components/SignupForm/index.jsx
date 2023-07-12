import { useState, useRef } from "react"

import axios from "axios"

import { Button } from "react-bootstrap"
import Alert from "react-bootstrap/Alert"

import { RegisterForm } from "../../styles/Auth"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    user_type: "manufacturer",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const fromRef = useRef()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      )
      setMessage(data.message)
      setError("") // Clear any previous error
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        setError(data.message)
        setMessage("")
      } else {
        console.error("An error occurred:", error)
      }
    }
    fromRef.current.value = ""
  }

  return (
    <>
      {message ? (
        <Alert variant="success" dismissible>
          {message}
        </Alert>
      ) : error ? (
        <Alert variant="danger  " dismissible>
          {error}
        </Alert>
      ) : null}

      <RegisterForm ref={fromRef} onSubmit={handleSubmit}>
        <h1 className="text-center mb-3 h1 fw-bold">Registration</h1>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name@example.com"
                name="first_name"
                onChange={handleOnChange}
              />
              <label htmlFor="name">First Name</label>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="name@example.com"
                name="last_name"
                onChange={handleOnChange}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                name="email"
                onChange={handleOnChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="name@example.com"
                name="password"
                onChange={handleOnChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                name="user_type"
                onChange={handleOnChange}
                aria-label="Floating label select example"
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="transporter">Transporter</option>
              </select>
              <label for="floatingSelect">Register as</label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-floating">
              <textarea
                className="form-control"
                style={{ height: "100px" }}
                placeholder="Leave address here"
                id="address"
                name="address"
                onChange={handleOnChange}
              ></textarea>
              <label htmlFor="address">Address</label>
            </div>
          </div>
        </div>
        <Button type="submit" variant="outline-info">
          SIGN UP
        </Button>
      </RegisterForm>
    </>
  )
}
export default SignupForm

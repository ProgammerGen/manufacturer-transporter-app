import { useContext, useEffect, useState } from "react"

import axios from "axios"
import { v4 as uuidv4 } from "uuid"

import Button from "react-bootstrap/esm/Button"

import { AuthContext } from "../../context/AuthReducer"

import { Alert } from "react-bootstrap"

import { FormContainer, FormControl, FormLabel } from "../../styles/Profile"

const quantity = [
  "1 ton",
  "2 ton",
  "3 ton",
  "4 ton",
  "5 ton",
  "6 ton",
  "7 ton",
  "8 ton",
  "9 ton",
  "10 ton",
]

const transporter = ["Hamza", "Saif", "Akbar", "Akram"]

const OrderForm = () => {
  const { user } = useContext(AuthContext)
  const { details } = user

  const [transporters, setTransporters] = useState([])

  const [formData, setFormData] = useState({
    order_id: uuidv4(),
    From: "",
    destine: "",
    quantity: "",
    address: details.address,
    transporter: "",
    manufacturer: details._id,
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleOnChange = (event) => {
    const { value, name } = event.target

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(
        "http://localhost:5000/booking/hireTransporter",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_key}`,
          },
        }
      )
      setMessage(data.message)
      setError("")
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        setError(data.message)
        setMessage("")
      } else {
        console.error("An error occurred:", error)
      }
    }
  }

  useEffect(() => {
    const fetchTransporters = async () => {
      console.log(user.access_key)
      try {
        const { data } = await axios.get(
          "http://localhost:5000/booking/listTransporter",
          {
            headers: {
              Authorization: `Bearer ${user.access_key}`,
            },
          }
        )
        const transportersData = data.transporters
        setTransporters(transportersData)
      } catch (error) {
        console.error("Error fetching transporters:", error)
      }
    }

    fetchTransporters()
  }, [])

  return (
    <>
      <FormContainer>
        <h3 className="text-center text-white fw-bold mb-2">REQUEST A QOUTE</h3>
        {message ? (
          <Alert variant="success" dismissible>
            {message}
          </Alert>
        ) : error ? (
          <Alert variant="danger  " dismissible>
            {error}
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <div class="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="from"
                  name="From"
                  onChange={handleOnChange}
                  placeholder="From"
                />
              </div>
            </div>
            <div className="col">
              <div class="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="to"
                  name="destine"
                  onChange={handleOnChange}
                  placeholder="To"
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div class="col-auto">
                <select
                  name="quantity"
                  onChange={handleOnChange}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Choose the Quantity</option>
                  {quantity.map((quantity, index) => {
                    return (
                      <>
                        <option value={quantity} key={index}>
                          {quantity}
                        </option>
                      </>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div class="col-auto">
                <div class="col-auto">
                  <textarea
                    type="text"
                    className="form-control"
                    id="address"
                    style={{ height: "80px" }}
                    value={formData.address}
                    name="address"
                    onChange={handleOnChange}
                    placeholder="Address"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div class="col-auto">
                <select
                  name="transporter"
                  onChange={handleOnChange}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Choose the Transporter</option>
                  {transporters.map((data, index) => {
                    return (
                      <>
                        <option value={data._id} key={data._id}>
                          {`${data.first_name} ${data.last_name}`}
                        </option>
                      </>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-100 mb-3 text-white"
            variant="info"
          >
            Send a Qoute
          </Button>
        </form>
      </FormContainer>
    </>
  )
}
export default OrderForm

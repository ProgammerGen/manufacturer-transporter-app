import { useState, useEffect, useContext } from "react"

import axios from "axios"
import { Alert } from "react-bootstrap"

import { AuthContext } from "../../context/AuthReducer"
import { Button } from "react-bootstrap"

const TransporterProfile = () => {
  const { user } = useContext(AuthContext)

  const [orders, setOrder] = useState([])
  const [qoutedPrice, setQoutedPrice] = useState([])
  const [message, setMessage] = useState("")
  const [Error, setError] = useState("")

  const handleOnChnage = (index, price) => {
    const updatedPrices = [...qoutedPrice]
    updatedPrices[index] = price
    setQoutedPrice(updatedPrices)
  }

  const handleSubmit = async (index) => {
    const order = orders[index]
    const quotedPrice = qoutedPrice[index]

    const formData = {
      order_id: order._id,
      transporter_name: `${user.details.first_name} ${user.details.last_name}`,
      transporter_id: order.transporter,
      manufacturer_id: order.manufacturer,
      price: quotedPrice,
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/message/qoutePirce",
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
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/order/lisAllOrders/${user.details._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_key}`,
            },
          }
        )

        const Orders = data.orders
        setOrder(Orders)
      } catch (error) {
        console.error("Error fetching transporters:", error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <div className="row g-3 align-items-center">
        <div className="col table-responsive p-3">
          {message ? (
            <Alert variant="success" dismissible>
              {message}
            </Alert>
          ) : Error ? (
            <Alert variant="danger" dismissible>
              {Error}
            </Alert>
          ) : null}
          <table class="table table-striped rounded-3 overflow-hidden ">
            <thead>
              <tr>
                <th className="h4 fw-bold" scope="col">
                  From
                </th>
                <th className="h4 fw-bold" scope="col">
                  To
                </th>
                <th className="h4 fw-bold" scope="col">
                  Pickup
                </th>
                <th className="h4 fw-bold" scope="col">
                  Quantity
                </th>
                <th className="h4 fw-bold" scope="col">
                  Price
                </th>
                <th className="h4 fw-bold" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => {
                  return (
                    <>
                      <tr>
                        <th>{order.From}</th>
                        <th>{order.destine}</th>
                        <th>{order.address}</th>
                        <th>{order.quantity}</th>
                        <th>
                          <div class="input-group mb-3">
                            <span class="input-group-text">$</span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Amount (to the nearest dollar)"
                              placeholder="Qoute your price"
                              onChange={(e) =>
                                handleOnChnage(index, e.target.value)
                              }
                            />
                          </div>
                        </th>
                        <th>
                          <Button
                            onClick={() => handleSubmit(index)}
                            variant="info text-white"
                          >
                            Qoute
                          </Button>
                        </th>
                      </tr>
                    </>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default TransporterProfile

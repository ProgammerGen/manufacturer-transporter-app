import { useState, useEffect } from "react"

import OrderForm from "../OrderForm"

const ManufacturerProfile = () => {
  return (
    <>
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-6">
          <h2 className="text-white   fw-bold">
            Quality Crafted, Innovation Unleashed <br /> Powering the Future!
          </h2>
        </div>
        <div className="col-12 col-md-6">
          <OrderForm />
        </div>
      </div>
    </>
  )
}
export default ManufacturerProfile

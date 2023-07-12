import user from "../models/Users.js"
import order from "../models/Order.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"
import dotenv from "dotenv"

export const listallTransportes = async (req, res, next) => {
  try {
    const transporters = await user.find({ user_type: "transporter" })
    if (transporters) {
      const transporterData = transporters.map(
        ({ _id, first_name, last_name }) => ({ _id, first_name, last_name })
      )
      res.status(200).json({ transporters: transporterData })
    } else {
      return next(createError(405, "No Transporter is found"))
    }
  } catch (error) {
    next(error)
  }
}

export const hireTransporter = async (req, res, next) => {
  try {
    const {
      order_id,
      From,
      destine,
      quantity,
      address,
      transporter,
      manufacturer,
    } = req.body
    if (
      !From ||
      !destine ||
      !quantity ||
      !address ||
      !transporter ||
      !manufacturer
    ) {
      return next({
        status: 404,
        message: "Please fill all the required fields",
      })
    }
    const orderData = new order({
      order_id,
      From,
      destine,
      quantity,
      address,
      transporter,
      manufacturer,
    })

    await orderData.save()

    res.status(200).json({ message: "Order message sent successfully" })
  } catch (error) {
    return next(error)
  }
}

export const listAllOrders = async (req, res, next) => {
  try {
    const transporter_id = req.params.id
    const orders = await order.find({ transporter: transporter_id })
    res.status(200).json({ orders: orders })
  } catch (error) {
    return next(error)
  }
}

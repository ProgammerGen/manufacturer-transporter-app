import user from "../models/Users.js"
import order from "../models/Order.js"
import message from "../models/Message.js"
import { createError } from "../utils/error.js"

// export const listallTransportes = async (req, res, next) => {
//   try {
//     const transporters = await user.find({ user_type: "transporter" })
//     if (transporters) {
//       const transporterData = transporters.map(
//         ({ _id, first_name, last_name }) => ({ _id, first_name, last_name })
//       )
//       res.status(200).json({ transporters: transporterData })
//     } else {
//       return next(createError(405, "No Transporter is found"))
//     }
//   } catch (error) {
//     next(error)
//   }
// }

export const qoutePrice = async (req, res, next) => {
  try {
    const {
      order_id,
      price,
      transporter_name,
      transporter_id,
      manufacturer_id,
    } = req.body
    if (
      !order_id ||
      !price ||
      !transporter_name ||
      !transporter_id ||
      !manufacturer_id
    ) {
      return next({
        status: 404,
        message: "Something is missing",
      })
    }
    const messageData = new message({
      order_id,
      transporter_name,
      transporter_id,
      manufacturer_id,
      price,
    })

    await messageData.save()

    res.status(200).json({ message: "Price sent successfully" })
  } catch (error) {
    return next(error)
  }
}

export const lestAllReplies = async (req, res, next) => {
  try {
    const manufacturer_id = req.params.id
    const messages = await message.find({ man: manufacturer_id })
    res.status(200).json({ messages: messages })
  } catch (error) {
    return next(error)
  }
}

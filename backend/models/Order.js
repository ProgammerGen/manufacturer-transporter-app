import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    From: {
      type: String,
      required: true,
    },
    destine: {
      type: String,
      required: true,
      unique: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    transporter: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
)

export default mongoose.model("order", OrderSchema, "order")

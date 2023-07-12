import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    transporter_name: {
      type: String,
      required: true,
    },
    transporter_id: {
      type: String,
      required: true,
    },
    manufacturer_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
)

export default mongoose.model("message", MessageSchema, "message")

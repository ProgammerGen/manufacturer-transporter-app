import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fileUpload from "express-fileupload"
import Routes from "./routes/routes.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

import cookieParser from "cookie-parser"

const app = express()
app.use(cors())
app.options("*", cors())
const port = 5000
dotenv.config()

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected")
})

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO)
    console.log("Conntected to Mongodb")
  } catch (err) {
    console.log(err)
  }
}

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use("/", Routes)
app.use(express.static("doctors"))
app.use(fileUpload())

app.get("/", (req, res) => {
  res.send("Hello, it is test application")
})

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something Went Wrong"
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  })
})

app.listen(process.env.PORT || port, () => {
  connect()
  console.log("Started")
})

import jwt from "jsonwebtoken"
import { createError } from "./error.js"
import dotenv from "dotenv"

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]
  if (token) {
    token = token.replace(/^Bearer\s+/, "")
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        })
      }
      req.decoded = decoded
      next()
    })
  } else {
    return res.json({
      success: false,
      message: "Token not provided",
    })
  }
}

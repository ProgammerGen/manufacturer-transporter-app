import express from "express"

import { login, register, refreshTokens, logout } from "../controllers/user.js"

import {
  hireTransporter,
  listallTransportes,
  listAllOrders,
} from "../controllers/order.js"

import { qoutePrice, lestAllReplies } from "../controllers/message.js"

import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("working token")
})
// Bookings
router.get("/booking/listTransporter", verifyToken, listallTransportes)
router.post("/booking/hireTransporter", verifyToken, hireTransporter)

//Orders
router.get("/order/lisAllOrders/:id", verifyToken, listAllOrders)

// Message
router.post("/message/qoutePirce", verifyToken, qoutePrice)
router.get("/message/listReplies/:id", verifyToken, lestAllReplies)

//auth
router.post("/auth/register", register)
router.post("/auth/login", login)
router.post("/auth/refresh_token", refreshTokens)
router.post("/auth/logout", logout)

export default router

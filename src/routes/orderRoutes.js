const express = require("express")

const {
  placeOrder,
  updateOrderStatus,
  getOrders
} = require("../controller/OrderController")
const router = express.Router()
router.post("/placeOrder", placeOrder)
router.post("/updateStatus", updateOrderStatus)
router.post("/getOrders", getOrders)

module.exports = router

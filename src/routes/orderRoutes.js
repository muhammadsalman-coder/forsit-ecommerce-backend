const express = require("express")

const {
  placeOrder,
  updateOrderStatus,
  getOrders,
  getOrderById,
  getStats
} = require("../controller/OrderController")
const router = express.Router()
router.post("/placeOrder", placeOrder)
router.post("/updateStatus", updateOrderStatus)
router.get("/getOrders", getOrders)
router.get("/getOrder", getOrderById)
router.get("/getStats", getStats)

module.exports = router

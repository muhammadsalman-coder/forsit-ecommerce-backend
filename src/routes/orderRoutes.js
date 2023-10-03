const express = require("express")

const { placeOrder } = require("../controller/OrderController")
const router = express.Router()
// router.get("/getproducts", getProducts)
router.post("/placeOrder", placeOrder)

module.exports = router

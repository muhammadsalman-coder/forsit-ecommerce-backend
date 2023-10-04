const Orders = require("../model/order_schema")
const { generateRandomString } = require("../utils/helperFunctions")
const {
  getTotalAmount,
  findAndMappingOrderedProduct
} = require("../utils/orderHelper")

exports.placeOrder = async (req, res) => {
  const { price, quantity, orderedProducts } = req.body

  if (!price || !quantity || !orderedProducts.length)
    return res.status(400).json({
      msg: "payload missing",
      status: "fail"
    })

  const mappedOrderProducts = await findAndMappingOrderedProduct(
    orderedProducts
  )
  const totalAmount = getTotalAmount()
  const orderNumber = generateRandomString()
  const order = new Orders({
    orderNumber,
    orderStatus: "Pending",
    quantity: quantity,
    totalAmount: totalAmount,
    orderProducts: mappedOrderProducts
  })

  await order.save()

  return res.status(201).json({
    msg: "Congratulations, your order is placed!",
    order: order
  })
}

exports.updateOrderStatus = async (req, res) => {
  const { id, status } = req.body
  if (!id || !status) {
    return res.status(400).json({
      msg: "Invalid request body",
      errors: ["id and status are required fields"]
    })
  }
  const updatedOrder = await Orders.findOneAndUpdate(
    { _id: id },
    { orderStatus: status },
    {
      new: true
    }
  )
  if (!updatedOrder)
    return res.status(404).json({
      msg: "Order not found"
    })

  return res.status(200).json({
    msg: "Order status updated successfully"
  })
}
exports.getOrders = async (req, res) => {
  const orders = await Orders.find()

  if (!orders.length) return res.status(404).json({ msg: "No orders found" })

  return res.status(200).json({ orders })
}

const Orders = require("../model/order_schema")
const Products = require("../model/product_schema")
const { generateRandomString } = require("../utils/helperFunctions")
const {
  getTotalAmount,
  findAndMappingOrderedProduct
} = require("../utils/orderHelper")

exports.placeOrder = async (req, res) => {
  const { quantity, orderedProducts } = req.body

  if (!quantity || !orderedProducts.length)
    return res.status(400).json({
      msg: "payload missing",
      status: "fail"
    })
  const mappedOrderProducts = await findAndMappingOrderedProduct(
    orderedProducts
  )
  const totalAmount = getTotalAmount(mappedOrderProducts)
  const orderNumber = generateRandomString()
  const orderObject = {
    orderNumber,
    orderStatus: "Received",
    quantity: +quantity,
    totalAmount: +totalAmount,
    orderedProducts: mappedOrderProducts
  }
  console.log("orderObject", orderObject)
  const order = new Orders(orderObject)

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

  return res.status(200).json(orders)
}
exports.getOrderById = async (req, res) => {
  const { id } = req.query
  console.log("req.query", req.query, req.body)
  if (!id)
    return res.status(400).json({
      msg: "Invalid request field missing",
      errors: ["id are required fields"]
    })
  const order = await Orders.findById(id)
  if (!order._id) return res.status(404).json({ msg: "No orders found" })

  return res.status(200).json(order)
}
exports.getStats = async (req, res) => {
  try {
    const count = await Products.countDocuments()
    const weeklyOrderCounts = await Orders.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            $lt: new Date(Date.now())
          }
        }
      },
      {
        $group: {
          _id: (Math.random() * 100000000).toFixed(),
          orderCount: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" }
        }
      }
    ])
    res.status(200).json({
      lastWeek: {
        orderCount: weeklyOrderCounts[0].orderCount,
        weeklySales: weeklyOrderCounts[0].totalAmount
      },
      totalProduct: count
    })
  } catch (err) {
    return res.status(404).json({ msg: "something went wrong" })
  }
}

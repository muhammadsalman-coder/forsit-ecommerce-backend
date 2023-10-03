const Orders = require("../model/order_schema")
exports.placeOrder = async (req, res) => {
  const { orderNummber, price, quantity, orderedProducts } = req.body
  if (orderNummber && price && quantity && orderedProducts?.length) {
    const _order = new Orders({
      ...req.body
    })
    _order.save((error, order) => {
      console.log("order", order)
      if (error) {
        return res.status(400).json({
          msg: "Something went wrong",
          error
        })
      }
      if (order) {
        return res.status(201).json({
          msg: "Order Added Successfully...",
          order: order
        })
      }
    })
  } else {
    res.status(402).json({ msg: "payload mising", status: "fail" })
  }
}

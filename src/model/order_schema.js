const mongoose = require("mongoose")
// const bcrypt = require("bcrypt");
// userAddress, receivingAddress, pay, receivedToken
const orderSchema = mongoose.Schema(
  {
    orderNumber: String,
    quantity: Number,
    totalAmount: Number,
    orderStatus: String,
    orderedProducts: [
      {
        productId: String,
        quantity: Number,
        price: Number,
        image: String,
        name: String
      }
    ]
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
)
orderSchema.virtual("id").get(function () {
  return this._id.toString()
})
module.exports = mongoose.model("Orders", orderSchema)

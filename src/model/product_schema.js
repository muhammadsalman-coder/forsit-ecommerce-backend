const mongoose = require("mongoose")
// const bcrypt = require("bcrypt");
// userAddress, receivingAddress, pay, receivedToken
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    quantity: String,
    price: String,
    image: String
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
)
productSchema.virtual("id").get(function () {
  return this._id.toString()
})
module.exports = mongoose.model("Product", productSchema)

const Products = require("../model/order_schema")
exports.findAndMappingOrderedProduct = async (orderedProducts) => {
  const orderedProductIds = orderedProducts.map((product) => product.id)
  const products = await Products.find({ _id: { $in: orderedProductIds } })
  return products.map((product) => ({
    productId: product?.id,
    quantity: product?.quantity,
    price: product?.price,
    image: product?.image,
    name: product?.image
  }))
}
exports.getTotalAmount = (orderedProducts) => {
  return orderedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  )
}

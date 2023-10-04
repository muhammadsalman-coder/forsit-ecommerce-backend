const Products = require("../model/product_schema")
exports.findAndMappingOrderedProduct = async (orderedProducts) => {
  const orderedProductIds = orderedProducts.map((product) => product.productId)
  const allProducts = await Products.find({
    _id: { $in: orderedProductIds }
  }).lean()
  return allProducts.map((product) => {
    const quantity = orderedProducts.find(
      (prod) => prod.productId == product._id?.toString()
    )?.quantity
    return {
      productId: product?._id,
      quantity: quantity,
      price: +product?.price,
      image: product?.image,
      name: product?.name
    }
  })
}
exports.getTotalAmount = (orderedProducts) => {
  return orderedProducts.reduce(
    (acc, product) => acc + +product.price * +product.quantity,
    0
  )
}

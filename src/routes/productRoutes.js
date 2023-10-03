const express = require("express")
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controller/productController")
const router = express.Router()
const upload = require("../../multer")
router.post("/addproduct", upload.single("image"), addProduct)
router.post("/updateproduct", upload.single("image"), updateProduct)
router.get("/getproducts", getProducts)
router.post("/deleteproduct", deleteProduct)

module.exports = router

const Products = require("../model/product_schema")
const cloudinary = require("../utils/cloudinaryHelper")
const fs = require("fs")
exports.addProduct = async (req, res) => {
  console.log("req?.body", req?.body)
  if (!req?.body) return res.send("bodynoet exist")
  const { name, quantity, price } = req?.body
  if (name && quantity && price) {
    const uploader = async (path) => await cloudinary.upload(path, "Images")
    if (req.file) {
      let { path } = req.file
      const newPath = await uploader(path)
      fs.unlinkSync(path)
      if (newPath?.url) {
        const _product = new Products({
          name: name,
          quantity: +quantity,
          image: newPath.url,
          price: +price
        })
        const saved = await _product.save()
        console.log("saved", saved)
        if (saved) {
          return res.status(201).json({
            msg: "Product Added Successfully...",
            product: saved
          })
        }
      } else {
        return res.status(400).json({ msg: "Something went wrong with image." })
      }
    } else {
      return res.status(400).json({ msg: "file is require." })
    }
  } else {
    res.status(402).json({ msg: "payload mising", status: "fail" })
  }
}
exports.getProducts = async (req, res) => {
  try {
    const product = await Products.find()
    if (product) {
      return res.status(200).json(product)
    } else {
      return res.status(202).json({ msg: "Product not found", status: "fail" })
    }
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Something went wrong...", status: "fail" })
  }
}
exports.updateProduct = async (req, res) => {
  const { id } = req.body
  if (id) {
    const product = await Products.findOne({ _id: id })
    try {
      if (product) {
        const uploader = async (path) => await cloudinary.upload(path, "Images")
        if (req.file) {
          let { path } = req.file
          const newPath = await uploader(path)
          if (newPath?.url) req.body.image = newPath.url
        }

        try {
          const updated = await Products.updateOne({ _id: id }, { ...req.body })

          if (updated) {
            return res.status(200).json({
              msg: "Product Updated Successfully..."
            })
          } else {
            return res.status(400).json({
              msg: "Something went wrong product not update....",
              status: "fail"
            })
          }
        } catch (err) {
          return res
            .status(400)
            .json({ msg: "Something went wrong...", status: "fail" })
        }
      } else {
        return res
          .status(202)
          .json({ msg: "Product not found", status: "fail" })
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Something went wrong...", status: "fail" })
    }
  } else {
    res.status(400).json({ msg: "payload id is mising", status: "fail" })
  }
}
exports.deleteProduct = async (req, res) => {
  console.log("req?.body?.id", req?.body)
  if (req?.body?.id) {
    const deleted = await Products.findOneAndDelete({ _id: req.body.id })
    try {
      if (deleted) {
        return res
          .status(200)
          .json({ msg: "Product Deleted Successfully...", status: "fail" })
      } else {
        return res
          .status(202)
          .json({ msg: "Product not found", status: "fail" })
      }
    } catch (error) {
      return res
        .status(400)
        .json({ msg: "Something went wrong...", status: "fail" })
    }
  } else {
    return res.status(400).json({ msg: "Product not found", status: "fail" })
  }
}

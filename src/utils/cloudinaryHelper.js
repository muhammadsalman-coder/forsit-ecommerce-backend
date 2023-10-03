const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

exports.upload = async (file, folder) => {
  return await cloudinary.uploader.upload(
    file,
    { folder: folder },
    (error, result) => {
      if (result) {
        return result
      }
      if (error) return error
    }
  )
}

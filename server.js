const express = require("express")
const cors = require("cors")
const env = require("dotenv")
const mongoose = require("mongoose")
env.config()
const app = express()
const orderRoutes = require("./src/routes/orderRoutes")
const productRoutes = require("./src/routes/productRoutes")
const corsOpts = {
  //  origin: "*",

  origin: true,
  credentials: true,
  // origin: [
  //   "http://localhost:3000",
  //   "https://localhost:3000",
  //   "https://cryptblade-backend.herokuapp.com",
  // ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  // allowedHeaders: ["Content-Type"],
}
app.use(cors(corsOpts))
app.use(express.json())
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.uiuqgl8.mongodb.net/forsit?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((val) => {
    console.log("mongoose connected")
  })
  .catch((err) => {
    console.log(err, "MONGO DB disconnected")
  })
app.get("/", (req, res) => {
  res.send("Connected Successfully.")
})
app.use("/api", orderRoutes)
app.use("/api", productRoutes)
const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`server is working on port ${port}`)
})

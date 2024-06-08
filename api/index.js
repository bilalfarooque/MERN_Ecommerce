import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { dbConnection } from "./utils/config.js"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import ProductsRouter from "./routes/product.js"
import CartRouter from "./routes/cart.js"
import OrderRouter from "./routes/order.js"
import StripeRouter from "./routes/stripe.js"

dotenv.config()

const app = express()

//MongoDB connection function
dbConnection()
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!");
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!");
})

//middleware
// Enable CORS for all routes
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/products", ProductsRouter)
app.use("/api/cart", CartRouter)
app.use("/api/orders", OrderRouter)
app.use("/api/checkout", StripeRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})

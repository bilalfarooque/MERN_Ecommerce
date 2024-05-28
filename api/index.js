import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./utils/config.js"
import userRouter from "./routes/user.js"

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


app.use("/api/user", userRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})

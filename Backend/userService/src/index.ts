import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectRedis } from "./config/redis.js"
import { connectRabbitMQ } from "./config/rabbitmq.js"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.js"

const app=express()

// CONNNECT TO MONGODB
connectDB()

//CONNECT TO REDDIS
connectRedis()

//CONNECT TO RABBITMQ
connectRabbitMQ()


// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",userRoutes)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is Listening at PORT ",PORT)
})
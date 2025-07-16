import  express  from "express";
import { connectDB } from "./config/db.js";
import chatRouter from "./routes/chat.js"
import dotenv from "dotenv"
const app=express()

dotenv.config()

// CONNECT TO THE DATABASE
connectDB()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTES
app.use("/api/v1",chatRouter)



const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is Listening at PORT :",PORT)
})
import  express  from "express";
import { connectDB } from "./config/db.js";
import chatRouter from "./routes/chat.js"
import dotenv from "dotenv"
import cors from "cors"
import { app ,server} from "./config/socket.js";


dotenv.config()

// CONNECT TO THE DATABASE
connectDB()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// ROUTES
app.use("/api/v1",chatRouter)



const PORT=process.env.PORT
console.log()
server.listen(PORT,()=>{
    console.log("Server is Listening at PORT :",PORT)
})

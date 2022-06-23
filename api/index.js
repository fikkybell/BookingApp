import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'
import cookieParser from "cookie-parser"

const app = express()

//Dotenv config
dotenv.config();

//connecting to mongo server
mongoose.connect(process.env.MONGO_URL)
.then(() =>console.log('Db connection successful'))
.catch((err)=>{
  console.log(err)})

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/hotels", hotelRoute)
app.use("/rooms", roomRoute)

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Error from handler"
 return res.status(errorStatus).json({
  success: false,
  status: errorStatus,
  message: errorMessage,
  stack: err.stack
 })
})

app.listen(8080, ()=>{
    console.log("api is working")
})
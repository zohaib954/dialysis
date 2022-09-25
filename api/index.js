import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hospitalRoute from "./routes/hospital.js";
 
 

const app = express();

dotenv.config()

const connect = async ()=>{
try {
     await mongoose.connect(process.env.MONGO);
    console.log("Connected to mangoDB.");
  } catch (error) {
    throw error
  }
};
connect();

//middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hospital", hospitalRoute);

 


app.listen(8000, ()=>{
    console.log("Connected to backend.");
})
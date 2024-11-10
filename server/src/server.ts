import express from "express";
import cors from 'cors';
import FoodRouter from './routes/food.route';
import StripRouter from './routes/stripe.route';
import UserRouter from './routes/user.route'
import { dbConnect } from "./config/db";
const app=express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
dbConnect()
app.use('/api/foods',FoodRouter);
app.use('/api/payment',StripRouter)
app.use('/api/user',UserRouter)
app.listen(5000,()=>{
    console.log("server listening on port 5000")
})
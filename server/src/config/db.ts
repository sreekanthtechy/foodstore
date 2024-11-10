import mongoose from "mongoose";

export const dbConnect=()=>mongoose.connect("mongodb://127.0.0.1:27017/food-online").then(()=>{
    console.log("db connected successfully")
}).catch(()=>{
    console.log("Connection failed")
})
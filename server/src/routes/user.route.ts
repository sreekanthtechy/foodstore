import { Router } from "express";
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../shared/models/user";
import { HTTP_BAD_REQUEST, HTTP_SUCCESS, HTTP_UN_AUTHORIZED } from "../config/http_status";
const router=Router();


router.post("/register", asyncHandler(async(req,res)=>{

    const newUser=req.body;
    const user= await UserModel.findOne({email:newUser.email})
    if(user){
        res.status(HTTP_BAD_REQUEST).send({message:"User Already exists please with different email"});
        return
    }

    const hasPassword=await bcrypt.hash(newUser.password,10);
    newUser.password=hasPassword;
    const insertUser=new UserModel(newUser);
    const dbUser=await insertUser.save()
    res.status(HTTP_SUCCESS).send(generateToken(newUser))


}))

router.post("/login",asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(user&&await bcrypt.compare(password,user.password)){
        res.send(generateToken(user))
    }else{
        res.status(HTTP_UN_AUTHORIZED).send({message:"Invalid email or password"})
        
    }

}))

export const generateToken=(user:IUser)=>{
 const token=jwt.sign(
    {
        id:user.email,firstName:user.firstName
    },
    "sreekanth",
    {
        expiresIn:"20d"
    }
 )

 return{
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    isAdmin:user.isAdmin,
 }
}




export default router
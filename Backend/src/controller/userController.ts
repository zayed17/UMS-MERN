import {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'
import bcrypt from 'bcryptjs'

export const authUser =asyncHandler(async (req:Request,res:Response)=>{
    res.json({message:"Auth user"})
})

export const registerUser =asyncHandler(async (req:Request,res:Response)=>{

    const {name,email,password}= req.body;
    const existCheck = await userModel.findOne({email});
    if(existCheck){
        res.send(400)
        throw new Error("User already Exists")    
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    })
})

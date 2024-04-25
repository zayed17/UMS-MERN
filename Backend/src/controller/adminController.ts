import { Request,Response,NextFunction } from "express";
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'
import dotenv from 'dotenv'
dotenv.config()


export const adminLogin =asyncHandler(async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            res.status(200).json({ success: true });
        } else {
            res.json({ message: "Wrong credentials" });
        }
        
    } catch (error) {
        console.log(error);
    }
})

export const getUser  =asyncHandler(async (req:Request,res:Response)=>{
    try {
        const user = await userModel.find({})
        console.log("user")
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }
})

export const updateUser = asyncHandler(async (req:Request,res:Response)=>{
    try {
        console.log("object",req.body)
    } catch (error) {
        console.log(error);
    }
})

export const deleteUser = asyncHandler(async (req:Request,res:Response)=>{
    try {
        
        const id = req.params.id;
        await userModel.deleteOne({_id:id});
        res.json({success:true})
    } catch (error) {
        console.log(error);
    }
})
import { Request,Response,NextFunction } from "express";
import asyncHandler from 'express-async-handler'
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
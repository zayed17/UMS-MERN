import { Request,Response,NextFunction } from "express";
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const auth  =asyncHandler(async (req:Request,res:Response)=>{
    try {
        res.json({status:true})
    } catch (error) {
        console.log(error);
    }
})

export const adminLogin =asyncHandler(async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({id:process.env.ADMIN_ID}, process.env.JWT_SECRET || "defaultSecret" ,{expiresIn:'1h'})
            res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
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
        const searchQuery = req.query.search
        let user:never[]
        if(searchQuery){
            user = await userModel.find({
                $or: [
                    { email: { $regex: searchQuery, $options: 'i' } }
                ]
            });
        }else{
            user = await userModel.find({})
        }
        console.log("user")
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }
})

export const updateUser = asyncHandler(async (req:Request,res:Response)=>{
    try {
        // console.log(req.body,req.file)
        const { _id, ...updateData } = req.body;
      if (req.file) {
        const { originalname } = req.file;
        updateData.image = originalname; 
      }
      const updatedUser = await userModel.findByIdAndUpdate(_id, updateData, { new: true });
      if(updatedUser) res.json({success:true})
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



  export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
  
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
    
        let newUserData: any = { name, email, password };
        
        if (req.file) {
          newUserData.image = req.file.originalname; 
        }
    
        const newUser = new userModel(newUserData);
        await newUser.save();
      
      return res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

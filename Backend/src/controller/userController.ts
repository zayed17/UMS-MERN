import {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerUser =asyncHandler(async (req:Request,res:Response)=>{
    try {
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
    await user.save()
    res.json({user,success:true})
    } catch (error) {
        console.log();
    }
   
})


export const loginController = asyncHandler(async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'defaultSecret',{ expiresIn: '1h' });
        res.cookie('access_token',token,{httpOnly:true}).status(200).json({user,success:true})
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during user login:');
      res.status(500).json({ success: false, message: 'Server error' });
    }       
  });

  export const updateProfile  = asyncHandler(async (req: Request, res: Response) => {
     try {
      console.log("dfs");
      
      const { _id, ...updateData } = req.body;
      console.log(_id);
      
      const updatedUser = await userModel.findByIdAndUpdate(_id, updateData, { new: true });
      console.log("dfssfs");
      
      res.status(200).json({ success: true, user: updatedUser });
     } catch (error) {
      console.log(error);
     }
  })

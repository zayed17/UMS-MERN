import {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel'
import bcrypt from 'bcryptjs'
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
export const registerUser =asyncHandler(async (req:Request,res:Response)=>{
    try {
    const {name,email,password}= req.body;
    const existCheck = await userModel.findOne({email});
    if(existCheck){
      res.json({success:false})
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

export const loginController = asyncHandler(async (req, res) => {
  try {
      console.log(req.body);
      
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ wa: user._id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1d' });
          console.log("Generated token:", token);
          res.cookie('access', token, { httpOnly: true }).status(200).json({ user, success: true });
      } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }       
});


  export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id, ...updateData } = req.body;
      if (req.file) {
        const { originalname } = req.file;
        updateData.image = originalname; 
      }
      const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

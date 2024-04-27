import { NextFunction, Request, Response } from "express";
import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: any, res: Response, next: NextFunction) => {

    const token = req.cookies.access;

    if(!token){
        return res.json({status:false,message:'not token availale'})
    }

    jwt.verify(token, "zayed123432kjddfakjfakl", (err: any, decoded: any) => {
        if (err) {
            return res.json({status:false, message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};
export const authenticateAdmin = (req: any, res: Response, next: NextFunction) => {    
    const token = req.cookies.access_token;
    if(!token){
        return res.json({status:false,message:'not token availale'})
    }
    jwt.verify(token, "zayed123432kjddfakjfakl", (err: any, decoded: any) => {
        if (err) {
            return res.json({status:false, message: 'Unauthorized' });
        }
        req.admin = decoded;
        next();
    });
};
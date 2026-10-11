import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from 'bcrypt'

//Login Delivery Partner
//POST /api/delivery/login
export const loginPartner= async(req: Request,res:Response)=>{
    const {email,password}= req.body;
    if (!email || password){
        return res.status(400).json({message:"Please provide email and password"})
    } 
        
    const partner= await prisma.deliveryPartner.findUnique({where:{
        email:email.toLowerCase()
    }})
    if(!partner){
        return res.status(401).json({message:"Invalid email or password"});
    }

    if(!partner.isActive){
        return res.status(403).json({message:"Your account has been deactivated"})
    }

    const isMatch = await bcrypt.compare(password,partner.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"})
    }
}
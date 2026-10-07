import { Request, Response } from "express";
import {prisma} from "../config/prisma.js"
//Get User Addresses
//Get api/addresses
export const getAddresses = async(req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
        where : {userId:req.user!.id},
        orderBy:{createdAt : "asc"}
    })
    res.json({addresses})
}

// Add address
//POST /api/addresses
export const addAddress = async(req: Request, res: Response) =>{
    const {label , address,city,state,zip,isDefault,lat,lng} = req.body;

    //Require coordinates
    if(lat==null || lng == null){
        return res.status(400).json({message:"Location coordinates are required.Please allow location access."})
    }
    const currentAddresses = await prisma.address.findMany({
        where:{userId:req.user!.id}
    })

}

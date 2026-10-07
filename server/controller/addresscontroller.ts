import { Request, Response } from "express";
import {prisma} from "../config/prisma.js"
//Get User Addresses
//Get api/addresses
export const getAddressed = async(req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
        where : {userId:req.user!.id},
        orderBy:{createdAt : "asc"}
    })
    res.json({addresses})
}


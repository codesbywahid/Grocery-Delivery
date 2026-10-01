import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
// Create Order

// POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
    const { items, shippingAddress, paymentMethod } = req.body;
    // Check if order items are empty
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "No order items" });
    }

    // Look up actual prices from DB
    const productIds = items.map((i: any) => i.product);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
    });
    const productMap: Record<string, (typeof products)[0]> = {};
    products.forEach((p: any) => (productMap[p.id] = p));

    // Check if product is in stock
    for (const item of items) {
        const product = productMap[item.product];
        if (!product || (product.stock ?? 0) < item.quantity) {
            return res.status(404).json({ message: "Product out of stock" });
        }
    }
    const orderItems = items.map((item: any) => {
        const dbProduct = productMap[item.product];
        if (!dbProduct) throw new Error(`Product ${item.product} not found`);
        return {
            product: dbProduct.id,
            name: dbProduct.name,
            image: dbProduct.image,
            price: dbProduct.price,
            quantity: item.quantity,
            unit: dbProduct.unit,
        };
    });
    const subtotal = orderItems.reduce(
        (sum: number, item: any) =>
            sum + item.price * item.quantity,
        0
    );
    const deliveryFee = subtotal > 20 ? 0 : 1.99;
    const tax = Math.round(subtotal * 100) / 100;
    const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

    const order = await prisma.order.create({
        data:{
            userId:req.user!.id,
            items:orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            statusHistory:[{ status : " Placed", note:"Order Placed successfully",timestamp:new Date()}]

        }
    })
    if(paymentMethod === "Card"){
        //Stripe payment link

    }
    res.json({order})

    //Decrease stock
    for(const item of orderItems){
        await prisma.product.update({
            where:{id:item.product},
            data:{stock:{decrement:item.quantity}}
        })
        
    }
}

//Get User order
//Get /api/orders
export const getUserOrders = async (req: Request, res: Response) =>{
    const {status} = req.query;
    const where : any ={
        userId:req.user!.id,
        NOT:[{PaymentMethod:"card",isPaid:false}]
    }
    if(status && status!=="all"){
        where.status=status;
    }
    const orders = await prisma.order.findMany({
        where,
        include:{deliveryPartner:{select:{name:true,phone:true}}},
        orderBy:{createdAt:"desc"}
    })
    res.json({orders})
}

///Get single order
//GET /api/orders/:id
export const getOrder = async (req: Request, res: Response) =>{
    const order = await prisma.order.findFirst({
        where:{id:req.params.id as String,userId:req.user!.id},
        include:{deliveryPartner:{select:{name:true,phone:true,avatar:true,vehicleType:true}}}
    })
    if(!order){
        return res.status(404).json({message:"Order not found"})
    }
    res.json({order})
}
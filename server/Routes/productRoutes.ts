import express  from "express";
import { createProduct, deleteProduct, getFlashDeals, getProduct, getProducts, updateProduct } from "../controller/productController.js";
import auth from "../middleWare/auth.js";
import admin from "../middleWare/admin.js";


const productRouter=express.Router();
productRouter.get("/flash-deals",getFlashDeals);
productRouter.get("/",getProducts);
productRouter.get("/:id",getProduct);
productRouter.get("/",createProduct);
productRouter.post("/",auth,admin,createProduct);
productRouter.put("/:id",auth,admin,updateProduct);
productRouter.delete("/",auth,admin,deleteProduct);

export default productRouter;





import express from "express";
import auth from "../middleWare/auth.js";
import admin from "../middleWare/admin.js";
import { assignDeliveryPartner, createDeliveryPartner, getAdminStats, getDeliveryPartners, updateDeliveryPartner } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/stats',auth,admin,getAdminStats)
adminRouter.get('/delivery-partners',auth,admin,getDeliveryPartners)
adminRouter.get('/delivery-partners',auth,admin,createDeliveryPartner)
adminRouter.get('/delivery-partners/:id',auth,admin,updateDeliveryPartner)
adminRouter.get('/orders/:id/assign',auth,admin,assignDeliveryPartner)

export default adminRouter
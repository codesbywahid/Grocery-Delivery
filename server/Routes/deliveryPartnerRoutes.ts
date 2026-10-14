import  express  from "express";
import { getMyDeliveries, loginPartner } from "../controller/deliveryPartnerController.js";


const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.post('/login',loginPartner)
deliveryPartnerRouter.get('/my-deliveries',getMyDeliveries)



export default deliveryPartnerRouter;
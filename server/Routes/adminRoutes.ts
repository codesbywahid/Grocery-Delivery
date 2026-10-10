import express from "express";
import auth from "../middleWare/auth.js";
import admin from "../middleWare/admin.js";
import { getAdminStats } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/stats',auth,admin,getAdminStats)
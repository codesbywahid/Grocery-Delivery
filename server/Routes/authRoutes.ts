import express from "express";

import { Login, register } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post('/register', register)

authRouter.post('/login', Login)

export default authRouter
import nodemailer, { createTransport } from "nodemailer";

const transporter = createTransport({
    host:"smtp.example.com",
    port:587,
    auth:{
        user:process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

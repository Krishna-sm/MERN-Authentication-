import nodemailer from 'nodemailer';
import { MAIL_OBJ,FRONTEND_DOMIN } from '../constant.js';

const transporter = nodemailer.createTransport(MAIL_OBJ);

export const SendEmailToUser = async(email,name,token)=>{
    
    const sendEmail = await transporter.sendMail({
        from: '"codewithKrishan@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Forget Password ", // Subject line
    html: 
    `
                <h1>Forget Password</h1>
                hey ,${name}
                <a href="${FRONTEND_DOMIN}/update-password?token=${token}">click here to update your password</a>
    
    `
    
    , // html body
    })
    return sendEmail
}
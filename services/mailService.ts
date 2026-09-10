import sendMail from "../utils/emailHandler";
import { generateOTP } from "../utils/generateOTP";

export const sendVerificationMail = async(user: any) => {
     const verificationLink = `htpp://localhost:5173/verify-otp?userId=${user.id}`
            const transporter = sendMail();
            const otp = generateOTP()
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user ?.email,
                subject: 'Welcome to global auth ',
                text: 'welcome to global auth , your accout has been created',
                html: ` <p> Please verify your email by clicking on this ${otp} </p>` 
            }
             const mailSend = await transporter.sendMail(mailOptions);
             return mailSend
}
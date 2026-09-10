import { Request, Response, NextFunction } from "express";
import { email } from "zod";
import bcrypt from 'bcrypt'
import { createOrUpdateUser, findUser, getAllUsers } from "../services/authService";
import {
  hashPassword,
  comparePassword,
} from "../utils/hashPassword.ts";

import { generateTokens } from "../utils/authHandler.ts";
import { generateOTP } from "../utils/generateOTP.ts";
import sendMail from "../utils/emailHandler.ts";
import { sendVerificationMail } from "../services/mailService.ts";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      error: false,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await findUser(email, username);

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "User with email or username already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Store user
    const savedData = await createOrUpdateUser(
      username,
      email,
      hashedPassword
    );

    // Send verification email
    const verification = await sendVerificationMail(savedData);

    console.log("Verification email:", verification);

    return res.status(201).json({
      error: false,
      savedData,
      message:
        "Registered successfully. Please check your email for verification.",
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async(req:Request, res:Response, next:NextFunction) => {
    const {username, email , password} = req.body
    console.log("BODY:", req.body);
console.log("username:", username);
console.log("email:", email);
console.log("password:", password);
    try{
const user = await findUser(email, username);

console.log("FOUND USER:", user);
console.log("INPUT PASSWORD:", password);
console.log("STORED PASSWORD:", user?.password);        console.log('Found_user', user)
            if(!user) {
                return res.status(401).json({
                    error:true,
                    message:'Ivalid Username or email'
                })
            }
            //compare passworx
            // const hashedPassword = await hashPassword(password )
            const isPasswordCorrrect = await comparePassword(password, user.password) 
            if (!isPasswordCorrrect) {
                 return res.status(401).
                 json({
                     error: true,
                      message: "Invalid username/email or password",
                     }); }

                     //get the token
                    const { token, refreshToken } = await generateTokens(user);                    

                     return res.status(200).json({
                        error:false,
                        message: 'Login Successful',
                        token,
                        refreshToken,
                        user: {
                            id:user.id,
                            username:user.username,
                            email:user.email,
                            role:user.role
                        }
                     })
        }catch(err) {
            next(err)
        }
    }


import { PrismaClient } from "../generated/prisma/client.ts";
const prisma = new PrismaClient()

export const findUser = async (
  email?: string,
  username?: string
) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        ...(email ? [{ email }] : []),
        ...(username ? [{ username }] : []),
      ],
    },
  });
};



export const createOrUpdateUser = async (
        
        username:string,
        email:string,
        password: string
    
) => {
    await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
}

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
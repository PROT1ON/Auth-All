import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("HASHED PASSWORD:", hashedPassword);
  return hashedPassword;
};

export const  comparePassword = async(Password:string , hashPassword:string) => {
  return await bcrypt.compare(Password, hashPassword)
}


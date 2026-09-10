import { Router } from "express";
import { getAllUsersController, loginController, registerController } from "../controllers/authController";

const router = Router()


//Register Api Route
router.post('/register', registerController)

//login APi Route
router.post('/login',loginController )

// Get all users
router.get("/users", getAllUsersController);

export default router
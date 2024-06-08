import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js";

//auth register API
const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
// authRouter.post("/logout", logoutController)
// authRouter.put("/forgetPassword", forgetPasswordController)

export default authRouter
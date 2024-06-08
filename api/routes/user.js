import express from "express";
import { verifyAdmin, verifyTokenAndAuthorization } from "../utils/verify.js";
import { deleteUserController, getUserController, getUserStats, getUsersController, updateUserController } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.put("/:id",verifyTokenAndAuthorization,updateUserController )
userRouter.delete("/:id",verifyTokenAndAuthorization,deleteUserController )
userRouter.get("/find/:id",verifyAdmin,getUserController )
userRouter.get("/",verifyAdmin, getUsersController )
userRouter.get("/stats",verifyAdmin, getUserStats )


export default userRouter
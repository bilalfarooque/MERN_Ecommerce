import express from "express";
import { verifyAdmin, verifyToken, verifyTokenAndAuthorization } from "../utils/verify.js";
import { createCartController, deleteCartController, getCartController, getCartsController, updateCartController } from "../controllers/cartController.js";


const CartRouter = express.Router()

CartRouter.post("/",verifyToken,createCartController )
CartRouter.put("/:id",verifyTokenAndAuthorization,updateCartController )
CartRouter.delete("/:id",verifyTokenAndAuthorization,deleteCartController )
CartRouter.get("/find/:userId",verifyTokenAndAuthorization,getCartController )
CartRouter.get("/",verifyAdmin, getCartsController)
// CartRouter.get("/stats",verifyAdmin, getCartStats )


export default CartRouter
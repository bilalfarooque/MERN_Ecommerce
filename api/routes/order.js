import express from "express";
import { verifyAdmin, verifyTokenAndAuthorization } from "../utils/verify.js";
import { createOrderController, deleteOrderController, getOrderController, getOrderStats, getOrdersController, updateOrderController } from "../controllers/orderController.js";


const OrderRouter = express.Router()

OrderRouter.post("/",createOrderController )
OrderRouter.put("/:id",verifyAdmin,updateOrderController )
OrderRouter.delete("/:id",verifyAdmin,deleteOrderController )
OrderRouter.get("/find/:userId",getOrderController )
OrderRouter.get("/",verifyAdmin, getOrdersController)
OrderRouter.get("/income",verifyAdmin, getOrderStats )


export default OrderRouter
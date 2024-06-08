import express from "express";
import { verifyAdmin, verifyTokenAndAuthorization } from "../utils/verify.js";
import { createProductController, deleteProductController, getProductController, getProductsController, updateProductController } from "../controllers/productController.js";


const ProductsRouter = express.Router()

ProductsRouter.post("/",verifyAdmin,createProductController )
ProductsRouter.put("/:id",verifyAdmin,updateProductController )
ProductsRouter.delete("/:id",verifyAdmin,deleteProductController )
ProductsRouter.get("/find/:id",getProductController )
ProductsRouter.get("/", getProductsController)
// ProductsRouter.get("/stats",verifyAdmin, getProductStats )


export default ProductsRouter
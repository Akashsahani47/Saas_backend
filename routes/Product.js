import express from "express"
import { addPlan, deleteProduct, getAllPlain, getAllProduct, getPlansByProduct, getProductByID, newProduct, updateProduct } from "../controller/Product.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";
import { isAuthentic } from "../middleware/Auth.js";
import { adminMiddleware } from "../middleware/Admin.js";


const productRouter = express.Router();

productRouter.use(authRateLimiter)


productRouter.post("/product",isAuthentic,adminMiddleware,newProduct);
productRouter.get("/getallproduct",isAuthentic,adminMiddleware,getAllProduct);
productRouter.get("/product/:id",isAuthentic,adminMiddleware, getProductByID);
productRouter.put('/product/updation/:id',isAuthentic,adminMiddleware,updateProduct);
productRouter.delete('/product/delete/:id',isAuthentic,adminMiddleware,deleteProduct);
productRouter.post("/add/plans",isAuthentic,adminMiddleware, addPlan);
productRouter.get("/plans/:productId",isAuthentic,adminMiddleware, getPlansByProduct); //add new
productRouter.get("/AllplanProduct",isAuthentic,adminMiddleware,getAllPlain)

export default productRouter;

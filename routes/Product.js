import express from "express"
import { addPlan, deleteProduct, getAllPlain, getAllProduct, getPlansByProduct, getProductByID, newProduct, updateProduct } from "../controller/Product.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";
import { isAuthentic } from "../middleware/Auth.js";


const productRouter = express.Router();

productRouter.use(authRateLimiter)


productRouter.post("/product",isAuthentic,newProduct);
productRouter.get("/getallproduct",isAuthentic,getAllProduct);
productRouter.get("/product/:id",isAuthentic, getProductByID);
productRouter.put('/product/updation/:id',isAuthentic,updateProduct);
productRouter.delete('/product/delete/:id',isAuthentic,deleteProduct);
productRouter.post("/add/plans",isAuthentic, addPlan);
productRouter.get("/plans/:productId",isAuthentic, getPlansByProduct); //add new
productRouter.get("/AllplanProduct",isAuthentic,getAllPlain)

export default productRouter;

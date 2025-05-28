import express from "express";
import { registerAdmin, loginAdmin, getActiveUsers, getAllusers, userDetails, exporttoCSV,} from "../controller/Admin.js";
import { adminMiddleware } from "../middleware/Admin.js";
import { isAuthentic } from "../middleware/Auth.js";
import { adminRegisterValidation } from "../validators/Validators.js";
import { validateRequest } from "../middleware/validateRequest.js";

const AdminRouter = express.Router();

AdminRouter.post("/admin/register",adminRegisterValidation, validateRequest, registerAdmin); //add
AdminRouter.post("/admin/login", loginAdmin);
AdminRouter.get("/admin/login-users",isAuthentic,adminMiddleware, getActiveUsers); //this is the endpoint mention
AdminRouter.get("/admin/getAllusers",isAuthentic,adminMiddleware,getAllusers);
AdminRouter.get("/admin/userdetail/:id",isAuthentic,adminMiddleware,userDetails);
AdminRouter.get("/admin/jsonTocsv",isAuthentic,adminMiddleware,exporttoCSV);
export default AdminRouter;


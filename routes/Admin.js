import express from "express";
import { registerAdmin, loginAdmin, getActiveUsers, getAllusers, userDetails, exporttoCSV,} from "../controller/Admin.js";

const AdminRouter = express.Router();

AdminRouter.post("/admin/register", registerAdmin); //add
AdminRouter.post("/admin/login", loginAdmin);
AdminRouter.get("/admin/login-users", getActiveUsers);
AdminRouter.get("/admin/getAllusers",getAllusers);
AdminRouter.get("/admin/userdetail/:id",userDetails);
AdminRouter.get("/admin/jsonTocsv",exporttoCSV);
export default AdminRouter;


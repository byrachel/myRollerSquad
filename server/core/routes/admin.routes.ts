import express from "express";
import {
  getCategories,
  getStyles,
  addCategory,
  addStyle,
  editCategory,
  editStyle,
  removeCategory,
  removeStyle,
} from "../controllers/admin.controllers";
const adminRouter = express.Router();

adminRouter.get("/api/admin/categories", getCategories);
adminRouter.post("/api/admin/category", addCategory);
adminRouter.put("/api/admin/category", editCategory);
adminRouter.delete("/api/admin/category/:id", removeCategory);

adminRouter.get("/api/admin/styles", getStyles);
adminRouter.post("/api/admin/style", addStyle);
adminRouter.put("/api/admin/style", editStyle);
adminRouter.delete("/api/admin/style/:id", removeStyle);

export default adminRouter;

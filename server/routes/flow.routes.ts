import express from "express";
import { addCategory, addStyle, editCategory, editStyle, getStyles, removeCategory, removeStyle } from "../controllers/admin.controllers";
import {addPost, getAllPosts, getCategories, getPost, updatePost} from "../controllers/flow.controllers";
const flowRouter = express.Router();

flowRouter.post("/api/flow", addPost);
flowRouter.get("/api/flow", getAllPosts);
flowRouter.get("/api/flow/post/:id", getPost);
flowRouter.put("/api/flow/post", updatePost);
flowRouter.get("/api/flow/categories", getCategories);

// Routes for Admin ONLY
flowRouter.get("/api/admin/categories", getCategories);
flowRouter.post("/api/admin/category", addCategory);
flowRouter.put("/api/admin/category", editCategory);
flowRouter.delete("/api/admin/category/:id", removeCategory);

flowRouter.get("/api/admin/styles", getStyles);
flowRouter.post("/api/admin/style", addStyle);
flowRouter.put("/api/admin/style", editStyle);
flowRouter.delete("/api/admin/style/:id", removeStyle);

export default flowRouter;

import express from "express";
import { addCategory, editCategory, removeCategory } from "../controllers/admin.controllers";
import {addPost, getAllPosts, getCategories, getPost, updatePost} from "../controllers/flow.controllers";
const flowRouter = express.Router();

flowRouter.post("/api/flow", addPost);
flowRouter.get("/api/flow", getAllPosts);
flowRouter.get("/api/flow/post/:id", getPost);
flowRouter.put("/api/flow/post", updatePost);
flowRouter.get("/api/flow/categories", getCategories);

// Routes for Admin ONLY
flowRouter.post("/api/admin/category", addCategory);
flowRouter.put("/api/admin/category", editCategory);
flowRouter.delete("/api/admin/category/:id", removeCategory);

export default flowRouter;

import express from "express";
import {
  addPost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/flow.controllers";
const flowRouter = express.Router();

flowRouter.post("/api/flow", addPost);
flowRouter.get("/api/flow/:cursor", getAllPosts);
flowRouter.get("/api/flow/post/:id", getPost);
flowRouter.put("/api/flow/post", updatePost);

export default flowRouter;

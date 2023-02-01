import express from "express";
import { addPost, getAllPosts } from "../controllers/flow.controllers";
const flowRouter = express.Router();
import { body } from "express-validator";

flowRouter.get("/api/flow", getAllPosts);
flowRouter.post(
  "/api/post/add",
  body("email").isEmail().normalizeEmail(),
  body("firstname").not().isEmpty().escape(),
  body("lastname").not().isEmpty().escape(),
  addPost
);

export default flowRouter;

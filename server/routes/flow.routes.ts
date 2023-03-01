import express, { Request, Response } from "express";
import { PostsRepository } from "../infrastructure/repositories/Flow/PostRepository";
import {
  addPost,
  getAllPosts,
  getPost,
  updatePost,
} from "../core/controllers/flow.controllers";
import { PostController } from "../core/controllers/PostController";
import { GetPostsUseCase } from "../core/use-cases/getPosts";
const flowRouter = express.Router();

flowRouter.post("/api/flow", addPost);
flowRouter.get("/api/flow/:cursor", getAllPosts);

const postsRepository = new PostsRepository();
const getPostsUseCase = new GetPostsUseCase(postsRepository);
const postController = new PostController(getPostsUseCase);

flowRouter.get("/api/getposts", async (req: Request, res: Response) => {
  const posts = await postController.getAll();
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(417);
  }
});

flowRouter.get("/api/flow/post/:id", getPost);
flowRouter.put("/api/flow/post", updatePost);

export default flowRouter;

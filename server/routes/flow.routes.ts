import express, { Request, Response } from "express";
import { PostRepository } from "../infrastructure/repositories/Flow/PostRepository";
import {
  // addPost,
  getAllPosts,
  getPost,
  updatePost,
} from "../core/controllers/flow.controllers";
import { PostController } from "../core/controllers/PostController";
import { GetPostsUseCase } from "../use-cases/Flow/getPosts";
import { CreatePostUseCase } from "../use-cases/Flow/createPost";
const flowRouter = express.Router();

flowRouter.get("/api/flow/:cursor", getAllPosts);

const postsRepository = new PostRepository();
const createPostUseCase = new CreatePostUseCase(postsRepository);
const getPostsUseCase = new GetPostsUseCase(postsRepository);
const postController = new PostController(getPostsUseCase, createPostUseCase);

flowRouter.post("/api/flow", async (req: Request, res: Response) => {
  const post = await postController.addPost(req, res);
  console.log("POST", post);
  if (post) {
    return res.status(201).json(post);
  } else {
    return res.status(417);
  }
});

flowRouter.get("/api/getposts", async (req: Request, res: Response) => {
  const posts = await postController.getPosts();
  if (posts) {
    return res.status(200).json(posts);
  } else {
    return res.status(417);
  }
});

flowRouter.get("/api/flow/post/:id", getPost);
flowRouter.put("/api/flow/post", updatePost);

export default flowRouter;

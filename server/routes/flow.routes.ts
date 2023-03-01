import express, { NextFunction, Request, Response } from "express";
import { PostRepository } from "../infrastructure/repositories/Flow/PostRepository";
import {
  // addPost,
  // getAllPosts,
  // getPost,
  updatePost,
} from "../core/controllers/flow.controllers";
import { PostController } from "../core/controllers/PostController";
import { GetPostsUseCase } from "../use-cases/Flow/getPosts";
import { CreatePostUseCase } from "../use-cases/Flow/createPost";
import { validationResult, body } from "express-validator";
import { GetPostUseCase } from "../use-cases/Flow/getPost";

const flowRouter = express.Router();

const postsRepository = new PostRepository();
const createPostUseCase = new CreatePostUseCase(postsRepository);
const getPostsUseCase = new GetPostsUseCase(postsRepository);
const getPostUseCase = new GetPostUseCase(postsRepository);
const postController = new PostController(
  getPostsUseCase,
  createPostUseCase,
  getPostUseCase
);

flowRouter.post(
  "/api/flow",
  body("title").not().isEmpty().trim().escape().isLength({ max: 25 }),
  body("content").trim().escape(),
  body("category_id").not().isEmpty(),
  body("user_id").not().isEmpty(),
  body("link").trim().escape(),
  body("hashtags").trim().escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const post = await postController.addPost(req, res);
    if (!post) {
      return res.status(500);
    }
    return res.status(201).json(post);
  }
);

flowRouter.get("/api/flow/:cursor", async (req: Request, res: Response) => {
  const cursor = req.params.cursor ? parseInt(req.params.cursor) : 0;
  const limit = 4;
  const posts = await postController.getPosts(cursor, limit);
  if (!posts) {
    return res.status(500);
  }
  return res.status(200).json({
    posts,
    nextId: posts.length === limit ? posts[limit - 1].id : undefined,
  });
});

flowRouter.get(
  "/api/post/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const post = id || !isNaN(id) ? await postController.getPost(id) : null;
    if (!post || post === null) {
      next({ status: 500, message: "oups" });
    }
    return res.status(200).json({ post });
  }
);

flowRouter.put("/api/flow/post", updatePost);

export default flowRouter;

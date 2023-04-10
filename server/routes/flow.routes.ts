import express, { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import { PostRepository } from "../infrastructure/repositories/Flow/PostRepository";
import {
  // addPost,
  // getAllPosts,
  // getPost,
  updatePost,
} from "../core/controllers/flow.controllers";
import { PostController } from "../core/controllers/PostController";
import { GetPostsUseCase } from "../core/use-cases/Flow/getPosts";
import { CreatePostUseCase } from "../core/use-cases/Flow/createPost";
import { GetPostUseCase } from "../core/use-cases/Flow/getPost";

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

import multer from "multer";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import prisma from "../infrastructure/prisma/db/client";
const upload = multer({ storage: multer.memoryStorage() });

flowRouter.post(
  "/api/flow",
  isAuthenticated,
  upload.array("pictures", 5),
  [
    check("title")
      .isLength({ min: 3, max: 30 })
      .withMessage("the name must have minimum length of 3 and maximum 30")
      .trim(),
    check("category_id").exists().withMessage("Category id is missing"),
    check("user_id").exists().withMessage("User id is missing"),
    check("content").trim(),
    check("link").trim(),
    check("price").trim(),
    check("country").trim(),
    check("city").trim(),
  ],
  async (req: Request, res: Response) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await postController.addPost(req);
    if (!post) {
      return res.status(500);
    }
    return res.status(201).json(post);
  }
);

flowRouter.post(
  "/api/post/like/:id",
  isAuthenticated,
  async (req: any, res: Response) => {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Post ID is missing" });
    const postExists = await prisma.post.findUnique({ where: { id } });
    if (!postExists) return res.status(404).json({ message: "Post not found" });
    const userId = req.payload.userId;
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    const userLiked = await prisma.postLiked.findUnique({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: id,
        },
      },
    });
    if (userLiked)
      return res.status(400).json({ message: "You already like this post !" });
    const postIsLiked = await prisma.postLiked.create({
      data: {
        user_id: userId,
        post_id: id,
      },
    });
    if (!postIsLiked) return res.status(500).json({ message: "oups" });
    return res.status(200).json({ message: "Post liked" });
  }
);

flowRouter.get(
  "/api/flow/:cursor",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.cursor || req.params.cursor === "undefined")
      return res.status(200).json({ posts: [] });
    try {
      const cursor = parseInt(req.params.cursor);
      const limit = 4;
      const posts = await postController.getPosts(cursor, limit);
      if (!posts) return res.status(200).json({ posts: [] });
      return res.status(200).json({
        posts,
        nextId: posts.length === limit ? posts[limit - 1].id : undefined,
      });
    } catch (err) {
      console.log("FLOW", err);
      next(err);
    }
  }
);

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

import express, { NextFunction, Request, Response } from "express";
const { check, validationResult } = require("express-validator");

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
const upload = multer({ storage: multer.memoryStorage() });

// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

flowRouter.post(
  "/api/flow",
  upload.array("pictures", 5),
  [
    check("title")
      .isLength({ min: 3, max: 25 })
      .withMessage("the name must have minimum length of 3")
      .trim()
      .escape(),
    check("category_id").isNumeric().exists(),
  ],
  // check("content").trim().escape(),
  // body("title").trim().escape().isLength({ min: 3 }),
  // body("content").trim().escape(),
  // body("category_id").isNumeric(),
  // body("user_id").isNumeric(),
  // body("link").trim().escape(),
  // body("hashtags").trim().escape(),
  async (req: Request, res: Response) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    console.log("file", req.body.images);
    console.log("body", req.body);
    // const post = await postController.addPost(req, res);
    // if (!post) {
    //   return res.status(500);
    // }
    // return res.status(201).json(post);
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

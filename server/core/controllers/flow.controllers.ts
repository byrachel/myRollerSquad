import { Request, Response } from "express";
import prisma from "../../infrastructure/prisma/db/client";

export const getAllPosts = async (req: Request, res: Response) => {
  const limit = 2;
  const cursor = req.params.cursor ? parseInt(req.params.cursor) : 0;
  const cursorObj = cursor === 0 ? undefined : { id: cursor };

  const posts = await prisma.post.findMany({
    skip: cursor > 0 ? 1 : 0,
    cursor: cursorObj,
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      style: true,
      hashtags: true,
      created_at: true,
      pictures: true,
      link: true,
      likes: true,
      comments: true,
      user: true,
    },
  });
  if (posts) {
    return res.status(200).json({
      posts,
      nextId: posts.length === limit ? posts[limit - 1].id : undefined,
    });
  }
  return res.status(500);
};

export const getPost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post) {
    return res.status(200).json(post);
  }
  return res.status(500);
};

export const updatePost = async (req: Request, res: Response) => {
  const {
    id,
    title,
    content,
    hashtags,
    category_id,
    pictures,
    link,
    style_id,
  } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    return res.status(400).json({ error: "post not found." });
  }
  const postUpdated = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
      hashtags,
      user_id: 1,
      pictures,
      category_id,
      link,
      style_id,
    },
  });
  return res.status(200).json(postUpdated);
};

export const addPost = async (req: Request, res: Response) => {
  const { title, content, hashtags, category_id } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      hashtags,
      created_at: new Date().toISOString(),
      user_id: 1,
      category_id,
    },
  });
  res.status(200).json(result);
};

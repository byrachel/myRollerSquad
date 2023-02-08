import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  if(posts) {
    return res.status(200).json(posts);
  }
  return res.status(500)
};

export const getPost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if(!id || isNaN(id)) {
      return res.status(400).json({error: 'id is missing or incorrect.'});
  }
  const post = await prisma.post.findUnique({
    where: { id }
  });
  if(post) {
    return res.status(200).json(post);
  }
  return res.status(500)
};

export const updatePost = async (req: Request, res: Response) => {
  const { id, title, content, hashtags, type, pictures } = req.body;
  if(!id || isNaN(id)) {
      return res.status(400).json({error: 'id is missing or incorrect.'});
  }
  const post = await prisma.post.findUnique({
    where: { id }
  });
  if(!post) {
    return res.status(400).json({error: 'post not found.'});
  }
  const postUpdated = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
      hashtags,
      type,
      user_id: 1,
      pictures
    },
  })
  return res.status(200).json(postUpdated)
};

export const addPost = async (req: Request, res: Response) => {
  const { title, content, hashtags, type, category } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      hashtags,
      type,
      created_at: new Date().toISOString(),
      user_id: 1,
      category
    },
  })
  res.status(200).json(result);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  if(!categories) {
    return res.status(500)
  }
  return res.status(200).json(categories);
};
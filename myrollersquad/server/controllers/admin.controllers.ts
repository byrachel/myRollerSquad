import { Request, Response } from "express";
import prisma from "../prisma/db/client";


export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  return res.status(200).json(categories);
};

export const addCategory = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is missing." });
  }
  const result = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });
  return res.status(200).json(result);
};

export const editCategory = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const categoryUpdated = await prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });
  return res.status(200).json(categoryUpdated);
};

export const removeCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const categoryToRemove = await prisma.category.findUnique({
    where: { id },
  });
  if (!categoryToRemove) {
    return res.status(400).json({ error: "id is not found" });
  }
  const categoryRemoved = await prisma.category.delete({
    where: { id },
  });
  return res.status(200).json(categoryRemoved);
};

export const getStyles = async (req: Request, res: Response) => {
  const styles = await prisma.style.findMany();
  return res.status(200).json(styles);
};

export const addStyle = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is missing." });
  }
  const result = await prisma.style.create({
    data: {
      name: req.body.name,
    },
  });
  return res.status(200).json(result);
};

export const editStyle = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const styleUpdated = await prisma.style.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });
  return res.status(200).json(styleUpdated);
};

export const removeStyle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "id is missing or incorrect." });
  }
  const styleToRemove = await prisma.style.findUnique({
    where: { id },
  });
  if (!styleToRemove) {
    return res.status(400).json({ error: "id is not found" });
  }
  const styleRemoved = await prisma.style.delete({
    where: { id },
  });
  return res.status(200).json(styleRemoved);
};
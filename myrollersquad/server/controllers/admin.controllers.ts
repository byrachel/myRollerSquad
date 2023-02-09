import { Request, Response } from "express";
import prisma from "../prisma/db/client";

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
